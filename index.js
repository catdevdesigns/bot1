require('dotenv').config(); // Load environment variables

const Discord = require('discord.js');
const express = require('express');

// ✅ Define client with required intents for v12.5.3
const client = new Discord.Client({
  ws: {
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES']
  }
});

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID; 
const PORT = process.env.PORT || 3000;

// 🎉 Happy welcome messages
const welcomeMessages = [
  '🎉 Hey {user}, welcome to the server! We’re so glad you’re here!',
  '👋 Welcome aboard, {user}! Let the fun begin!',
  '😄 Hi {user}, we’re super happy to have you here!',
  '🥳 {user} just landed! Let’s make some memories!',
  '✨ Yay! {user} joined us — it’s a party now!',
];

// 💔 Sad leave messages
const goodbyeMessages = [
  '💔 {user} has left us. The server feels emptier now...',
    '😢 Goodbye, {user}. We’ll miss you...',
  '🥀 {user} is gone... and with them, a little joy too.',
  '😞 {user} left the server. It’s a sad day.',
  '👋 {user} said goodbye. Take care out there.',
];

// ✅ When bot is ready
client.once('ready', () => {
console.log(`Logged in as ${client.user.tag}`);
});

// ✅ Greet new member
client.on('guildMemberAdd', member => {
  console.log(`${member.user.tag} joined`);
  const channel = member.guild.channels.cache.get(CHANNEL_ID);
  if (channel) {
    const message = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    channel.send(message.replace('{user}', `<@${member.id}>`));

  }
});

// ✅ Say goodbye when member leaves
client.on('guildMemberRemove', member => {
  console.log(`${member.user.tag} left`);
  const channel = member.guild.channels.cache.get(CHANNEL_ID);
  if (channel) {
    const message = goodbyeMessages[Math.floor(Math.random() * goodbyeMessages.length)];
    channel.send(message.replace('{user}', member.user.username));
  }
});

// ✅ Optional: Respond to !ping
client.on('message', message => {
  if (message.author.bot) return;
  if (message.content === '!ping') {
    message.channel.send('🏓 Pong!');
  }
});

const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(PORT, () => console.log(`🌐 Web server running on port ${PORT}`));

// ✅ Start bot
client.login(TOKEN);
