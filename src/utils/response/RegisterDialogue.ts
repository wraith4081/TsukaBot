import { EmbedBuilder, User } from "discord.js"

import i18next from "i18next";

const RegisterEmbed = (user: User, count: number) => new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(i18next.t('embeds:register.title'))
    .setAuthor({ name: i18next.t('embeds:register.author', { name: user.client.user.username }), iconURL: user.client.user.avatarURL() || user.client.user.defaultAvatarURL, url: 'https://discord.js.org' })
    .setDescription(
        [
            i18next.t('embeds:register.description.firstLine'),

            i18next.t('embeds:register.description.secondLine'), 
            i18next.t('embeds:register.description.thirdLine'),

            i18next.t('embeds:register.description.fourthLine')
        ].join('\n')
    )
    // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({
        text: i18next.t('embeds:register.footer', { count }),
    });

export default RegisterEmbed;