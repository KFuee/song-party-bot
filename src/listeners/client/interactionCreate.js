module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    // Comrprueba si la interacción es un comando
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

    // Comprueba si la interacción es una respuesta
    if (interaction.isSelectMenu()) {
      // Obtiene el usuario que ha seleccionado una opción
      const userId = interaction.user.id;
      // Obtiene el nombre de usuario del jugador
      const userName = interaction.user.username;

      // Obtiene la partida de la colección de partidas
      const game = client.games.get(interaction.guildId);

      // Comprueba si la partida existe
      if (!game) return;

      // Comprueba si el jugador ya ha respondido
      if (game.players.get(userId).hasAnswered(game.round)) {
        return;
      }

      // Añade la respuesta del usuario a la partida
      game.addAnswer(userId, interaction.values[0]);

      // Obtiene el número de jugadores que quedan por responder
      const remaining = game.getRemainingPlayers();

      let content = "";
      if (remaining > 0) {
        content = `El jugador (${userName}) ha seleccionado una opción, esperando a ${remaining} ${
          remaining !== 1 ? "jugadores" : "jugador"
        }.`;
      } else {
        content = `El jugador (${userName}) ha sido el último en responder, pasando a la ronda ${
          game.round + 1
        }.`;
      }

      // Envía el mensaje de respuesta
      await interaction.reply({
        content,
        ephemeral: false,
      });
    }
  },
};
