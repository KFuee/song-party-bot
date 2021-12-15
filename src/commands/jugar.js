const { SlashCommandBuilder } = require("@discordjs/builders");

const SongPartyMusic = require("../structures/SongPartyMusic");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jugar")
    .setDescription("Iniciar una partida de trivia"),
  async execute(interaction) {
    const client = interaction.client;
    const guildId = interaction.guildId;

    // Obtiene el servidor y el usuario que ha ejecutado el comando
    const guild = client.guilds.cache.get(guildId);
    const member = guild.members.cache.get(interaction.user.id);

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
  },
};
