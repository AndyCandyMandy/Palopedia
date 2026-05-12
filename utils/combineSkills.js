const { getAllSkill, getSkill } = require('../utils/api.js'); 

let skillCache = null;
async function loadSkillCache() {
    if (!skillCache) {
        skillCache = await getAllSkill(); 
    }
    return skillCache;
}

function combineSkills(helmet, chest, arms, waist, legs, talisman) {
    const skillMap = new Map();
    const skillArray = [...helmet.skills, ...chest.skills, ...arms.skills, ...waist.skills, ...legs.skills, ...talisman.skills]


    for (let i = 0; i < skillArray.length; i++) {
        if (!skillMap.has(skillArray[i].id)) {
            skillMap.set(skillArray[i].id, skillArray[i].level);
        } 
        else {
            let preLevel = skillMap.get(skillArray[i].id);
            skillMap.set(skillArray[i].id, preLevel + skillArray[i].level);
        }
    } 

    console.log(skillMap);
    return skillMap;
} 

module.exports = { combineSkills };