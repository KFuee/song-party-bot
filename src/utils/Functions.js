class Functions {
  static randomBoolean() {
    return Math.random() >= 0.5;
  }

  static randomizeArray(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  static convertMsToSeconds(ms) {
    return Math.floor(ms / 1000);
  }

  static convertSecondsToMs(seconds) {
    return seconds * 1000;
  }
}

module.exports = Functions;
