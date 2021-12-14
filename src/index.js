const { Client, Intents } = require("discord.js");

const config = require("./config");

const cliente = new Client({ intents: [Intents.FLAGS.GUILDS] });

cliente.on("ready", () => {
  console.log(`Party bot iniciado como - ${cliente.user.tag}`);
});

cliente.login(config.token);
