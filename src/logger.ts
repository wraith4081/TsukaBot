import chalk from 'chalk';

export function log(message: string, name: string, ...args: any[]) {
  const nameLength = name.length;
  const pad = 15 - nameLength;
  const perSide = Math.floor(pad / 2);
  const overflow = pad % 2;

  const header = [
    chalk.gray.bold('['),
    '\u200B'.repeat(perSide + overflow),
    chalk.blue.bold(name),
    '\u200B'.repeat(perSide),
    chalk.gray.bold(']'),
  ].join('');

  console.log(header, message.fill(...args));
}