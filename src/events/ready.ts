import { Client, Events } from "discord.js";
import { log } from "../logger";
import { Client as ClientEnum } from "../utils/logs";

export const name = Events.ClientReady;
export const once = true;
export function execute(client: Client) {
    if (!client.user) return;
    log(ClientEnum.READY, "Client", client.user.tag)
}