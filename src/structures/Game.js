const { Collection } = require("discord.js");

class Game {
  constructor(players, playlistSongs) {
    // Genera una id aleatoria para la partida con Math.random()
    this.id = Math.random();

    this.round = 0;
    this.scores = new Collection();
    this.answers = new Collection();
    this.state = "preparing";

    this.players = players;
    this.playlistSongs = playlistSongs;
    this.randomSongs = this.getRandomSongs(5);
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

  checkAnswer(answer) {
    // Comprueba si la respuesta es correcta
    if (
      answer === this.randomSongs[this.round - 1].title ||
      answer === this.randomSongs[this.round - 1].author
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Añade una respuesta a la partida
  addAnswer(round, answer, player) {
    // Comprueba si la respuesta es correcta
    const correct = this.checkAnswer(answer);

    // Comprueba si el jugador se encuentra en la colección de respuestas
    if (this.answers.has(player)) {
      // Obtiene las respuestas del jugador
      const playerAnswers = this.answers.get(player);

      // Añade las respuestas al jugador
      playerAnswers.push({
        round,
        answer,
        correct,
      });
      this.answers.set(player, playerAnswers);
    } else {
      // Añade el jugador a la colección de respuestas
      this.answers.set(player, [
        {
          round,
          answer,
          correct,
        },
      ]);
    }

    // Añade la puntación al jugador si la respuesta es correcta
    if (correct) {
      this.addScore(player, 1);
    }
  }

  addScore(player, score) {
    // Comprueba si el jugador se encuentra en la colección de puntos
    if (this.scores.has(player)) {
      // Obtiene los puntos del jugador
      const playerScore = this.scores.get(player);

      // Añade los puntos al jugador
      playerScore.push(score);
      this.scores.set(player, playerScore);
    } else {
      // Añade el jugador a la colección de puntos
      this.scores.set(player, [score]);
    }
  }
}

module.exports = Game;
