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
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            embeds: [
                UnregisteredEmbed(interaction.user)
            ]
        });
        return;
    }

    await interaction.deferReply();

    await interaction.editReply({
        embeds: [
            Balance(interaction.user, query.money)
        ]
    });

}