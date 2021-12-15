module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // Inicio del manager de erela.js
    client.manager.init(client.user.id);

    console.log(`Party bot iniciado como - ${client.user.tag}`);
  },
};
