require('dotenv').config();

const { REST, Routes } = require('discord.js');
const { APP_ID: appId, GUILD_ID: guildId, DISCORD_TOKEN: token } = process.env;
const rest = new REST().setToken(token);
// ...
// for guild-based commands
rest
	.put(Routes.applicationGuildCommands(appId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);
// for global commands
rest
	.put(Routes.applicationCommands(appId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);