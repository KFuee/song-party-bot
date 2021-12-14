module.exports = {
  name: "ready",
  once: true,
  ejecutar(cliente) {
    console.log(`Party bot iniciado como - ${cliente.user.tag}`);
  },
};
