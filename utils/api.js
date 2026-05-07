async function getArmor(armorType) {
    const url = `https://wilds.mhdb.io/en/armor?kind=${armorType}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
} 

async function getArmorPiece(armorId) {
    const url = `https://wilds.mhdb.io/en/armor/${armorId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
} 

async function getAllSkill(skillType) {
    const url = `https://wilds.mhdb.io/en/skills?kind=${skillType}`; 

    try { 
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}  

async function getSkill(skillId) {
    const url = `https://wilds.mhdb.io/en/skills/${skillId}`; 

    try { 
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

module.exports = { getArmor, getArmorPiece, getAllSkill, getSkill };