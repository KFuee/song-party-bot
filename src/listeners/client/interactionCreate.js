module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    // Comprueba si la interacción es un comando
    if (!interaction.isCommand() && !interaction.isSelectMenu()) return;

    if (interaction.isCommand()) {
      // Obtiene el comando
      const command = client.commands.get(interaction.commandName);

      // Comprueba si el comando existe
      if (!command) return;

      // Ejecuta el comando
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "Ha ocurrido un error ejecutando el comando",
          ephemeral: true,
        });
      }
    }

    if (interaction.isSelectMenu()) {
      // Obtiene el usuario que ha seleccionado una opción
      const userId = interaction.user.id;

      // Obtiene la partida de la colección de partidas
      const game = client.games.get(interaction.guildId);

      // Comprueba si la partida existe
      if (!game) return;

      // Comprueba si el usuario ya ha seleccionado una opción
      if (game.answers.has(userId)) return;

      // Añade la respuesta del usuario a la partida
      game.addAnswer(game.round, interaction.values[0], userId);
    }
  },
};
