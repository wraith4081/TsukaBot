import { ActionRowBuilder, ChatInputCommandInteraction, ComponentType, SlashCommandBuilder } from "discord.js";
import User from "../../schemas/User";
import RegisterEmbed from "../../utils/response/RegisterDialogue";
import AlreadyRegisteredEmbed from "../../utils/response/AlreadyRegistered";
import RegisterButton from "../../buttons/economy/register";

export const data = new SlashCommandBuilder()
    .setName('register')
    .setDescription('Replies with Pong!');

export async function execute(interaction: ChatInputCommandInteraction) {

    const id = interaction.user.id;

    // Get total user length
    const total = await User.countDocuments();

    const query = await User.findOne({ id });

    if (query) {
        await interaction.reply({
            embeds: [
                AlreadyRegisteredEmbed(interaction.user)
            ],
            ephemeral: true
        });
        return;
    }

    await interaction.reply({
        embeds: [
            RegisterEmbed(interaction.user, total)
        ],
        fetchReply: true,
        ephemeral: true,
        components: [
            new ActionRowBuilder({
                type: ComponentType.ActionRow,
            }).addComponents(
                RegisterButton
            ) as any
        ]
    });
}