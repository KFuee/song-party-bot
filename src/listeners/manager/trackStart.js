const { MessageEmbed } = require("discord.js");

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

    console.log(answers);
  },
};
