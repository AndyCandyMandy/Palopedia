function armorDecoSlots(decoSlots) { 
    let slots = "";
    if (decoSlots == null) {
        slots = "{( - )}{( - )}{( - )}" 
    } 
    else {
        let counter = 0;
        while (counter < 3) {
            if (decoSlots[counter] == "1" || decoSlots[counter] == "2" || decoSlots[counter] == "3") {
                slots += "{( " + decoSlots[counter] + " )}"
            } 
            else {
                slots += "{( - )}"
            }
            counter += 1;
        }
    } 
    return slots;
} 


module.exports = { armorDecoSlots };