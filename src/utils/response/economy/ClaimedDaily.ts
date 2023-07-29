import { EmbedBuilder, User } from "discord.js"

const ClaimedDaily = (user: User, streak: number, amount: number) => new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Successfully claimed your daily reward!')
    // .setURL('https://discord.js.org/')
    .setAuthor({ name: user.client.user.username, iconURL: user.client.user.avatarURL() || user.client.user.defaultAvatarURL, url: 'https://discord.js.org' })
    .setDescription(`You have claimed your daily reward!\nYou have claimed **${amount} coins**!\nYour streak is now **${streak}**!`)
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

export default ClaimedDaily;