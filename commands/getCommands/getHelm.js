const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 

const { getArmor } = require('../../utils/api.js'); 
const { getArmorIcon } = require('../../utils/getArmorIcon.js');
const { getColorRarity } = require('../../utils/getColorRarity.js');

module.exports = {

	data: new SlashCommandBuilder().setName('get_helm').setDescription('Retrieves a low ranking armor piece from Monster Hunter Wilds!'),
	async execute(interaction) { 

        try {
            const armor = await getArmor();

            const skillField = [];
            for (let i = 0; i < armor.skills.length; i++) {
                skillField.push({
                    name: `${armor.skills[i].skill.name} Lvl. ${armor.skills[i].level}`,
                    value: `${armor.skills[i].description}`, 
                    inline: false
                });
            } 

            const armorIcon = getArmorIcon(armor.kind, armor.rarity); 

            const colorRarity = getColorRarity(armor.rarity);
            
            const armorInfoEmbed = new EmbedBuilder()
            .setColor(colorRarity) 
            .setTitle(armor.name)
            .setDescription(
`**Rarity:** ${armor.rarity}\u200b
${armor.description}\n
**Decoration Slots:** ${armor.slots}\n 
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
        }
        
        catch (error) {
            console.error(error);
			await interaction.reply({
				content: 'Failed to fetch armor data.',
				ephemeral: true
			});
        }
        
	},
    
};