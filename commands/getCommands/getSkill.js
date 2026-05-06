const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');  

const { getAllSkill, getSkill } = require('../../utils/api.js'); 
const { getSkillIcon } = require('../../utils/getIcon.js'); 
const { getSkillColor } = require('../../utils/getColor.js'); 

let skillCache = {};
async function loadSkillCache(skillType) {
    if (!skillCache[skillType]) {
        skillCache[skillType] = await getAllSkill(skillType); 
    }
    return skillCache[skillType];
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_skill')
		.setDescription('Retrieves an equipment skill from Monster Hunter Wilds!')
        .addStringOption((option) => option.setName('skill_type').setDescription('Declare the skill type.').setRequired(true)
            .addChoices(
                { name: 'Weapon', value: 'weapon' },
                { name: 'Armor', value: 'armor' },
            )
        )
		.addStringOption(option => option.setName('skill_name').setDescription('Declare the skill name.').setRequired(true).setAutocomplete(true)), 
        
    async autocomplete(interaction) { 
        const skillType = interaction.options.getString('skill_type');
        const focusedOption = interaction.options.getFocused(true);

        if (!skillType) {
            return interaction.respond([]);
        }

        const skillList = await loadSkillCache(skillType);

        const filtered = skillList
        .filter(skill => skill.kind === skillType && skill.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())).slice(0, 25);
		await interaction.respond(filtered.map((skill) => ({ name: skill.name, value: String(skill.id) })));
    },

    async execute(interaction) { 
        const skillId = interaction.options.getString('skill_name');
        const skill = await getSkill(skillId); 

        const skillKind = skill.kind[0].toUpperCase() + skill.kind.slice(1);
        const skillIcon = getSkillIcon(skill.icon.kind);
        const skillColor = getSkillColor(skill.icon.kind);

        const rankField = []; 
        for (let i = 0; i < skill.ranks.length; i++) {
            rankField.push({
                name: `${skill.name} Lvl. ${skill.ranks[i].level}`,
                value: `${skill.ranks[i].description}`, 
                inline: false
            });
        } 

        const skillInfoEmbed = new EmbedBuilder()
            .setColor(skillColor) 
            .setTitle(skill.name)
            .setDescription(
`**Skill Type:** ${skillKind}\u200b
${skill.description}\n
-------------------------`
            ) 
            .setThumbnail(`attachment://${skillIcon.name}`)
            .setFields(rankField);

        await interaction.reply({ embeds: [skillInfoEmbed], files: [skillIcon] });
    }, 
};