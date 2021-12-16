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

    const embed = new MessageEmbed()
      .setColor(member.displayColor)
      .setAuthor(member.displayName, member.user.displayAvatarURL())
      .setTitle(track.title)
      .setURL(track.uri)
      .setThumbnail(track.thumbnail)
      .setFooter(`Duración: ${track.duration}`);

    channel.send({ embeds: [embed] });
  },
};
