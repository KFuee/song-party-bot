const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { clientId, guildId, token } = require("./config");

// Definición de los comandos
const comandos = [];
const archivosComandos = fs
  .readdirSync("./src/comandos")
  .filter((archivo) => archivo.endsWith(".js"));

// Carga de los comandos
for (const archivoComando of archivosComandos) {
  const comando = require(`./comandos/${archivoComando}`);
  comandos.push(comando.datos.toJSON());
}

// Actualiza los comandos en el servidor vía REST
const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Actualizando comandos (/) en el servidor...");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: comandos,
    });

    console.log("Comandos (/) actualizados correctamente.");
  } catch (error) {
    console.error(error);
  }
})();
