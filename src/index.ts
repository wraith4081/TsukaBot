import { Client, Collection, Events, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { APPLICATION_ID, TOKEN, SYSTEM_LANGUAGE } from './config'

const [isLinux, isWindows] = ['Linux', 'Windows_NT'].map(x => os.type() === x);

import './utils/fillString';
import { log } from './logger';

import './i18n';

import i18next from 'i18next';

if (SYSTEM_LANGUAGE !== i18next.language && i18next.languages.includes(SYSTEM_LANGUAGE)) {
    i18next.changeLanguage(SYSTEM_LANGUAGE);
}

import './mongo';

const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as Client & { commands?: Collection<string, { data: SlashCommandBuilder, execute: Function }> };

const commandsPath = path.join(__dirname, 'commands');
const categories = fs.readdirSync(commandsPath)

log(i18next.t('system:commandsLoader.potentialCommandCategories'), 'Client', categories.length);

const commandCategories = categories.filter(category => fs.statSync(path.join(commandsPath, category)).isDirectory());
log(i18next.t('system:commandsLoader.foundedCommandCategories'), 'Client', commandCategories.length);

let commands: any[] = [];

client.commands = new Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => /\.(ts|js)$/.test(file));

function loadCategory(index: number) {

    const category = commandCategories[index];

    log(i18next.t('system:commandsLoader.loadingCategory', { category }), 'Category', i18next.t('system:rater', { current: index + 1, total: commandCategories.length }));

    const categoryPath = path.join(commandsPath, category);
    const loadedCommands = fs.readdirSync(categoryPath).filter(file => /\.(ts|js)$/.test(file));

    loadedCommands.forEach(async (commandName, i) => {

        if (i !== 0) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        }

        log(i18next.t('system:commandsLoader.loadingCommand', { category: commandCategories[index], command: commandName }), 'Command', i18next.t('system:rater', { current: i + 1, total: loadedCommands.length }));


        const commandPath = path.join(categoryPath, commandName);

        const command = await require(commandPath);

        if (['data', 'execute'].every(key => key in command)) {
            client.commands?.set(command.data.name, command);

            if (typeof command.data.toJSON === 'function') {
                const json = command.data.toJSON();
                commands.push(json);

                if (index === commandCategories.length - 1 && i === loadedCommands.length - 1) {
                    const rest = new REST().setToken(TOKEN);
                    (async () => {
                        try {
                            log(i18next.t('system:commandsLoader.refreshingApplicationCommands'), 'REST', commands.length);

                            const data = await rest.put(
                                Routes.applicationCommands(APPLICATION_ID),
                                { body: commands }
                            ) as any[];

                            log(i18next.t('system:commandsLoader.reloadedApplicationCommands'), 'REST', data.length);
                        } catch (error) {
                            console.error(error);
                        }
                    })();
                }
            } else {
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                log(i18next.t('system:commandsLoader.invalidCommand'), 'Command', i18next.t('system:rater'), i + 1, loadedCommands.length, commandName);
            }
        } else {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            log(i18next.t('system:commandsLoader.invalidCommand'), 'Command', i18next.t('system:rater'), i + 1, loadedCommands.length, commandName);
        }
    });

    if (index < commandCategories.length - 1) {
        loadCategory(index + 1);
    }
}

async function loadEvent(index: number) {
    const eventName = eventFiles[index];

    log(i18next.t('system:eventsLoader.loadingEvent', { event: eventName }), 'Event', i18next.t('system:rater', { current: index + 1, total: eventFiles.length }));

    const eventPath = path.join(eventsPath, eventName);

    const event = await import(eventPath);

    if (['name', 'execute'].every(key => key in event)) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

    if (index < eventFiles.length - 1) {
        loadEvent(index + 1);
    } else {
        loadCategory(0);
    }
}

loadEvent(0);

client.login(TOKEN);
