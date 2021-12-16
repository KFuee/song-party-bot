module.exports = {
  name: "nodeError",
  manager: true,
  async execute(_client, node, error) {
    // Obtiene el identificador del nodo Lavalink
    const nodeId = node.options.identifier;

    console.log(`Error en el nodo Lavalink "${nodeId}": ${error}`);
  },
};
