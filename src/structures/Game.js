const { Collection } = require("discord.js");

const GamePlayer = require("./GamePlayer");
const Functions = require("../utils/Functions");

class Game {
  constructor(playlistSongs) {
    // Genera una id aleatoria para la partida con Math.random()
    this.id = "game_" + Math.random().toString(36).substring(2, 9);

    this.round = 0;
    this.state = "preparing";

    this.players = new Collection();
    this.playlistSongs = playlistSongs;
    this.randomSongs = [];
  }

  // Crea todos los jugadores de la partida
  createPlayers(players) {
    players.forEach((player) => {
      this.players.set(player, new GamePlayer());
    });
  }

  // Obtiene n canciones aleatorias de la playlist
  getRandomSongs(n) {
    // Comprueba si hay canciones en la playlist
    if (!this.playlistSongs) {
      return;
    }

    // Mezcla las canciones aleatoriamente
    const randomSongs = Functions.randomizeArray(this.playlistSongs);

    // Obtiene n canciones de randomSongs
    const randomSongs_slice = randomSongs.slice(0, n);

    // Devuelve las canciones
    return randomSongs_slice;
  }

  // Obtiene n respuestas aleatorias de la playlist
  getRandomAnswers(n, track) {
    // Mezcla las canciones aleatoriamente
    const randomSongs = Functions.randomizeArray(this.playlistSongs);

    // Obtiene n - 1 canciones de randomSongs
    const randomSongs_slice = randomSongs.slice(0, n - 1);

    // Obtiene una array de respuestas aleatorias
    const answers = randomSongs_slice.map((track) => {
      const randomBoolean = Functions.randomBoolean();

      if (randomBoolean) {
        return track.title;
      } else {
        return track.author;
      }
    });

    // Añade la canción correcta a las respuestas
    const randomBoolean = Functions.randomBoolean();

    if (randomBoolean) {
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
  addAnswer(player, answer) {
    // Obtiene el jugador de la colección de jugadores
    const gamePlayer = this.players.get(player);

    // Comprueba si el jugador ha respondido ya
    if (gamePlayer.hasAnswered(this.round)) return;

    // Comprueba si la respuesta es correcta
    const correct = this.checkAnswer(answer);

    // Añade la respuesta al jugador
    gamePlayer.setAnswer(this.round, answer, correct);

    // Añade la puntuación al jugador si es correcta
    if (correct) {
      this.addScore(player, 1);
    }
  }

  addScore(player, score) {
    // Obtiene el jugador de la colección de jugadores
    const gamePlayer = this.players.get(player);

    // Añade la puntación al jugador
    gamePlayer.setScore(this.round, score);
  }

  // Obtiene el número de jugadores que quedan por responder
  getRemainingPlayers() {
    // Obtiene el número de jugadores
    const players = this.players.size;

    // Obtiene el número de jugadores que han respondido
    const answeredPlayers = this.players.filter((player) => {
      return player.hasAnswered(this.round);
    });

    // Devuelve el número de jugadores que quedan por responder
    return players - answeredPlayers.size;
  }

  // Inicia la partida
  start(players) {
    // Crea los jugadores de la partida
    this.createPlayers(players);

    // Obtiene las canciones aleatorias
    this.randomSongs = this.getRandomSongs(5);

    // Aumenta el número de ronda
    this.round++;

    // Cambia el estado de la partida
    this.state = "playing";
  }
}

module.exports = Game;
