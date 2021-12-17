const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  name: "trackStart",
  manager: true,
  async execute(client, player, track, payload) {
    const guild = client.guilds.cache.get(payload.guildId);
    if (!guild) return;

    const channel = guild.channels.cache.get(player.options.textChannel);
    if (!channel) return;

    const member = guild.members.cache.get(track.requester);
    if (!member) return;

    // Obtiene la partida de la colección de partidas
    const game = client.games.get(payload.guildId);

    // Obtiene las posibles respuestas
    const answers = game.getRandomAnswers(5, track);

    // Crea un nuevo embed con las respuestas
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setTitle(`Ronda número ${game.round + 1}`)
      .setDescription(
        "¿Qué canción está sonando? \n " +
          "Selecciona una de las siguientes opciones.\n \n" +
          "¡Tienes 30 segundos para responder!"
      )
      .setFooter(`ID de la partida: ${game.id}`);

    // Crea un selector de respuestas
    const select = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("respuesta")
        .setPlaceholder("Selecciona una respuesta")
        .addOptions(
          answers.map((answer, index) => ({
            label: `Opción ${index + 1}`,
            description: answer,
            value: answer,
          }))
        )
    );

    // Envía el embed y select al canal de texto
    channel.send({ embeds: [embed], components: [select] });

    // Incrementa la ronda
    game.round++;
  },
};
