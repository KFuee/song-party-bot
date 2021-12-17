class Functions {
  static randomBoolean() {
    return Math.random() >= 0.5;
  }

  static randomizeArray(array) {
    return array.sort(() => 0.5 - Math.random());
  }
}

module.exports = Functions;
