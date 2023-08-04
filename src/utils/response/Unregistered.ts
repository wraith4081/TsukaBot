import { EmbedBuilder, User } from "discord.js"

import i18next from "i18next";

const UnregisteredEmbed = (user: User) => new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(i18next.t('embeds:unregistered.title'))
    // .setURL('https://discord.js.org/')
    .setAuthor({ name: user.client.user.username, iconURL: user.client.user.avatarURL() || user.client.user.defaultAvatarURL, url: 'https://discord.js.org' })
    .setDescription(i18next.t('embeds:unregistered.description'))
    .setThumbnail(i18next.t('embeds:unregistered.thumbnail'))
    /*.addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
    )*/
    //.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    //.setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ 
        text: user.username, 
        iconURL: user.avatarURL() || user.defaultAvatarURL
    });

export default UnregisteredEmbed;