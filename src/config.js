require("dotenv").config();

module.exports = {
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  token: process.env.TOKEN,
  lavalinkNodes: [
    {
      host: "localhost",
      port: 2333,
      password: process.env.LAVALINK_PASSWORD,
      retryAmount: 5,
      retryDelay: 10000,
    },
  ],
};
