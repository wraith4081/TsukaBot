import { EmbedBuilder, User } from "discord.js"

const Balance = (user: User, balance: number) => new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Heres your balance!')
    // .setURL('https://discord.js.org/')
    .setAuthor({ name: user.client.user.username, iconURL: user.client.user.avatarURL() || user.client.user.defaultAvatarURL, url: 'https://discord.js.org' })
    .setDescription(`You have **${balance} coins**!`)
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
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

export default Balance;