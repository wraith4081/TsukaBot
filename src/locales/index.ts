import fs from 'node:fs';
import path from 'node:path';

import yaml from 'js-yaml';

const languages = fs.readdirSync(path.join(__dirname)).filter(
    name => /[a-z]{2}/.test(name) && fs.statSync(path.join(__dirname, name)).isDirectory()
);

const namespaces = fs.readdirSync(path.join(__dirname, languages[0])).filter(
    name => /\.yaml$/.test(name)
).map(name => name.replace(/\.yaml$/, ''));

export {
    languages,
    namespaces
}

const translation = languages.reduce((acc, dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir)).filter(
        name => /\.yaml$/.test(name)
    );

    files.forEach(file => {
        const content = fs.readFileSync(path.join(__dirname, dir, file), 'utf-8');
        const parsed = yaml.load(content);

        acc[dir][file.replace(/\.yaml$/, '')] = parsed;
    })

    return acc;
}, languages.reduce((cur, lang) => ({
    ...cur,
    [lang]: {}
}), {} as any) as {
    [key: string]: {
        [key: string]: any
    }
});

export default translation;