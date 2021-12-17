const glob = require("glob");
const join = require("path").join;
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { clientId, guildId, token } = require("./config");

// Definición de los comandos
const commands = [];
const commandFiles = glob.sync(join(__dirname, "/commands/*.js"));

// Carga de los comandos
for (const commandFile of commandFiles) {
  const command = require(commandFile);
  commands.push(command.data.toJSON());
}

// Actualiza los comandos en el servidor vía REST
const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    console.log("Actualizando comandos (/) en el servidor...");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });

    console.log("Comandos (/) actualizados correctamente.");
  } catch (error) {
    console.error(error);
  }
})();
