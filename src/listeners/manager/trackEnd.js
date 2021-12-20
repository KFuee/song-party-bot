const SongPartyMusic = require("../../structures/SongPartyMusic");

module.exports = {
  name: "trackEnd",
  manager: true,
  async execute(client, _player, _track, payload) {
    const guildId = payload.guildId;
    const guild = client.guilds.cache.get(guildId);

    // Instancia un nuevo objeto SongPartyMusic
    const music = new SongPartyMusic(guild);

    // Reproduce la siguiente canción de randomTracks
    music.play(30, 60, false);
  },
};
