module.exports = {
  name: "raw",
  once: false,
  async execute(client, packet) {
    if (!["VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"].includes(packet.t)) {
      return;
    }

    /* Envía los datos del paquete a Lavalink cada vez que el bot se conecta
    a un canal de voz */
    client.manager.updateVoiceState(packet);
  },
};
