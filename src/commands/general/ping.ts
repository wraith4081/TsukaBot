import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import User from "../../schemas/User";
import UnregisteredEmbed from "../../utils/response/Unregistered";

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

export async function execute(interaction: ChatInputCommandInteraction) {

    const id = interaction.user.id;

    const query = await User.findOne({ id });

    if (!query) {
        await interaction.reply({
            embeds: [
                UnregisteredEmbed(interaction.user)
            ]
        });
        return;
    }

    await interaction.reply('Pong!');
}