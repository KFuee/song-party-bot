module.exports = {
  name: "queueEnd",
  manager: true,
  async execute(_client, player) {
    // Desconecta el reproductor del canal de voz
    player.disconnect();
  },
};
