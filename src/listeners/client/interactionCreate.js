module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(client, interaction) {
    // Comprueba si la interacción es un comando
    if (!interaction.isCommand()) return;

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
  },
};
