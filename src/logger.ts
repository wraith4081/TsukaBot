import chalk from 'chalk';

export function log(message: string, name: string, ...args: any[]) {
    const nameLength = name.length;
    const prefixLength = Math.floor((15 - nameLength) / 2);
    const suffixLength = Math.ceil((15 - nameLength) / 2);

    const header = [
        chalk.gray.bold('['),
        chalk.hidden('.'.repeat(prefixLength)),
        chalk.blue.bold(name),
        chalk.hidden('.'.repeat(suffixLength)),
        chalk.gray.bold(']'),
    ].join('');

    console.log(header, message.fill(...args));
}