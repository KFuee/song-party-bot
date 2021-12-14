const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde con Pong"),
  async execute(interaction) {
    interaction.reply({ content: "Pong" });
  },
};
