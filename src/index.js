const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");

const { token } = require("./config");

const cliente = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Crea una colección de comandos
cliente.comandos = new Collection();
const archivosComandos = fs
  .readdirSync("./src/comandos")
  .filter((archivo) => archivo.endsWith(".js"));

for (const archivoComando of archivosComandos) {
  const comando = require(`./comandos/${archivoComando}`);
  cliente.comandos.set(comando.datos.nombre, comando);
}

cliente.on("ready", () => {
  console.log(`Party bot iniciado como - ${cliente.user.tag}`);
});

cliente.on("interactionCreate", async (interaccion) => {
  if (!interaccion.isCommand()) return;

  const comando = cliente.comandos.get(interaccion.commandName);

  if (!comando) return;

  try {
    await comando.ejecutar(interaccion);
  } catch (error) {
    console.error(error);
    await interaccion.reply({
      content: "Ha ocurrido un error ejecutando el comando",
      ephemeral: true,
    });
  }
});

cliente.login(token);
