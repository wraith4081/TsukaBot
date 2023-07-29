import chalk from "chalk";

const rater = '\x1B[90m\x1B[1m[\x1B[22m\x1B[39m\x1B[32m\x1B[1m$0\x1B[22m\x1B[39m\x1B[90m\x1B[1m/\x1B[22m\x1B[39m\x1B[32m\x1B[1m$1\x1B[22m\x1B[39m\x1B[90m\x1B[1m]\x1B[22m\x1B[39m';

export enum Commands {
    POTENTIAL_COMMAND_CATEGORIES = "Founded potential $0 command categories.",
    FOUNDED_COMMAND_CATEGORIES = "Founded $0 command categories.",

    LOADING_CATEGORY = `${rater} Loading category '$2'...`,
    LOADING_COMMAND = `${rater} Loading command '$2/$3'...`,

    INVALID_COMMAND = `${rater} \x1B[31m\x1B[1mInvalid command '$2'!\x1B[22m\x1B[39m`,

    REFRESHING_APPLICATION_COMMANDS = "Started refreshing $0 application (/) commands.",
    RELOADED_APPLICATION_COMMANDS = "Successfully reloaded $0 application (/) commands."
}


export enum Events {
    LOADING_EVENT = `${rater} Loading event '$2'...`,
}

export enum Client {
    READY = "\x1B[32m\x1B[1mReady! Logged in as\x1B[22m\x1B[39m \x1B[34m\x1B[1m$0\x1B[22m\x1B[39m"
}

export enum Database {
    CONNECTED = "\x1B[32m\x1B[1mSuccessfully connected to database.\x1B[22m\x1B[39m",
    DISCONNECTED = "\x1B[32m\x1B[1mSuccessfully \x1B[22m\x1B[39m\x1B[31m\x1B[1mdisconnected\x1B[22m\x1B[39m\x1B[32m\x1B[1m from database.\x1B[22m\x1B[39m",
    ERROR = "\x1B[31mAn error occurred while connecting to database.\x1B[39m \x1B[31m\x1B[1m$0\x1B[22m\x1B[39m",
}