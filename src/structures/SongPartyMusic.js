class SongPartyMusic {
  constructor(guild) {
    this.guild = guild;
  }

  // Devuelve el objeto Client
  get client() {
    return this.guild.client;
  }

  // Devuelve el objeto Manager
  get manager() {
    return this.client.manager;
  }

  // Devuelve el objeto Player
  get player() {
    return this.manager.players.get(this.guild.id) || null;
  }

  get game() {
    return this.client.games.get(this.guild.id) || null;
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

  // Añade las canciones a la cola
  addTracksToQueue(tracks) {
    // Comprueba si existe un reproductor en el servidor
    if (!this.player) {
      return;
    }

    this.player.queue.add(tracks);
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
  play(start, end, noReplace) {
    // Comprueba si existe un reproductor en el servidor
    if (!this.player) {
      return;
    }

    // Comprueba si el reproductor está reproduciendo
    if (
      !this.player.playing &&
      !this.player.paused &&
      this.player.queue.totalSize === this.game.randomTracks.length
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
