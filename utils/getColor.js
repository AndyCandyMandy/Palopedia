function getColorRarity(armorRarity) { 

    const armorColorTable = {
        1: "#808080",
        2: "#ffffff", 
        3: "#83b239", 
        4: "#47b367", 
        5: "#4ec3e5", 
        6: "#4c4cda",
        7: "#685ecd",
        8: "#e26d44",
    }

    const colorRarity = armorColorTable[armorRarity] || armorColorTable[1];
    return colorRarity;
} 

function getSkillColor(skillType) {

    const skillColorTable = {
        affinity: "#5e4c79",
        attack: "#854e4a",
        defense: "#816c3f",
        element: "#664c79",
        gathering: "#787042",
        handicraft: "#847d4a",
        health: "#547f43",
        item: "#437571", 
        offense: "#7b5265", 
        ranged: "#73797f", 
        stamina: "#976f36",
        utility: "#4a5a84"
    } 
    const skillColor = skillColorTable[skillType] || skillColorTable["item"]; 
    return skillColor;
}

module.exports = { getColorRarity, getSkillColor };