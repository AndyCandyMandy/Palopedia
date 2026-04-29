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

module.exports = { getColorRarity };