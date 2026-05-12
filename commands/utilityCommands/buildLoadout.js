const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');  


const { getArmor, getArmorPiece, getAllTalisman, getTalisman } = require('../../utils/api.js'); 

const { armorDecoSlots } = require('../../utils/armorDecoSlots.js'); 
const { combineSkills } = require('../../utils/combineSkills.js'); 

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
            const helmetId = interaction.options.getString('helmet_name'); 
            const helmet = await getArmorPiece(helmetId); 
            const helmetSlots = armorDecoSlots(helmet.slots);

            const chestId = interaction.options.getString('chest_name'); 
            const chest = await getArmorPiece(chestId); 
            const chestSlots = armorDecoSlots(chest.slots);

            const armsId = interaction.options.getString('vambrace_name'); 
            const arms = await getArmorPiece(armsId); 
            const armsSlots = armorDecoSlots(arms.slots);

            const waistId = interaction.options.getString('coil_name'); 
            const waist = await getArmorPiece(waistId); 
            const waistSlots = armorDecoSlots(waist.slots);

            const legsId = interaction.options.getString('legging_name'); 
            const legs = await getArmorPiece(legsId); 
            const legsSlots = armorDecoSlots(legs.slots);

            const talismanId = interaction.options.getString('talisman_name'); 
            const talisman = await getTalisman(talismanId);
            const highestTalisman = talisman.ranks[talisman.ranks.length - 1];

            const minDef = helmet.defense.base + chest.defense.base + arms.defense.base + waist.defense.base + legs.defense.base; 
            const maxDef = helmet.defense.max + chest.defense.max + arms.defense.max + waist.defense.max + legs.defense.max;

            const fireRes = helmet.resistances.fire + chest.resistances.fire + arms.resistances.fire + waist.resistances.fire + legs.resistances.fire; 
            const waterRes = helmet.resistances.water + chest.resistances.water + arms.resistances.water + waist.resistances.water + legs.resistances.water; 
            const iceRes = helmet.resistances.ice + chest.resistances.ice + arms.resistances.ice + waist.resistances.ice + legs.resistances.ice; 
            const thunderRes = helmet.resistances.thunder + chest.resistances.thunder + arms.resistances.thunder + waist.resistances.thunder + legs.resistances.thunder; 
            const dragonRes = helmet.resistances.dragon + chest.resistances.dragon + arms.resistances.dragon + waist.resistances.dragon + legs.resistances.dragon;

            const combinedSkills = combineSkills(helmet, chest, arms, waist, legs, highestTalisman); 

            const loadoutInfoEmbed = new EmbedBuilder()
                .setColor("#fcba03") 
                .setTitle(`Loadout`)
                .setDescription(
`**Equipment Set**\u200b
\`\`\`Helm:       ${helmet.name}
Chest:      ${chest.name} 
Arms:       ${arms.name}
Coil:       ${waist.name}
Legs:       ${legs.name}
Talisman:   ${highestTalisman.name}\`\`\`
**Decoration Slots**
${helmetSlots}
${chestSlots} 
${armsSlots} 
${waistSlots} 
${legsSlots} \n
**Equipment Stats & Resistances**\u200b
\`\`\`🛡️DEF: (${minDef}) -> (${maxDef})
-------------------
🔥Fire          ${fireRes}
💧Water         ${waterRes}
🧊Ice           ${iceRes}
⚡Thunder       ${thunderRes}
🐲Dragon        ${dragonRes}\`\`\`
`
                )
                

            await interaction.reply({ embeds: [loadoutInfoEmbed] });
        }
}