module.exports = {
  name: "nodeConnect",
  manager: true,
  async execute(_client, node) {
    // Obtiene el identificador del nodo Lavalink
    const nodeId = node.options.identifier;

    console.log(`Conectado al nodo Lavalink "${nodeId}" correctamente`);
  },
};
