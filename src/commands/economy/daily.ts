import { ActionRowBuilder, ChatInputCommandInteraction, ComponentType, SlashCommandBuilder } from "discord.js";
import User from "../../schemas/User";
import RegisterEmbed from "../../utils/response/RegisterDialogue";
import UnregisteredEmbed from "../../utils/response/Unregistered";
import RegisterButton from "../../buttons/economy/register";
import ClaimedDaily from "../../utils/response/economy/ClaimedDaily";
import i18next from "i18next";

export const data = new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Get your daily reward!');

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

    const lastDaily = query.daily?.[0];

    if (lastDaily && lastDaily.time + 86400000 > Date.now()) {
        await interaction.reply({
            content: i18next.t('commands:economy.daily.alreadyClaimed', { cooldown: Math.floor(lastDaily.time / 1000) + 86400 }),
            ephemeral: true
        });
        return;
    }

    const streak = lastDaily ? lastDaily.streak + 1 : 1;

    const reward = Math.floor(Math.random() * 1000) + 1000;

    const money = query.money

    query.daily = [
        {
            time: Date.now(),
            streak,
            amount: reward,
            money: {
                from: money,
                to: money + reward
            }
        },
        ...query.daily
    ];

    query.money += reward;

    query.save().then(async () => {
        await interaction.reply({
            embeds: [
                ClaimedDaily(interaction.user, streak, reward)
            ]
        });
    }).catch(async () => {
        await interaction.reply({
            content: i18next.t('commands:economy.daily.error.save'),
            ephemeral: true
        });
    });
}