import { BaseModifier, registerModifier } from "../../../../lib/dota_ts_adapter";

@registerModifier()
export class modifier_axe_berserkers_call_ts extends BaseModifier {
    armor: number = 0;

    // When set to false, shows the modifier icon on the HUD. Otherwise, the modifier is hidden.
    IsHidden() {
        return false;
    }

    // When set to true, the outer circle of the modifier is red, indicating that the modifier is a debuff. Otherwise, the outer circle is green.
    IsDebuff() {
        return false;
    }

    // When set to true, the modifier can be purged by basic dispels.
    IsPurgable() {
        return true;
    }

    // Event call that is triggered when the modifier is created and attached to a unit.
    OnCreated() {
        // Get the ability and fetch ability specials from it
        const ability = this.GetAbility();
        if (ability) {
            this.armor = ability.GetSpecialValueFor("bonus_armor");
        }
    }

    OnRefresh(): void {
        const ability = this.GetAbility();
        if (ability) {
            this.armor = ability.GetSpecialValueFor("bonus_armor");
        }
    }

    DeclareFunctions() {
        return [ModifierFunction.PHYSICAL_ARMOR_BONUS];
    }

    GetModifierPhysicalArmorBonus(event: ModifierAttackEvent): number {
        return this.armor;
    }

    GetEffectName(): string {
        return "particles/units/heroes/hero_axe/axe_beserkers_call.vpcf"
    }

    GetEffectAttachType(): ParticleAttachment {
        return ParticleAttachment.ABSORIGIN_FOLLOW;
    }
}