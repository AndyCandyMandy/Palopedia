const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');  

const { getAllTalisman, getTalisman } = require('../../utils/api.js'); 


let talismanCache = null;
async function loadTalismanCache() {
    if (!talismanCache) {
        talismanCache = await getAllTalisman(); 
    }
    return talismanCache;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_talisman')
		.setDescription('Retrieves a talisman from Monster Hunter Wilds!') 
		.addStringOption(option => option.setName('talisman_name').setDescription('Declare the talisman name.').setRequired(true).setAutocomplete(true)), 

		async autocomplete(interaction) {  
            const focusedOption = interaction.options.getFocused(true);

            const talismanList = await loadTalismanCache(); 

			// The monster hunter wilds API doc has "random" as "randomized". "Random" is the correct key at time of writing.
            const filtered = talismanList
            .filter(talisman => talisman.random === false && talisman.ranks[0].name.toLowerCase().startsWith(focusedOption.value.toLowerCase())).slice(0, 25);
            await interaction.respond(filtered.map((talisman) => ({ name: talisman.ranks[0].name.slice(0, -2), value: String(talisman.id) })));
        },
		async execute(interaction) { 
            const talismanId = interaction.options.getString('talisman_name');
            const talisman = await getTalisman(talismanId); 

			const talismanInfoEmbed = new EmbedBuilder()
            .setColor('#fcba03') 
            .setTitle(talisman.ranks[0].name.slice(0, -2))
            .setDescription(`TESTING`);

            await interaction.reply({ embeds: [talismanInfoEmbed] });
        }
}