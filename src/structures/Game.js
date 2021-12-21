const { Collection } = require("discord.js");

const GamePlayer = require("./GamePlayer");
const Functions = require("../utils/Functions");

class Game {
  constructor(playlistTracks, nRounds) {
    // Genera una id aleatoria para la partida con Math.random()
    this.id = "game_" + Math.random().toString(36).substring(2, 9);

    this.round = 0;
    this.nRounds = nRounds;
    // Duración de la ronda en milisegundos
    this.round_duration = 30000;
    this.state = "preparing";

    this.players = new Collection();
    this.playlistTracks = playlistTracks;
    this.randomTracks = [];
  }

  // Obtiene la canción actual
  get currentTrack() {
    return this.randomTracks[0];
  }

  // Crea todos los jugadores de la partida
  createPlayers(players) {
    players.forEach((player) => {
      this.players.set(player, new GamePlayer());
    });
  }

  // Obtiene n canciones aleatorias de la playlist
  getRandomTracks(n) {
    // Comprueba si hay canciones en la playlist
    if (!this.playlistTracks) {
      return;
    }

    // Mezcla las canciones aleatoriamente
    const randomTracks = Functions.randomizeArray(this.playlistTracks);

    // Obtiene n canciones de randomTracks
    const randomTracks_slice = randomTracks.slice(0, n);

    // Devuelve las canciones
    return randomTracks_slice;
  }

  // Obtiene n respuestas aleatorias de randomTracks
  getRandomAnswers(n) {
    // Mezcla las canciones aleatoriamente
    const randomTracks = Functions.randomizeArray(this.playlistTracks);

    // Obtiene n - 1 canciones de randomTracks
    const randomTracks_slice = randomTracks.slice(0, n - 1);

    // Obtiene una array de respuestas aleatorias
    let answers = randomTracks_slice.map((track) => {
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
      answers.push(this.currentTrack.title);
    } else {
      answers.push(this.currentTrack.author);
    }

    // Vuelve a mezclar las respuestas
    answers = Functions.randomizeArray(answers);

    // Devuelve las respuestas
    return answers;
  }

  checkAnswer(answer) {
    // Comprueba si la respuesta es correcta
    if (
      answer === this.currentTrack.title ||
      answer === this.currentTrack.author
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

    // Comprueba si la respuesta es correcta
    const correct = this.checkAnswer(answer);

    // Añade la respuesta al jugador
    gamePlayer.setAnswer(this.round, answer, correct);

    // Añade la puntuación al jugador si es correcta
    if (correct) {
      this.addScore(player, 1);
    } else {
      this.addScore(player, 0);
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
    this.randomTracks = this.getRandomTracks(this.nRounds);

    // Aumenta el número de ronda
    this.round++;

    // Cambia el estado de la partida
    this.state = "playing";
  }

  // Finaliza la ronda
  endRound() {
    // Elimina última canción reproducida de randomTracks
    this.randomTracks.shift();

    // Comprueba si la partida ha terminado
    if (this.round === this.nRounds) {
      this.state = "finished";

      return;
    }

    // Aumenta el número de ronda
    this.round++;
  }
}

module.exports = Game;
