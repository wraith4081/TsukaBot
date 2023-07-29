import { ButtonBuilder, ButtonStyle } from "discord.js";

const RegisterButton = new ButtonBuilder()
    .setCustomId('register')
    .setEmoji('859388130411282442')
    .setLabel('Agree the Rules')
    .setStyle(ButtonStyle.Primary)

export default RegisterButton;