"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateLocalizationData = void 0;
function GenerateLocalizationData() {
    // This section can be safely ignored, as it is only logic.
    //#region Localization logic
    // Arrays
    var Abilities = new Array();
    var Modifiers = new Array();
    var StandardTooltips = new Array();
    // Create object of arrays
    var localization_info = {
        AbilityArray: Abilities,
        ModifierArray: Modifiers,
        StandardArray: StandardTooltips,
    };
    //#endregion
    // Enter localization data below! 
    Abilities.push({
        ability_classname: "axe_berserkers_call_ts",
        name: "Beserkers Call",
        description: "Taunt some fellas",
        lore: "Big red and angry",
        notes: [
            "The projectile moves at {projectile_speed} speed.",
            "Despite the visual effect, all enemies in range immediately take damage upon impact.",
            "Can be disjointed."
        ],
        ability_specials: [
            {
                ability_special: "radius",
                text: "RADIUS:"
            },
            {
                ability_special: "bonus_armor",
                text: "BONUS ARMOR:"
            },
            {
                ability_special: "duration",
                text: "DURATION:"
            }
        ]
    });
    Modifiers.push({
        modifier_classname: "modifier_greater_power",
        name: "Greater Power",
        description: "Increases your base damage and your move speed."
    });
    StandardTooltips.push({
        classname: "Hello",
        name: "test"
    });
    // Return data to compiler
    return localization_info;
}
exports.GenerateLocalizationData = GenerateLocalizationData;
