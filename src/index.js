const { Intents } = require("discord.js");

const SongPartyCliente = require("./estructuras/SongPartyCliente");

const cliente = new SongPartyCliente({
  intents: [Intents.FLAGS.GUILDS],
});

// Inicio del cliente
cliente.iniciar();
