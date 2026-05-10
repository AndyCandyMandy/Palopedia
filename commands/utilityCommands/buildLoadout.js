const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');  


const { getArmor, getArmorPiece, getAllTalisman, getTalisman } = require('../../utils/api.js'); 

let armorCache = null;
async function loadArmorCache() {
    if (!armorCache) {
        armorCache = await getArmor();
    }
    return armorCache;
}


let talismanCache = null;
async function loadTalismanCache() {
    if (!talismanCache) {
        talismanCache = await getAllTalisman(); 
    }
    return talismanCache;
}

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
            const focusedOption = interaction.options.getFocused(true); 

            let equipmentList = []; 
            let armorType = "";
            if (focusedOption.name === "talisman_name") {
                equipmentList = await loadTalismanCache();

                const filtered = equipmentList
                .filter(talisman => talisman.random === false && talisman.ranks[0].name.toLowerCase().startsWith(focusedOption.value.toLowerCase())).slice(0, 25);
                await interaction.respond(filtered.map((talisman) => ({ name: talisman.ranks[0].name.slice(0, -2), value: String(talisman.id) })));
            }
            else {
                if (focusedOption.name === "helmet_name") {
                    equipmentList = await loadArmorCache(); 
                    armorType = "head";
                } 
                else if (focusedOption.name === "chest_name") {
                    equipmentList = await loadArmorCache(); 
                    armorType = "chest";
                } 
                else if (focusedOption.name === "vambrace_name") {
                    equipmentList = await loadArmorCache(); 
                    armorType = "arms";
                } 
                else if (focusedOption.name === "coil_name") {
                    equipmentList = await loadArmorCache(); 
                    armorType = "waist";
                } 
                else if (focusedOption.name === "legging_name") {
                    equipmentList = await loadArmorCache(); 
                    armorType = "legs";
                }
                const filtered = equipmentList
                .filter(armor => armor.kind === armorType && armor.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())).slice(0, 25);
                await interaction.respond(filtered.map((armor) => ({ name: armor.name, value: String(armor.id) })));
            }

        },

        async execute(interaction) { 

        }
}