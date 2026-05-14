function combineSkills(helmet, chest, arms, waist, legs, talisman, skillList) {
    const skillMap = new Map();
    const skillArray = [...helmet.skills, ...chest.skills, ...arms.skills, ...waist.skills, ...legs.skills, ...talisman.skills]


    for (let i = 0; i < skillArray.length; i++) {
        let currentSkill = skillList
        .find(skill => skill.id === skillArray[i].skill.id);
        
        if (!skillMap.has(skillArray[i].skill.name)) {
            skillMap.set(skillArray[i].skill.name, [skillArray[i].level, currentSkill.ranks[currentSkill.ranks.length - 1], currentSkill.ranks[skillArray[i].level - 1]]);
        } 
        else {
            let preLevel = skillMap.get(skillArray[i].skill.name)[0];

            if (skillArray[i].level + preLevel > currentSkill.ranks[currentSkill.ranks.length - 1].level) {
                skillMap.set(skillArray[i].skill.name, [preLevel + skillArray[i].level, currentSkill.ranks[currentSkill.ranks.length - 1], currentSkill.ranks[currentSkill.ranks.length - 1]]);
            } 
            else {
                skillMap.set(skillArray[i].skill.name, [preLevel + skillArray[i].level, currentSkill.ranks[currentSkill.ranks.length - 1], currentSkill.ranks[preLevel + skillArray[i].level - 1]]);
            }
        }
    } 

    const skillField = [];
    skillMap.forEach((body, name) => {
        if (body[2].setPiecesRequired != null) {
            // Group/Set Bonus Section
            if (body[0] >= body[2].setPiecesRequired) {
                skillField.push({
                    name: `({⭕}) ${name} Lvl. ${body[2].level}`,
                    value: `**(Wearing ${body[0]}/${body[2].setPiecesRequired} Armor Pieces)**\n${body[2].description}`, 
                    inline: false
                });
            } 
            else {
                skillField.push({
                    name: `({ - }) ${name} Lvl. ${body[2].level}`,
                    value: `**(Wearing ${body[0]}/${body[2].setPiecesRequired} Armor Pieces)**\n${body[2].description}`, 
                    inline: false
                });
            }
        } 
        else {
            // Weapon/Armor Skill Section
            if (body[0] == body[1].level) {
                skillField.push({
                    name: `({⭕}) ${name} Lvl. ${body[2].level} *(Max)*`,
                    value: `${body[2].description}`, 
                    inline: false
                });
            }
            else if (body[0] > body[1].level) {
                skillField.push({
                    name: `({❌}) ${name} Lvl. ${body[2].level} *(Overleveled by ${body[0] - body[1].level})*`,
                    value: `\u2003\u2003${body[2].description}`, 
                    inline: false
                });
            } 
            else {
                skillField.push({
                    name: `({ - }) ${name} Lvl. ${body[2].level}`,
                    value: `${body[2].description}`, 
                    inline: false
                });
            }
        }
        
    });

    return skillField;
} 

module.exports = { combineSkills };