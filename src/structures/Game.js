class Game {
  constructor(players, playlistSongs) {
    // Genera una id aleatoria para la partida con Math.random()
    this.id = Math.random();
    this.players = players;
    this.playlistSongs = playlistSongs;
    this.randomSongs = this.getRandomSongs(5);
    this.state = "preparing";
    this.scores = {};
  }

  // Obtiene n canciones aleatorias de la playlist
  getRandomSongs(n) {
    // Comprueba si hay canciones en la playlist
    if (!this.playlistSongs) {
      return;
    }

    // Mezcla las canciones aleatoriamente
    const randomSongs = this.playlistSongs.sort(() => 0.5 - Math.random());

    // Obtiene n canciones de randomSongs
    const randomSongs_slice = randomSongs.slice(0, n);

    // Devuelve las canciones
    return randomSongs_slice;
  }

  // Obtiene n respuestas aleatorias de la playlist
  getRandomAnswers(n, track) {
    // Mezcla las canciones aleatoriamente
    const randomSongs = this.playlistSongs.sort(() => 0.5 - Math.random());

    // Obtiene n - 1 canciones de randomSongs
    const randomSongs_slice = randomSongs.slice(0, n - 1);

    // Obtiene una array de respuestas aleatorias
    const answers = randomSongs_slice.map((song) => {
      const randBoolean = Math.random() >= 0.5;

      if (randBoolean) {
        return song.title;
      } else {
        return song.author;
      }
    });

    // Añade la canción correcta a las respuestas
    const randBoolean = Math.random() >= 0.5;

    if (randBoolean) {
      answers.push(track.title);
    } else {
      answers.push(track.author);
    }

    // Devuelve las respuestas
    return answers;
  }
}

module.exports = Game;
