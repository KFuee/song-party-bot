module.exports = {
  name: "interactionCreate",
  once: false,
  async ejecutar(interaccion) {
    // Obtiene el cliente
    const cliente = interaccion.client;

    // Comprueba si la interacción es un comando
    if (!interaccion.isCommand()) return;

    // Obtiene el comando
    const comando = cliente.comandos.get(interaccion.commandName);

    // Comprueba si el comando existe
    if (!comando) return;

    // Ejecuta el comando
    try {
      await comando.ejecutar(interaccion);
    } catch (error) {
      console.error(error);
      await interaccion.reply({
        content: "Ha ocurrido un error ejecutando el comando",
        ephemeral: true,
      });
    }
  },
};
