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

  // Obtiene n canciones aleatorias de la playlist
  async getRandomSongs(n, playlist) {
    // Comprueba si existe un reproductor en el servidor
    if (!this.player) {
      return;
    }

    // Obtiene la playlist
    const res = await this.player.search(playlist, this.guild.id);

    // Obtiene las canciones aleatorias
    const songs = res.tracks.slice(0, n);

    // Devuelve las canciones
    return songs;
  }

  // Se conecta al canal de voz
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

  // Reproduce una canción
  play(song) {
    // Comprueba si existe un reproductor en el servidor
    if (!this.player) {
      return;
    }

    // Añade la canción al reproductor
    this.player.queue.add(song);

    // Comprueba si el reproductor está reproduciendo
    if (
      !this.player.playing &&
      !this.player.paused &&
      !this.player.queue.size
    ) {
      // Reproduce la canción
      this.player.play();
    }
  }
}

module.exports = SongPartyMusic;
