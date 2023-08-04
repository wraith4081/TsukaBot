import { EmbedBuilder, User } from "discord.js"

import i18next from "i18next";
i18next.t('embeds:alreadyRegistered.description')
const AlreadyRegisteredEmbed = (user: User) => new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(i18next.t('embeds:alreadyRegistered.title'))
    .setAuthor({ name: user.client.user.username, iconURL: user.client.user.avatarURL() || user.client.user.defaultAvatarURL, url: 'https://discord.js.org' })
    .setDescription(i18next.t('embeds:alreadyRegistered.description'))
    .setThumbnail(i18next.t('embeds:alreadyRegistered.thumbnail'))
    .setTimestamp()
    .setFooter({ 
        text: user.username, 
        iconURL: user.avatarURL() || user.defaultAvatarURL
    });

export default AlreadyRegisteredEmbed;