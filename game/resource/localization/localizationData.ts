import { AbilityLocalization, LocalizationData, ModifierLocalization, StandardLocalization } from "@shushishtok/tooltip_generator/localizationInterfaces";
import { Language } from "../languages";

export function GenerateLocalizationData(): LocalizationData
{
    // This section can be safely ignored, as it is only logic.
    //#region Localization logic
    // Arrays
    const Abilities: Array<AbilityLocalization> = new Array<AbilityLocalization>();
    const Modifiers: Array<ModifierLocalization> = new Array<ModifierLocalization>();
    const StandardTooltips: Array<StandardLocalization> = new Array<StandardLocalization>();    

    // Create object of arrays
    const localization_info: LocalizationData =
    {
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
        notes:
        [
            "The projectile moves at {projectile_speed} speed.",
            "Despite the visual effect, all enemies in range immediately take damage upon impact.",
            "Can be disjointed."
        ],
    
        ability_specials:
        [
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
