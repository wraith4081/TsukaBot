import { Client, Collection, Events, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { APPLICATION_ID, TOKEN } from './config'

import './utils/fillString';
import { log } from './logger';
import { Commands, Events as EventsLogs } from './utils/logs';


const client = new Client({ intents: [GatewayIntentBits.Guilds] }) as Client & { commands?: Collection<string, { data: SlashCommandBuilder, execute: Function }> };

const commandsPath = path.join(__dirname, 'commands');
const categories = fs.readdirSync(commandsPath)

log(Commands.POTENTIAL_COMMAND_CATEGORIES, 'Client', categories.length);

const commandCategories = categories.filter(category => fs.statSync(path.join(commandsPath, category)).isDirectory());
log(Commands.FOUNDED_COMMAND_CATEGORIES, 'Client', commandCategories.length);

let commands: any[] = [];

client.commands = new Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => /\.(ts|js)$/.test(file));

function loadCategory(index: number) {

    const category = commandCategories[index];

    log(Commands.LOADING_CATEGORY, 'Category', index + 1, commandCategories.length, category);

    const categoryPath = path.join(commandsPath, category);
    const loadedCommands = fs.readdirSync(categoryPath).filter(file => /\.(ts|js)$/.test(file));

    loadedCommands.forEach(async (commandName, i) => {

        if (i !== 0) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
        }

        log(Commands.LOADING_COMMAND, 'Command', i + 1, loadedCommands.length, commandCategories[index], commandName);

        const commandPath = path.join(categoryPath, commandName);
        const command = await import(commandPath);

        if (['data', 'execute'].every(key => key in command)) {
            client.commands?.set(command.data.name, command);

            if (typeof command.data.toJSON === 'function') {
                const json = command.data.toJSON();
                commands.push(json);

                if (index === commandCategories.length - 1 && i === loadedCommands.length - 1) {
                    const rest = new REST().setToken(TOKEN);
                    (async () => {
                        try {
                            log(Commands.REFRESHING_APPLICATION_COMMANDS, 'REST', commands.length);

                            const data = await rest.put(
                                Routes.applicationCommands(APPLICATION_ID),
                                { body: commands }
                            ) as any[];

                            log(Commands.RELOADED_APPLICATION_COMMANDS, 'REST', data.length);
                        } catch (error) {
                            console.error(error);
                        }
                    })();
                }
            } else {
                process.stdout.clearLine(0);
                process.stdout.cursorTo(0);
                log(Commands.INVALID_COMMAND, 'Command', i + 1, loadedCommands.length, commandName);
            }
        } else {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            log(Commands.INVALID_COMMAND, 'Command', i + 1, loadedCommands.length, commandName);
        }
    });

    if (index < commandCategories.length - 1) {
        loadCategory(index + 1);
    }
}

async function loadEvent(index: number) {
    const eventName = eventFiles[index];

    log(EventsLogs.LOADING_EVENT, 'Event', index + 1, eventFiles.length, eventName);

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
