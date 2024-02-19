const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { TOKEN } = require("../config.json");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const gradient = require("gradient-string");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);

const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

module.exports = async (client) => {

  const rest = new REST({ version: "10" }).setToken(TOKEN || process.env.token);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: client.commands,
    });
  } catch (error) {
    console.error(error);
  }
 
    console.log(gradient.rainbow(`${client.user.tag} olarak giriş yaptım!`));
     
    console.log(gradient.retro(`discord mutifix`));
    client.user.setActivity(`mutifix Oto Cevap Sistemi`)
};
