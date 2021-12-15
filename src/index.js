const { Intents } = require("discord.js");

const SongPartyClient = require("./structures/SongPartyClient");

const client = new SongPartyClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});

// Inicio del cliente
client.run();
