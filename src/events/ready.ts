import { Client, Events } from "discord.js";

export const name = Events.ClientReady;
export const once = true;
export function execute(client: Client) {
    if (!client.user) return;
    console.log(`Ready! Logged in as ${client.user.tag}`);
}