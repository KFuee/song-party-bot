module.exports = {
  name: "nodeConnect",
  once: false,
  manager: true,
  async execute(_client, node) {
    // Obtiene el identificador del nodo Lavalink
    const nodeId = node.options.identifier;

    console.log(`Conectado al nodo de Lavalink "${nodeId}" correctamente`);
  },
};
