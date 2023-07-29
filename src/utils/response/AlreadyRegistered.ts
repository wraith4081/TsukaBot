import { EmbedBuilder, User } from "discord.js"

const AlreadyRegisteredEmbed = (user: User) => new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('You are already registered!')
    .setAuthor({ name: user.client.user.username, iconURL: user.client.user.avatarURL() || user.client.user.defaultAvatarURL, url: 'https://discord.js.org' })
    .setDescription('You are already registered!\nYou cannot register again!')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ 
        text: user.username, 
        iconURL: user.avatarURL() || user.defaultAvatarURL
    });

export default AlreadyRegisteredEmbed;