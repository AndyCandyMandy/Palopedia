const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');  
const path = require("node:path");

const { getAllTalisman, getTalisman } = require('../../utils/api.js'); 
const { getTalismanIcon } = require('../../utils/getIcon.js');
const { getColorRarity } = require('../../utils/getColor.js'); 


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

			let highestRarity = 0;
			const rankField = []; 
            for (let i = 0; i < talisman.ranks.length; i++) { 
				if (talisman.ranks[i].rarity > highestRarity) {
					highestRarity = talisman.ranks[i].rarity;
				}

                rankField.push({
                    name: `${talisman.ranks[i].name}`,
                    value: 
                    `**Rarity** ${talisman.ranks[i].rarity}\u200b
                    ${talisman.ranks[i].skills[0].skill.name} Lvl. ${talisman.ranks[i].skills[0].level}\u200b
					- ${talisman.ranks[i].skills[0].description}`, 
                    inline: false
                });
            }  

			const colorRarity = getColorRarity(highestRarity);
			const talismanIcon = getTalismanIcon(highestRarity);

			const talismanInfoEmbed = new EmbedBuilder()
            .setColor(colorRarity) 
            .setTitle(talisman.ranks[0].name.slice(0, -2))
            .setDescription(
`${talisman.ranks[0].description}
-------------------------`)
			.setThumbnail(`attachment://${talismanIcon.name}`)
			.setFields(rankField);

            await interaction.reply({ embeds: [talismanInfoEmbed], files: [talismanIcon] });
        }
}