const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  datos: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde con Pong"),
  async ejecutar(interaccion) {
    interaccion.reply({ content: "Pong" });
  },
};
