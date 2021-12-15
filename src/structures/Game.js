class Game {
  constructor(players, playlist) {
    // Genera una id aleatoria para la partida con Math.random()
    this.id = Math.random();
    this.players = players;
    this.state = "preparing";
    this.scores = {};
    this.playlist = playlist;
  }
}

module.exports = Game;
