const { Intents } = require("discord.js");

const SongPartyClient = require("./structures/SongPartyClient");

const client = new SongPartyClient({
  intents: [Intents.FLAGS.GUILDS],
});

// Inicio del cliente
client.run();
