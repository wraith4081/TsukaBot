import { ActionRowBuilder, ChatInputCommandInteraction, ComponentType, EmbedBuilder, Message, SlashCommandBuilder } from "discord.js";
import User from "../../schemas/User";
import RegisterEmbed from "../../utils/response/RegisterDialogue";
import UnregisteredEmbed from "../../utils/response/Unregistered";
import RegisterButton from "../../buttons/economy/register";
import ClaimedDaily from "../../utils/response/economy/ClaimedDaily";
import i18next from "i18next";
import selectRandom from "../../utils/chancedRandomSelect";

import PcgRandom from "../../utils/pcgRandom";

export const data = new SlashCommandBuilder()
    .setName('slots')
    .setDescription('Get your daily reward!')
    .addNumberOption(
        option => option.setName('amount')
            .setDescription('The amount of money you want to bet')
            .setRequired(true)
            .setMinValue(1)
    );

const emojis = [
    '<:slots1:1137639572025659490>',
    '<:slots2:1137639574831636501>',
    '<:slots3:1137639576614219866>',
    '<:slots4:1137639580200337480>'
].map((emoji, index, array) => ({
    emoji,
    chance: 100 / Math.pow(2, index + 1) + 100 / 48 * (array.length - index) * (index > 0 ? 2.5 : -3)
}))

const random = new PcgRandom(Date.now())

const randomNumber = () => random.next32() / 0xffff_ffff;

const results = [
    {
        chance: 5,
        result: 'refund'
    },
    {
        chance: 95,
        result: 'slot'
    }
];

const lost = () => {
    let random = Array.from({ length: 3 }, () => selectRandom(emojis));

    let tries = 0;

    // All emojis cannot be the same
    // If all emojis are the same
    same: for (let i = 0; i < random.length; i++) {
        const self = random[i];
        const exceptSelf = random.filter((_, index) => index !== i);

        if (exceptSelf.some(item => item.emoji === self.emoji)) {
            // Select a random emoji
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            // Replace the last emoji with the random emoji
            random[2] = randomEmoji;
            i = 0;

            // Continue the loop
            if (tries++ < 10)
                continue same;
            else 
                random = emojis.slice(0, 3);
        }
    }

    return random;
}

export async function execute(interaction: ChatInputCommandInteraction) {

    const id = interaction.user.id;

    const query = await User.findOne({ id });

    if (!query) {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            embeds: [
                UnregisteredEmbed(interaction.user)
            ]
        });
        return;
    }

    const amount = interaction.options.getNumber('amount', true);

    if (amount > query.money) {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            content: i18next.t('commands:economy.slots.error.notEnoughMoney')
        });
        return;
    }
    await interaction.deferReply();

    query.money -= amount;
    await query.save();

    await interaction.editReply({
        content: [
            `**${i18next.t('commands:economy.slots.action.spins')}**`,
            `# ${Array.from({ length: 3 }, () => `<a:slots:1137636425123242094>`).join('')}`
        ].join('\n'),
    })

    await new Promise(resolve => setTimeout(resolve, 3000));

    const result = selectRandom(results);

    if (result.result === 'refund') {
        await interaction.editReply({
            content: [
                `**${i18next.t('commands:economy.slots.result.refund')}**`,
                `# ${Array.from({ length: 3 }, () => emojis[0].emoji).join('')}`
            ].join('\n')
        });

        return;
    }

    if (result.result === 'slot') {
        const r = emojis[
            ~~(emojis.length * randomNumber())
        ]

        const t = emojis.reduce((acc, item) => acc + item.chance, 0);

        if (
            r.chance / t < randomNumber()
        ) {

            await interaction.editReply({
                content: [
                    `**${i18next.t('commands:economy.slots.result.lose')}**`,
                    `# ${lost().map(item => item.emoji).join('')}`
                ].join('\n')
            });
            return;
        }

        const idx = emojis.findIndex(item => item.emoji === r.emoji);

        const power = Math.max(Math.pow(2, idx) * 2, 1)

        const reward = amount * power;

        query.money += reward;

        await query.save();

        await interaction.editReply({
            content: [
                `**${i18next.t(`commands:economy.slots.result.${idx === 3 ? 'grand' : 'win'}`)}**`,
                `# ${Array.from({ length: 3 }, () => r.emoji).join('')}`,
                i18next.t('commands:economy.slots.reward', { reward })
            ].join('\n')
        });

        return;
    }

    await interaction.editReply({
        content: 'Watafak'
    });

    return;
}