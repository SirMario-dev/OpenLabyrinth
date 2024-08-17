import { BaseModifier, registerModifier } from "../../../../lib/dota_ts_adapter";

@registerModifier()
export class modifier_axe_berserkers_call_debuff_ts extends BaseModifier {

    // When set to false, shows the modifier icon on the HUD. Otherwise, the modifier is hidden.
    IsHidden(): boolean {
        return false;
    }

    // When set to true, the outer circle of the modifier is red, indicating that the modifier is a debuff. Otherwise, the outer circle is green.
    IsDebuff(): boolean {
        return true;
    }

    // When set to true, the modifier can be purged by basic dispels.
    IsPurgable(): boolean {
        return false;
    }

    IsStunDebuff(): boolean {
        return false
    }

    // Event call that is triggered when the modifier is created and attached to a unit.
    OnCreated() {
        if (IsServer()) {
            this.GetParent().SetForceAttackTarget(this.GetCaster()); // for creeps
            const caster = this.GetCaster();
            //Undefined check since MoveToTargetToAttack, can't accept a undefined value.
            if (caster != undefined) {
                this.GetParent().MoveToTargetToAttack(caster); // for heroes
            }
        }
    }

    OnRemoved(): void {
        if (IsServer()) {
            this.GetParent().SetForceAttackTarget(undefined);
        }
    }

    CheckState(): Partial<Record<ModifierState, boolean>> {
        return {
            [ModifierState.COMMAND_RESTRICTED]: true,
            [ModifierState.TAUNTED]: true
        }
    }

    GetEffectName(): string {
        return "particles/status_fx/status_effect_beserkers_call.vpcf"
    }
}