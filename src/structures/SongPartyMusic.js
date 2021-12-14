class SongPartyMusic {
  constructor(guild) {
    this.guild = guild;
  }

  // Devuelve el objeto SongPartyClient
  get client() {
    return this.guild.client;
  }

  // Devuelve el objeto player de erela.js
  get player() {
    return this.client.manager.players.get(this.guild.id) || null;
  }

  connect(text, voice) {
    // Comprueba si existe un reproductor en el servidor
    if (this.player) {
      return;
    }

    // Crea un nuevo reproductor
    const player = this.client.manager.create({
      selfDeafen: true,
      textChannel: text,
      voiceChannel: voice,
      guild: this.guild.id,
    });

    // Comprueba si ya se ha conectado a un canal de voz
    if (player.state !== "CONNECTED") {
      player.connect();
    }
  }
}

module.exports = SongPartyMusic;
