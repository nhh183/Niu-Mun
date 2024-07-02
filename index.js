const { Player } = require('discord-player');
const { Client, GatewayIntentBits} = require('discord.js');
const { botToken } = require('./config');
import { SpeedInsights } from "@vercel/speed-insights/next"

global.client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent
	],
	disableMentions: 'everyone',
});
client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
require('./Src/events');
require('./Src/loader');
require('http').createServer((req, res) => res.end(' Niu Mun ')).listen(3000)
require('dotenv').config()
client.login(botToken||process.env.BOTTOKEN)
