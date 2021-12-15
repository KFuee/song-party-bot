const fs = require("fs");
const join = require("path").join;
const { Manager } = require("erela.js");
const { Client, Collection } = require("discord.js");

class SongPartyClient extends Client {
  constructor(options) {
    super(options);

    this.config = require("../config");

    this.commands = new Collection();
    this.manager = new Manager({
      nodes: this.config.lavalinkNodes,
      send: (id, payload) => {
        const guild = this.guilds.cache.get(id);
        if (guild) {
          guild.shard.send(payload);
        }
      },
    });
  }

  loadEvents() {
    const eventFiles = fs
      // Navegar hacia atrás en el directorio
      .readdirSync(join(__dirname, "../events"))
      .filter((file) => file.endsWith(".js"));

    for (const eventFile of eventFiles) {
      const event = require(`../events/${eventFile}`);

      if (event.once) {
        this.once(event.name, (...args) => event.execute(...args));
      } else {
        this.on(event.name, (...args) => event.execute(...args));
      }
    }
  }

  loadCommands() {
    const commandFiles = fs
      .readdirSync(join(__dirname, "../commands"))
      .filter((file) => file.endsWith(".js"));

    for (const commandFile of commandFiles) {
      const command = require(`../commands/${commandFile}`);
      this.commands.set(command.data.name, command);
    }
  }

  async run() {
    this.loadEvents();
    this.loadCommands();

    // Inicio del cliente con el token
    await this.login(this.config.token);
  }
}

module.exports = SongPartyClient;
