import { ActionRowBuilder, ChatInputCommandInteraction, ComponentType, SlashCommandBuilder } from "discord.js";
import User from "../../schemas/User";
import RegisterEmbed from "../../utils/response/RegisterDialogue";
import UnregisteredEmbed from "../../utils/response/Unregistered";
import RegisterButton from "../../buttons/economy/register";
import ClaimedDaily from "../../utils/response/economy/ClaimedDaily";
import i18next from "i18next";

import PcgRandom from "../../utils/pcgRandom";

const pcgRandom = new PcgRandom(Date.now());

const randomNumber = () => pcgRandom.next32() / 0xffff_ffff;

export const data = new SlashCommandBuilder()
    .setName('cf')
    .setDescription('Get your daily reward!')
    .addNumberOption(
        option => option.setName('amount')
            .setDescription('The amount of money you want to bet')
            .setRequired(true)
            .setMinValue(1)
    )
    .addStringOption(
        option => option.setName('selection')
            .setDescription('The amount of money you want to bet')
            .setChoices({
                name: 'Heads',
                value: 'heads'
            }, {
                name: 'Tails',
                value: 'tails'
            })
    );

export async function execute(interaction: ChatInputCommandInteraction) {

    const id = interaction.user.id;

    const query = await User.findOne({ id });

    if (!query) {
        await interaction.reply({
            embeds: [
                UnregisteredEmbed(interaction.user)
            ],
            ephemeral: true
        });
        return;
    }

    const amount = interaction.options.getNumber('amount', true);

    if (amount > query.money) {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            content: i18next.t('commands:economy.cf.error.notEnoughMoney')
        });
        return;
    }
    await interaction.deferReply();

    query.money -= amount;
    await query.save();

    
    await interaction.editReply({
        content: [
            `**${i18next.t('commands:economy.cf.action.spins')}**<:clock:1137699941217730641>`
        ].join('\n'),
    })

    await new Promise(resolve => setTimeout(resolve, 3000));

    const selection = interaction.options.getString('selection') || 'heads';

    const result = randomNumber() < 0.5 ? 'heads' : 'tails';

    if (selection === result) {
        query.money += amount * 2;
        await query.save();

        await interaction.editReply({
            content: [
                `**${i18next.t('commands:economy.cf.result.win')}**`,
                `# ${amount * 2} <:coins:1137636425123242094>`
            ].join('\n')
        });

        return;
    } else {
        await interaction.editReply({
            content: [
                `**${i18next.t('commands:economy.cf.result.lose')}**`,
                `# ${amount} <:coins:1137636425123242094>`
            ].join('\n')
        });

        return;
    }
}