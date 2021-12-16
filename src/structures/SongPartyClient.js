const glob = require("glob");
const join = require("path").join;
const { Manager } = require("erela.js");
const { Client, Collection } = require("discord.js");

class SongPartyClient extends Client {
  constructor(options) {
    super(options);

    this.config = require("../config");

    this.games = new Collection();
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
    // Obtiene todos los eventos del directorio listeners y subdirectorios
    const eventFiles = glob.sync(join(__dirname, "../listeners/**/*.js"));

    for (const eventFile of eventFiles) {
      const event = require(eventFile);

      if (event.manager) {
        this.manager.on(event.name, (...args) => event.execute(this, ...args));
        return;
      }

      if (event.once) {
        this.once(event.name, (...args) => event.execute(this, ...args));
      } else {
        this.on(event.name, (...args) => event.execute(this, ...args));
      }
    }
  }

  loadCommands() {
    // Obtiene todos los comandos del directorio commands
    const commandFiles = glob.sync(join(__dirname, "../commands/*.js"));

    for (const commandFile of commandFiles) {
      const command = require(commandFile);
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
