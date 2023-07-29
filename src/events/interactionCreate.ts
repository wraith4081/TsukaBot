import { BaseInteraction, Events } from "discord.js";

import User from "../schemas/User";

export const name = Events.InteractionCreate;
export async function execute(interaction: BaseInteraction) {
    if (interaction.isChatInputCommand()) {

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

    } else if (interaction.isButton()) {
        const id = interaction.customId;

        if (id === 'register') {
            let user = await User.findOne({ id: interaction.user.id });

            if (user) {
                await interaction.reply({
                    content: 'You are already registered!',
                    ephemeral: true
                });
                return;
            }

            user = new User({
                id: interaction.user.id
            });

            user.save().then(() => {
                interaction.reply({
                    content: 'You have been registered!',
                    ephemeral: true
                });
            }).catch((err) => {
                console.error(err);
                interaction.reply({
                    content: 'An error occured while registering you!',
                    ephemeral: true
                });
            });
        }
    }
}