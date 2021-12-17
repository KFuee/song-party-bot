const { Collection } = require("discord.js");

class GamePlayer {
  constructor() {
    this.scores = new Collection();
    this.answers = new Collection();
  }

  setScore(round, score) {
    this.scores.set(round, score);
  }

  setAnswer(round, answer, correct) {
    this.answers.set(round, {
      answer,
      correct,
    });
  }

  hasAnswered(round) {
    return this.answers.has(round);
  }
}

module.exports = GamePlayer;
