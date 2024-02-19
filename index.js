const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const db = require("justdata")
const gradient = require("gradient-string");
const client = new Client({
  intents: INTENTS,
  allowedMentions: {
    parse: ["users"]
  },
  partials: PARTIALS,
  retryLimit: 32
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs");
const { TOKEN } = require("./config.json");
const { Modal } = require("discord-modals");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: props.dm_permission,
        type: 1
    });
      
    console.log(gradient.rainbow(`[BOT] ${props.name} komutu yüklendi.`))
    

});
readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log
    console.log(gradient.rainbow(`[EVENT] ${name} eventi yüklendi.`))
 
});
const { joinVoiceChannel } = require('@discordjs/voice')
client.on('ready', () => {
  let channel = client.channels.cache.get("bot ses kanal ıdsi")
 

      const VoiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
  });
})



client.login(TOKEN)
