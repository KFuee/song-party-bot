const { SlashCommandBuilder } = require("@discordjs/builders");

const Game = require("../structures/Game");
const SongPartyMusic = require("../structures/SongPartyMusic");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Iniciar una partida de trivia"),
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

    // Instancia un nuevo objeto SongPartyMusic
    const music = new SongPartyMusic(guild);

    // Conecta el cliente al canal de voz
    music.connect(textChannel, voiceChannel.id);

    // Obtiene las canciones de la playlist
    const playlistSongs = await music.getPlaylistSongs(
      "https://www.youtube.com/watch?v=J4_W-R3iPJ8&list=PLxZHtuv5hUL94eMtcOOV0BiZu6a4cRo4J",
      userId
    );

    // Obtiene todos los miembros del canal de voz
    const players = voiceChannel.members.map((player) => player.id);

    // Crea una instancia de la clase Game
    const game = new Game(players, playlistSongs);

    // Añade la partida a la colección de partidas
    client.games.set(guildId, game);

    // Reproduce la primera canción
    music.play(game.randomSongs[0]);
  },
};
