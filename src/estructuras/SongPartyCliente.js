const fs = require("fs");
const { Client, Collection } = require("discord.js");

class SongPartyCliente extends Client {
  constructor(options) {
    super(options);

    this.config = require("../config");

    this.comandos = new Collection();
  }

  cargarEventos() {
    const archivosEventos = fs
      // Navegar hacia atrás en el directorio
      .readdirSync("src/eventos")
      .filter((archivo) => archivo.endsWith(".js"));

    for (const archivoEvento of archivosEventos) {
      const evento = require(`../eventos/${archivoEvento}`);

      if (evento.once) {
        this.once(evento.name, (...args) => evento.ejecutar(...args));
      } else {
        this.on(evento.name, (...args) => evento.ejecutar(...args));
      }
    }
  }

  cargarComandos() {
    const archivosComandos = fs
      .readdirSync("src/comandos")
      .filter((archivo) => archivo.endsWith(".js"));

    for (const archivoComando of archivosComandos) {
      const comando = require(`../comandos/${archivoComando}`);
      this.comandos.set(comando.datos.name, comando);
    }
  }

  async iniciar() {
    this.cargarEventos();
    this.cargarComandos();

    // Inicio del cliente con el token
    await this.login(this.config.token);
  }
}

module.exports = SongPartyCliente;
