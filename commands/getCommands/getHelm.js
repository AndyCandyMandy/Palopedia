const { SlashCommandBuilder, EmbedBuilder } = require('discord.js'); 

const { getArmor } = require('../../utils/api.js');


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
            
            const armorInfoEmbed = new EmbedBuilder()
            .setColor(0xfa8070) 
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
            .setThumbnail("https://monsterhunterwiki.org/images/f/fa/MHWilds-Armguards_Icon_Rare_1.png")
            .setFields(skillField);

            await interaction.reply({ embeds: [armorInfoEmbed] });
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