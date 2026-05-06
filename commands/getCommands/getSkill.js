const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');  

const { getAllSkill, getSkill } = require('../../utils/api.js'); 


let skillCache = null;
async function loadSkillCache() {
    if (!skillCache) {
        skillCache = await getAllSkill(); 
    }
    return skillCache;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('get_skill')
		.setDescription('Retrieves an equipment skill from Monster Hunter Wilds!')
		.addStringOption(option => option.setName('skill_name').setDescription('Declare the skill name.').setRequired(true).setAutocomplete(true)), 
        
    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true);

        const skillList = await loadSkillCache();

        const filtered = skillList
        .filter(skill => skill.name.toLowerCase().startsWith(focusedOption.value.toLowerCase())).slice(0, 25);
		await interaction.respond(filtered.map((skill) => ({ name: skill.name, value: String(skill.id) })));
    },

    async execute(interaction) { 
        const skillId = interaction.options.getString('skill_name');
        const skill = await getSkill(skillId); 

        const skillInfoEmbed = new EmbedBuilder()
            .setColor("#83b239") 
            .setTitle(skill.name); 

        await interaction.reply({ embeds: [skillInfoEmbed] });
    }, 
};