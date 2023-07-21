import { BaseInteraction, Events } from "discord.js";

export const name = Events.InteractionCreate;
export async function execute(interaction: BaseInteraction) {
    if (!interaction.isChatInputCommand()) return;

    const command = (interaction.client as any).commands?.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
    }
}