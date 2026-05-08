const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');  

module.exports = {
	data: new SlashCommandBuilder()
		.setName('build_loadout')
		.setDescription('Builds a loadout using equipment from Monster Hunter Wilds!') 
		.addStringOption(option => option.setName('helmet_name').setDescription('Declare the helmet name.').setRequired(true).setAutocomplete(true))
        .addStringOption(option => option.setName('chest_name').setDescription('Declare the chest name.').setRequired(true).setAutocomplete(true)) 
        .addStringOption(option => option.setName('vambrace_name').setDescription('Declare the vambrace name.').setRequired(true).setAutocomplete(true)) 
        .addStringOption(option => option.setName('coil_name').setDescription('Declare the coil name.').setRequired(true).setAutocomplete(true)) 
        .addStringOption(option => option.setName('legging_name').setDescription('Declare the legging name.').setRequired(true).setAutocomplete(true)) 
        .addStringOption(option => option.setName('talisman_name').setDescription('Declare the talisman name.').setRequired(true).setAutocomplete(true)), 

        async autocomplete(interaction) {  

        },

        async execute(interaction) { 

        }
}