const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 

const { getArmor, getArmorPiece } = require('../../utils/api.js'); 
const { getArmorIcon } = require('../../utils/getArmorIcon.js');
const { getColorRarity } = require('../../utils/getColor.js'); 
const { armorDecoSlots } = require('../../utils/armorDecoSlots.js'); 


let armorCache = {};
async function loadArmorCache(armorType) {
    if (!armorCache[armorType]) {
        armorCache[armorType] = await getArmor(armorType);
    }
    return armorCache[armorType];
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_armor')
		.setDescription('Retrieves an armor piece from Monster Hunter Wilds!')
		.addStringOption((option) => option.setName('armor_type').setDescription('Declare the armor type.').setRequired(true)
            .addChoices(
                { name: 'Helmet', value: 'head' },
                { name: 'Chest', value: 'chest' },
                { name: 'Vambrace', value: 'arms' },
                { name: 'Coil', value: 'waist' },
                { name: 'Leggings', value: 'legs' }
            )
        )
        .addStringOption(option => option.setName('armor_name').setDescription('Declare the armor name').setRequired(true).setAutocomplete(true)),

	async autocomplete(interaction) {
        const armorType = interaction.options.getString('armor_type');
        const focusedOption = interaction.options.getFocused(true);

        if (!armorType) {
            return interaction.respond([]);
        }

        const armorList = await loadArmorCache(armorType);

		const filtered = armorList
        .filter(armor => armor.kind === armorType && armor.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())).slice(0, 25);
		await interaction.respond(filtered.map((armor) => ({ name: armor.name, value: String(armor.id) })));
	},

	async execute(interaction) {
        const armorId = interaction.options.getString('armor_name');
        const armor = await getArmorPiece(armorId); 

        const colorRarity = getColorRarity(armor.rarity); 
        const armorIcon = getArmorIcon(armor.kind, armor.rarity); 

        const slots = armorDecoSlots(armor.slots);

        const skillField = [];
        for (let i = 0; i < armor.skills.length; i++) {
            skillField.push({
                name: `${armor.skills[i].skill.name} Lvl. ${armor.skills[i].level}`,
                value: `${armor.skills[i].description}`, 
                inline: false
            });
        } 

        const armorInfoEmbed = new EmbedBuilder()
            .setColor(colorRarity) 
            .setTitle(armor.name)
            .setDescription(
`**Rarity:** ${armor.rarity}\u200b
${armor.description}\n
**Decoration Slots:** ${slots}\n 
**Armor Stats & Resistances**\u200b
\`\`\`🛡️DEF: (${armor.defense.base}) -> (${armor.defense.max})
-------------------
🔥Fire          ${armor.resistances.fire}
💧Water         ${armor.resistances.water}
🧊Ice           ${armor.resistances.ice}
⚡Thunder       ${armor.resistances.thunder}
🐲Dragon        ${armor.resistances.dragon}\`\`\``
            )
            .setThumbnail(`attachment://${armorIcon.name}`)
            .setFields(skillField);

        await interaction.reply({ embeds: [armorInfoEmbed], files: [armorIcon] });

	},
};