const { AttachmentBuilder } = require('discord.js');
const path = require('node:path'); 

function getSkillIcon(skillType) {
    const skillIconTable = {
        affinity: "MHWilds-Affinity_Skill_Icon.png",
        attack: "MHWilds-Attack_Skill_Icon.png",
        defense: "MHWilds-Defense_Skill_Icon.png",
        element: "MHWilds-Element_Skill_Icon.png",
        gathering: "MHWilds-Gathering_Skill_Icon.png",
        handicraft: "MHWilds-Sharpness_Skill_Icon.png",
        health: "MHWilds-Health_Skill_Icon.png",
        item: "MHWilds-Item_Skill_Icon.png", 
        offense: "MHWilds-Empower_Skill_Icon.png", 
        ranged: "MHWilds-Ammo_Skill_Icon.png", 
        stamina: "MHWilds-Stamina_Skill_Icon.png",
        utility: "MHWilds-Reinforce_Skill_Icon.png"
    } 

    const iconPath = skillIconTable[skillType] ?? armorIconTable["item"];
    const skillIcon = new AttachmentBuilder(
        path.join(__dirname, `../assets/MHWILDS_ICONS/skill/${iconPath}`),
        { name: path.basename(iconPath)}
    );
    return skillIcon;
} 

module.exports = { getSkillIcon };