import { reloadable } from "./lib/tstl-utils";

const heroSelectionTime = 20;

declare global {
    interface CDOTAGameRules {
        Addon: GameMode;
    }
}

@reloadable
export class GameMode {
    public static Precache(this: void, context: CScriptPrecacheContext) {
        PrecacheResource("particle", "particles/units/heroes/hero_meepo/meepo_earthbind_projectile_fx.vpcf", context);
        PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_meepo.vsndevts", context);
    }

    public static Activate(this: void) {
        // When the addon activates, create a new instance of this GameMode class.
        GameRules.Addon = new GameMode();
    }

    constructor() {
        this.configure();

        // Register event listeners for dota engine events
        ListenToGameEvent("game_rules_state_change", () => this.OnStateChange(), undefined);
        ListenToGameEvent("hero_selected", event => this.OnHeroSelectionChanged(event), undefined);
    }

    private configure(): void {
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.GOODGUYS, 4);
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.BADGUYS, 0);

        GameRules.SetHeroSelectionTime(heroSelectionTime);
        GameRules.SetStrategyTime(5);
        GameRules.SetShowcaseTime(0);
        GameRules.SetPreGameTime(0);

        GameRules.SetUseUniversalShopMode(true);
    }

    public OnStateChange(): void {
        const state = GameRules.State_Get();

        // Add 4 bots to lobby in tools
        if (IsInToolsMode() && state == GameState.CUSTOM_GAME_SETUP) {
            for (let i = 0; i < 1; i++) {
                Tutorial.AddBot("npc_dota_hero_sven", "", "", true);
            }
        }

        if (state === GameState.CUSTOM_GAME_SETUP) {
            // Automatically skip setup in tools
            if (IsInToolsMode()) {
                Timers.CreateTimer(1, () => {
                    GameRules.FinishCustomGameSetup();
                });
            }
        }

        // Start game once pregame hits
        if (state === GameState.PRE_GAME) {
            Timers.CreateTimer(0.2, () => this.StartGame());
        }

        // if (state === GameState.GAME_IN_PROGRESS) {
        //     this.StartGame();
        // }

    }

    private StartGame(): number | void {
        if (IsServer()) {
            print("Checking For All Heroes");
            for (let index = 0; index < 4; index++) {
                if (PlayerResource.IsValidPlayerID(index)) {
                    const player = PlayerResource.GetPlayer(index);
                    if (player == undefined) {
                        print("Player " + index + "is underfined");
                        continue;
                    }

                    const hero = PlayerResource.GetSelectedHeroEntity(index);
                    if (hero == undefined) {
                        //This Player's hero is still spawning, wait and check again.
                        return 0.2;
                    } else {
                        print("Hero Existed " + hero.GetName() + " For Player " + hero.GetPlayerID());
                    }
                }
            }

            //All Players Have Spawned
            print("All Players Spawned: Game starting!");
            for (let index = 0; index < 4; index++) {
                if (PlayerResource.IsValidPlayerID(index)) {
                    const player = PlayerResource.GetPlayer(index);
                    if (player == undefined) {
                        continue;
                    }

                    const hero = PlayerResource.GetSelectedHeroEntity(index);
                    if (hero == undefined) {
                        error("Undefined Hero After Game Started!");
                    } else {
                        const heroes = HeroList.GetAllHeroes().filter((hero) => hero.GetTeamNumber() == DotaTeam.GOODGUYS).map((hero) => hero.GetName());

                        if (hero.GetName() == "npc_dota_hero_axe" && heroes.includes('npc_dota_hero_sven')) {
                            const old_ability = hero.GetAbilityByIndex(0);
                            if(old_ability == undefined) continue;
               
                            const new_ability = hero.AddAbility("axe_berserkers_call_2_ts");
                            new_ability.SetLevel(1);

                            hero.RemoveAbilityByHandle(old_ability);
                            hero.RemoveAbilityFromIndexByName(new_ability.GetName());
                            hero.SetAbilityByIndex(new_ability, 0);

                        }
                    }
                }
            }

        }

        // Do some stuff here
    }

    // Called on script_reload
    public Reload() {
        print("Script reloaded!");

        // Do some stuff here
    }

    private OnHeroSelectionChanged(event: HeroSelectedEvent) {
        print("OnHeroSelectionChanged");
        print(event.player_id);
        print(event.hero_unit);
        print(PlayerResource.GetSelectedHeroEntity(event.player_id));
    }
}
