const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");

const { token } = require("./config");

const cliente = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Carga de los eventos
const archivosEventos = fs
  .readdirSync("./src/eventos")
  .filter((archivo) => archivo.endsWith(".js"));

for (const archivoEvento of archivosEventos) {
  const evento = require(`./eventos/${archivoEvento}`);

  if (evento.once) {
    cliente.once(evento.name, (...args) => evento.ejecutar(...args));
  } else {
    cliente.on(evento.name, (...args) => evento.ejecutar(...args));
  }
}

// Carga de los comandos
cliente.comandos = new Collection();
const archivosComandos = fs
  .readdirSync("./src/comandos")
  .filter((archivo) => archivo.endsWith(".js"));

for (const archivoComando of archivosComandos) {
  const comando = require(`./comandos/${archivoComando}`);
  cliente.comandos.set(comando.datos.name, comando);
}

// Inicio del cliente
cliente.login(token);
