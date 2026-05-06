const { AttachmentBuilder } = require('discord.js');
const path = require('node:path');

function getArmorIcon(armorType, armorRarity) { 

    const armorIconTable = {
        head: {
            1: "head/MHWilds-Helmet_Icon_Rare_1.png",
            2: "head/MHWilds-Helmet_Icon_Rare_2.png",
            3: "head/MHWilds-Helmet_Icon_Rare_3.png",
            4: "head/MHWilds-Helmet_Icon_Rare_4.png",
            5: "head/MHWilds-Helmet_Icon_Rare_5.png",
            6: "head/MHWilds-Helmet_Icon_Rare_6.png",
            7: "head/MHWilds-Helmet_Icon_Rare_7.png",
            8: "head/MHWilds-Helmet_Icon_Rare_8.png"
        },
        chest: {
            1: "chest/MHWilds-Chestplate_Icon_Rare_1.png",
            2: "chest/MHWilds-Chestplate_Icon_Rare_2.png",
            3: "chest/MHWilds-Chestplate_Icon_Rare_3.png",
            4: "chest/MHWilds-Chestplate_Icon_Rare_4.png",
            5: "chest/MHWilds-Chestplate_Icon_Rare_5.png",
            6: "chest/MHWilds-Chestplate_Icon_Rare_6.png",
            7: "chest/MHWilds-Chestplate_Icon_Rare_7.png",
            8: "chest/MHWilds-Chestplate_Icon_Rare_8.png"
        }, 
        arms: {
            1: "arms/MHWilds-Armguards_Icon_Rare_1.png",
            2: "arms/MHWilds-Armguards_Icon_Rare_2.png",
            3: "arms/MHWilds-Armguards_Icon_Rare_3.png",
            4: "arms/MHWilds-Armguards_Icon_Rare_4.png",
            5: "arms/MHWilds-Armguards_Icon_Rare_5.png",
            6: "arms/MHWilds-Armguards_Icon_Rare_6.png",
            7: "arms/MHWilds-Armguards_Icon_Rare_7.png",
            8: "arms/MHWilds-Armguards_Icon_Rare_8.png"
        },
        waist: {
            1: "waist/MHWilds-Waist_Icon_Rare_1.png",
            2: "waist/MHWilds-Waist_Icon_Rare_2.png",
            3: "waist/MHWilds-Waist_Icon_Rare_3.png",
            4: "waist/MHWilds-Waist_Icon_Rare_4.png",
            5: "waist/MHWilds-Waist_Icon_Rare_5.png",
            6: "waist/MHWilds-Waist_Icon_Rare_6.png",
            7: "waist/MHWilds-Waist_Icon_Rare_7.png",
            8: "waist/MHWilds-Waist_Icon_Rare_8.png"
        }, 
        legs: {
            1: "legs/MHWilds-Leggings_Icon_Rare_1.png",
            2: "legs/MHWilds-Leggings_Icon_Rare_2.png",
            3: "legs/MHWilds-Leggings_Icon_Rare_3.png",
            4: "legs/MHWilds-Leggings_Icon_Rare_4.png",
            5: "legs/MHWilds-Leggings_Icon_Rare_5.png",
            6: "legs/MHWilds-Leggings_Icon_Rare_6.png",
            7: "legs/MHWilds-Leggings_Icon_Rare_7.png",
            8: "legs/MHWilds-Leggings_Icon_Rare_8.png"
        }
    }

    const iconPath = armorIconTable[armorType]?.[armorRarity] ?? armorIconTable["chest"]?.[1];
    const armorIcon = new AttachmentBuilder(
        path.join(__dirname, `../assets/MHWILDS_ICONS/${iconPath}`),
        { name: path.basename(iconPath)}
    );
    return armorIcon;
}

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

module.exports = { getArmorIcon, getSkillIcon };