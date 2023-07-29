import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import User from "../../schemas/User";
import UnregisteredEmbed from "../../utils/response/Unregistered";
import Balance from "../../utils/response/economy/Balance";

export const data = new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Get your current balance!');

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

    await interaction.reply({
        embeds: [
            Balance(interaction.user, query.money)
        ]
    });

}