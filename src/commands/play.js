const { SlashCommandBuilder } = require("@discordjs/builders");

const Game = require("../structures/Game");
const SongPartyMusic = require("../structures/SongPartyMusic");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Iniciar una partida de trivia")
    .addIntegerOption((option) =>
      option
        .setName("rounds")
        .setDescription("Número de rondas a jugar")
        .setRequired(true)
    ),
  async execute(interaction) {
    const client = interaction.client;
    const guildId = interaction.guildId;

    // Obtiene el servidor y el usuario que ha ejecutado el comando
    const guild = client.guilds.cache.get(guildId);
    const userId = interaction.user.id;
    const member = guild.members.cache.get(userId);

    // Obtiene el canal de texto y el canal de voz
    const textChannel = interaction.channelId;
    const voiceChannel = member.voice.channel;

    // Comprueba si el usuario está en un canal de voz
    if (!voiceChannel) {
      interaction.reply("Debes estar en un canal de voz para poder jugar.");
      return;
    }

    // Obtiene todos los ids de los usuarios del canal de voz menos el bot
    const players = voiceChannel.members
      .filter((player) => !player.user.bot)
      .map((player) => player.user.id);

    // Instancia un nuevo objeto SongPartyMusic
    const music = new SongPartyMusic(guild);

    // Conecta el cliente al canal de voz
    music.connect(textChannel, voiceChannel.id);

    // Obtiene las canciones de la playlist
    const playlistTracks = await music.getPlaylistTracks(
      "https://www.youtube.com/watch?v=J4_W-R3iPJ8&list=PLxZHtuv5hUL94eMtcOOV0BiZu6a4cRo4J",
      userId
    );

    // Crea una instancia de la clase Game
    const game = new Game(
      playlistTracks,
      interaction.options.getInteger("rounds")
    );

    // Crea: jugadores, canciones. Modifica el estado de la partida
    game.start(players);

    // Añade la partida a la colección de partidas
    client.games.set(guildId, game);

    // Añade las canciones aleatorias a la cola
    music.addTracksToQueue(game.randomTracks);

    // Responde al usuario con el número de rondas y jugadores
    await interaction.reply(
      `Iniciando partida con ${game.players.size} ${
        game.players.size > 1 ? "jugadores" : "jugador"
      } y ${game.nRounds} rondas...`
    );

    setTimeout(async () => {
      // Elimina la respuesta después de 5 segundos
      await interaction.deleteReply();

      // Reproduce la primera canción
      music.play(30, 60, false);
    }, 5000);
  },
};
