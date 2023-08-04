import { EmbedBuilder, User } from "discord.js"
import i18next from "i18next";

const Balance = (user: User, balance: number) => new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(i18next.t('embeds:balance.title'))
    .setAuthor({ name: user.client.user.username, iconURL: user.client.user.avatarURL() || user.client.user.defaultAvatarURL, url: 'https://discord.js.org' })
    .setDescription(i18next.t('embeds:balance.description', { balance }))
    .setThumbnail(i18next.t('embeds:balance.thumbnail'))
    .setTimestamp()
    .setFooter({ 
        text: user.username, 
        iconURL: user.avatarURL() || user.defaultAvatarURL
    });

export default Balance;