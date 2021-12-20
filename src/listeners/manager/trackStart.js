const { MessageEmbed } = require("discord.js");

const Functions = require("../../utils/Functions");

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
    const answers = game.getRandomAnswers(5);

    // Crea un nuevo embed con las respuestas
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setAuthor(
        `${client.user.username} - Ronda número ${game.round}`,
        client.user.displayAvatarURL()
      )
      .setTitle("**¿Qué canción está sonando?**")
      .setThumbnail(
        "https://media.baamboozle.com/uploads/images/85252/1627329151_9674.png"
      )
      .setDescription(
        answers
          .map((answer, index) => `**${index + 1}**. ${answer}`)
          .join("\n") +
          "\n\n" +
          `***¡Tienes ${Functions.convertMsToSeconds(
            game.round_duration
          )} segundos para responder!***`
      )
      .setFooter(
        `ID de la partida: ${game.id}, iniciada por ${member.displayName}`
      );

    // Envía el embed
    const embedMessage = await channel.send({ embeds: [embed] });

    // Añade n reacciones del 1 al 9 máximo en emoji
    for (let i = 0; i < answers.length; i++) {
      embedMessage.react(`${i + 1}⃣`);
    }

    // Filtro para obtener las reacciones
    const filter = (reaction, user) => {
      return (
        ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"].includes(
          reaction.emoji.name
        ) && game.players.has(user.id)
      );
    };

    // Colector de reacciones para obtener las respuestas
    const reactions = await embedMessage.awaitReactions({
      filter,
      max: game.players.size,
      time: game.round_duration,
    });

    // Itera sobre las reacciones
    reactions.forEach((reaction) => {
      // Itera sobre los jugadores que han seleccionado la reacción
      reaction.users.cache.forEach((user) => {
        // Comprueba si el usuario es un bot
        if (user.bot) return;

        // Obtiene la respuesta seleccionada
        const answer = answers[reaction.emoji.name.charCodeAt(0) - 49];

        // Añade la respuesta del usuario a la partida
        game.addAnswer(user.id, answer);
      });
    });

    // Envía un mensaje de finalización
    const finRoundMessage = await channel.send(
      `¡La ronda ha finalizado! Preparando la ronda ${game.round + 1}...`
    );

    // Finaliza la ronda
    game.endRound();

    // Elimina los mensajes enviados
    embedMessage.delete();
    // Establece un tiempo de espera para eliminar el mensaje de finalización
    setTimeout(async () => {
      await finRoundMessage.delete();

      // Una vez eliminado el mensaje, salta a la siguiente canción
      player.stop();
    }, 5000);
  },
};
