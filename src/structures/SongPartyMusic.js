class SongPartyMusic {
  constructor(guild) {
    this.guild = guild;
  }

  // Devuelve el objeto Manager de Erela.js
  get manager() {
    return this.guild.client.manager;
  }

  // Devuelve el objeto Player de Erela.js
  get player() {
    return this.manager.players.get(this.guild.id) || null;
  }

  // Obtiene las canciones de una playlist
  async getPlaylistTracks(playlist, requester) {
    // Comprueba si existe un reproductor en el servidor
    if (!this.player) {
      return;
    }

    // Obtiene las canciones de la playlist
    const playlistTracks = await this.player.search(playlist, requester);

    // Devuelve las canciones
    return playlistTracks.tracks;
  }

  // Se conecta al canal de voz
  connect(text, voice) {
    // Comprueba si existe un reproductor en el servidor
    if (this.player) {
      return;
    }

    // Crea un nuevo reproductor
    const player = this.manager.create({
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

  // Reproduce una canción
  play(track, start, end, noReplace) {
    // Comprueba si existe un reproductor en el servidor
    if (!this.player) {
      return;
    }

    // Añade la canción al reproductor
    this.player.queue.add(track);

    // Comprueba si el reproductor está reproduciendo
    if (
      !this.player.playing &&
      !this.player.paused &&
      !this.player.queue.size
    ) {
      // endTime, de segundos a milisegundos
      const endTime = end * 1000;

      // startTime, de segundos a milisegundos
      const startTime = start * 1000;

      // Reproduce la canción
      this.player.play({ endTime, noReplace, startTime });
    }
  }
}

module.exports = SongPartyMusic;
