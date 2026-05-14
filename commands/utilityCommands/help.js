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

**1.) /get_armor:**\u200b 
This will display the armor name, rarity, ingame description, decoration slots, stats, and embedded skills. The slash command is divided based on armor piece and armor name.\u200b 
\`\`\`/get_armor\`\`\` 

**2.) /get_skill:**\u200b  
Type this command to retrieve the skill name, type, desciption, and skill levels. This command is divided based on the skill type (Armor or Weapon) and the skill name.\u200b
\`\`\`/get_skill\`\`\` 

**3.) /get_bonus_skill:**\u200b  
This command will retrieve the set bonus/group skills assigned to the specifc armor in the game. It will display the skill name, type, skill level, level desciptions, and the required armor pieces for each level. This slash command is diveded between the set bonus/group skills and the skill name.\u200b
\`\`\`/get_set_bonus\`\`\` 

**4.) /get_talisman:**\u200b  
Type this command to retrieve a talisman which includes its name, desciption, and its possible levels. Each level displays its specifc name, rarity, attached skill and its skill descriptor.\u200b
\`\`\`/get_talisman\`\`\` 

**5.) /build_loadout:**\u200b  
This command builds an equipment loadout using the helmet, chest, vambraces, coil and legging armor pieces along with a talisman. This showcases the cumulative decoration slots, armor stats, and armor skills.\u200b
\`\`\`/build_loadout\`\`\` 
`
			) 
			.setThumbnail("attachment://Palopedia_Icon.png");

		await interaction.reply({ embeds: [helpInfoEmbed], files: [paloIcon] });
	},
    
};