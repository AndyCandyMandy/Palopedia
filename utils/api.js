async function getArmor() {
    //const url = `https://wilds.mhdb.io/en/armor/?type=${armorType}`;
    const url = `https://wilds.mhdb.io/en/armor/235`;
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

module.exports = { getArmor };