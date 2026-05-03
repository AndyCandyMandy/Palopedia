const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const path = require("node:path");

module.exports = {
	data: new SlashCommandBuilder().setName("help").setDescription("Retrieves and displays a help menu for Palopedia!"),
	async execute(interaction) {

		const paloIcon = new AttachmentBuilder(
			path.join(__dirname, "../../assets/Palopedia_Icon.png"), 
			{ name: 'Palopedia_Icon.png' }
		);

		const helpInfoEmbed = new EmbedBuilder() 
			.setColor("#6c95c6") 
			.setTitle("Palopedia Help Menu") 
			.setDescription(
`"Heres the command list meow-ster!"\n
If there are any issues please contact the server owner.\u200b
**Discord Invite:** https://discord.com/oauth2/authorize?client_id=1493775697938878674

**1.) /getArmor:**\u200b 
This will display the armor name, rarity, ingame description, decoration slots, stats, and embedded skills.\u200b 
\`\`\`/get_armor\`\`\` 

**2.) /getSkill:**\u200b  
Type this command to retrieve a skill from Monster Hunter Wilds!\u200b
\`\`\`/getSkill\`\`\`
`
			) 
			.setThumbnail("attachment://Palopedia_Icon.png");

		await interaction.reply({ embeds: [helpInfoEmbed], files: [paloIcon] });
	},
    
};