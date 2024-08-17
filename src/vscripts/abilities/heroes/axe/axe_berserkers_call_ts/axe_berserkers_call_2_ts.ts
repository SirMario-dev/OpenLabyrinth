import { BaseAbility, registerAbility } from "../../../../lib/dota_ts_adapter";
import { modifier_axe_berserkers_call_debuff_ts } from "./modifier_axe_berserkers_call_debuff_ts";
import { modifier_axe_berserkers_call_ts } from "./modifier_axe_berserkers_call_ts";

@registerAbility()
export class axe_berserkers_call_2_ts extends BaseAbility {
    sound_cast: string = "Hero_Axe.BerserkersCall.Start";
    sound_hit: string = "Hero_Axe.Berserkers_Call";
    particle_cast: string = "particles/units/heroes/hero_axe/axe_beserkers_call_owner.vpcf";

    // GetCooldown() {
    //     let cooldown = this.GetSpecialValueFor("cooldown");
    //     if (IsServer()) {
    //         const talent = this.GetCaster().FindAbilityByName("special_bonus_unique_meepo_3");
    //         if (talent) {
    //             cooldown -= talent.GetSpecialValueFor("value");
    //         }
    //     }

    //     return cooldown;
    // }

    OnAbilityPhaseStart() {
        this.GetCaster().EmitSound(this.sound_cast);
        return true;
    }

    OnAbilityPhaseInterrupted() {
        this.GetCaster().StopSound(this.sound_cast);
    }

    OnSpellStart() {
        const caster = this.GetCaster();
        const point = caster.GetOrigin();

        const radius = this.GetSpecialValueFor("radius");
        const duration = this.GetSpecialValueFor("duration");

        const units = FindUnitsInRadius(
            caster.GetTeamNumber(),
            point,
            undefined,
            radius,
            UnitTargetTeam.ENEMY,
            UnitTargetType.BASIC + UnitTargetType.HERO,
            UnitTargetFlags.MAGIC_IMMUNE_ENEMIES,
            0,
            false,
        );

        for (const unit of units) {
            unit.AddNewModifier(caster, this, modifier_axe_berserkers_call_debuff_ts.name, { duration });
        }

        caster.AddNewModifier(caster, this, modifier_axe_berserkers_call_ts.name, { duration });

        if (units.length > 0) {
            this.GetCaster().EmitSound(this.sound_hit);
        };

        this.PlayEffects();
    }

    private PlayEffects() {
        const effect_cast = ParticleManager.CreateParticle(this.particle_cast, ParticleAttachment.ABSORIGIN_FOLLOW, this.GetCaster());
        ParticleManager.SetParticleControlEnt(effect_cast, 1, this.GetCaster(), ParticleAttachment.POINT_FOLLOW, 'attach_mouth', Vector(0, 0, 0), true);
        ParticleManager.ReleaseParticleIndex(effect_cast);
    }

}
