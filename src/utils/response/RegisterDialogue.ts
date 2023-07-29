import { EmbedBuilder, User } from "discord.js"

const RegisterEmbed = (user: User, count: number) => new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Failure to abide by or violate the following rules may result as account reset or ban.')
    .setAuthor({ name: `${user.client.user.username} Bot Rules`, iconURL: user.client.user.avatarURL() || user.client.user.defaultAvatarURL, url: 'https://discord.js.org' })
    .setDescription(
        [
            '* It banned everything that provides an additional advantage over other users. These include but are not limited to macros, auto-farmers, and auto-anything.',

            '* Don\'t use exploits found in the bot. Report them immediately.',
            '* In-game currency can only be converted to non-bot resources using the official system. We forbid all 3rd party services and currency trading for anything good outside of the bot.',

            '*By clicking the emoji at the bottom, you agree to accept all terms and conditions and accept responsibility for your actions.*'
        ].join('\n')
    )
    // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({
        text: `${count} users agreed`,
    });

export default RegisterEmbed;