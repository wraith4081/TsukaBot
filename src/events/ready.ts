import { Client, Events } from "discord.js";
import { log } from "../logger";

import i18next from "i18next";

export const name = Events.ClientReady;
export const once = true;
export function execute(client: Client) {
    if (!client.user) return;
    log(i18next.t('system:client.ready', { tag: client.user.tag }), "Client")
}