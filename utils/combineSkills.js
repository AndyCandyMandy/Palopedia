function combineSkills(helmet, chest, arms, waist, legs, talisman) {
    const skillMap = new Map();
    const skillArray = [...helmet.skills, ...chest.skills, ...arms.skills, ...waist.skills, ...legs.skills, ...talisman.skills]

    //❌✅❎⭕☑️
    for (let i = 0; i < skillArray.length; i++) {
        if (!skillMap.has(skillArray[i].skill.name)) {
            skillMap.set(skillArray[i].skill.name, [skillArray[i].level, 0, skillArray[i].description]);
        } 
        else {
            let preLevel = skillMap.get(skillArray[i].skill.name)[0];
            skillMap.set(skillArray[i].skill.name, [preLevel + skillArray[i].level, 0, skillArray[i].description]);
        }
    } 

    const skillField = [];
    skillMap.forEach((body, name) => {
        skillField.push({
                name: `${name} Lvl. ${body[0]}`,
                value: `${body[2]}`, 
                inline: false
        });
    });

    console.log(skillMap);
    return skillField;
} 

module.exports = { combineSkills };