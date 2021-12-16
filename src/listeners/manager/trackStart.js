const { MessageEmbed, MessageActionRow, Messa } = require("discord.js");

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
      .setTitle(`Ronda número: ${game.ronda + 1}`)
      // Añadir las respuestas con número de respuesta
      .addField(
        "Respuestas",
        answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n")
      )
      .setDescription("Reacciona con el número de la respuesta que desees")
      .setFooter(`ID de la partida: ${game.id}`);

    // Envía el embed al canal de texto
    channel.send({ embeds: [embed] });

    // Incrementa la ronda
    game.ronda++;
  },
};
