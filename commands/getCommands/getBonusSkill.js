const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');  

const { getAllSkill, getSkill } = require('../../utils/api.js'); 
const { getSkillIcon } = require('../../utils/getIcon.js'); 
const { getSkillColor } = require('../../utils/getColor.js'); 

let bonusCache = {};
async function loadbonusCache(bonusType) {
    if (!bonusCache[bonusType]) {
        bonusCache[bonusType] = await getAllSkill(bonusType); 
    }
    return bonusCache[bonusType];
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_bonus_skill')
		.setDescription('Retrieves a set bonus/group skill from Monster Hunter Wilds!') 
        .addStringOption((option) => option.setName('bonus_type').setDescription('Declare the bonus skill type.').setRequired(true)
            .addChoices(
                { name: 'Group Skill', value: 'group' },
                { name: 'Set Bonus Skill', value: 'set' },
            )
        )
		.addStringOption(option => option.setName('bonus_name').setDescription('Declare the bonus skill name.').setRequired(true).setAutocomplete(true)),  

        async autocomplete(interaction) {  
            const bonusType = interaction.options.getString('bonus_type');
            const focusedOption = interaction.options.getFocused(true);

            if (!bonusType) {
                return interaction.respond([]);
            }

            const bonusSkillList = await loadbonusCache(bonusType); 

            const filtered = bonusSkillList
            .filter(setBonus => setBonus.kind === bonusType && setBonus.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())).slice(0, 25);
            await interaction.respond(filtered.map((setBonus) => ({ name: setBonus.name, value: String(setBonus.id) })));
        }, 

        async execute(interaction) { 
            const bonusSkillId = interaction.options.getString('bonus_name');
            const bonusSkill = await getSkill(bonusSkillId); 

            const bonusSkillKind = bonusSkill.kind[0].toUpperCase() + bonusSkill.kind.slice(1);
            const bonusSkillIcon = getSkillIcon(bonusSkill.icon.kind);
            const bonusSkillColor = getSkillColor(bonusSkill.icon.kind);

            const rankField = []; 
            for (let i = 0; i < bonusSkill.ranks.length; i++) {
                rankField.push({
                    name: `${bonusSkill.name} Lvl. ${bonusSkill.ranks[i].level}`,
                    value: 
                    `${bonusSkill.ranks[i].description}\u200b
                    **(${bonusSkill.ranks[i].setPiecesRequired} Armor Pieces)**`, 
                    inline: false
                });
            } 

            const bonusSkillInfoEmbed = new EmbedBuilder()
            .setColor(bonusSkillColor) 
            .setTitle(bonusSkill.name)
            .setDescription(`**Bonus Type:** ${bonusSkillKind} Skill\u200b`)
            .setThumbnail(`attachment://${bonusSkillIcon.name}`)
            .setFields(rankField);

            await interaction.reply({ embeds: [bonusSkillInfoEmbed], files: [bonusSkillIcon] });
        }
}