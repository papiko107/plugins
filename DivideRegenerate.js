//=============================================================================
// DivideRegenerate.js
//=============================================================================

/*:
 * @plugindesc 戦闘時のリジェネとマップのリジェネ効果を切り分けるプラグイン
 * @author さすらいのトム
 *
 * @help
 * ツクール標準のHPMPTP再生・減衰効果を戦闘時のみに修正します。
 * また、マップ画面でのみ発動するHPMPTP再生・減衰効果を別で定義します。
 * 以下のタグを特徴を持ったメモ欄（装備やステート等のメモ欄）に記載すると
 * マップ画面でのみHPMPTP再生・減衰効果を発動させることが出来ます。
 * 
 * <fieldMapRegeneHP:HP再生率>
 * <fieldMapRegeneMP:MP再生率>
 * <fieldMapRegeneTP:TP再生率>
 * 
 * 例えば、フィールドマップでのリジェネ効果は無くしたいが毒のスリップダメージは
 * そのままにしておきたい場合、ステート「毒」のメモ欄に
 * <fieldMapRegeneHP:-10>
 * と記載することで、毒による10％のHP減衰はそのままの状態にしたまま
 * フィールドマップでのリジェネ効果を無くすことが出来ます。
 * 
 * 
 *
 * このプラグインには、プラグインコマンドはありません。
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 *
 */

(function() {
    'use strict';

    Game_Battler.prototype.fieldMapRegeneTraits = function(obj) {
        var result = 0;
        this.traitObjects().forEach(function(traitObject) {
            if (traitObject.meta[obj]) {
                result += Number(traitObject.meta[obj]);
                }
            }
        );
        return result;
    }

    var Game_Battler_prototype_regenerateHp = Game_Battler.prototype.regenerateHp; 
    Game_Battler.prototype.regenerateHp = function() {
        if ($gameParty.inBattle()) {
            Game_Battler_prototype_regenerateHp.call(this)
        }　else {
            this.fieldMapRegenerateHP();
        }
    };

    var Game_Battler_prototype_regenerateMp = Game_Battler.prototype.regenerateMp; 
    Game_Battler.prototype.regenerateMp = function() {
        if ($gameParty.inBattle()) {
            Game_Battler_prototype_regenerateMp.call(this);
        }　else {
            this.fieldMapRegenerateMP();
        }
    };

    var Game_Battler_prototype_regenerateTp = Game_Battler.prototype.regenerateTp;
    Game_Battler.prototype.regenerateTp = function() {
        if ($gameParty.inBattle()) {
            Game_Battler_prototype_regenerateTp.call(this);
        }　else {
            this.fieldMapRegenerateTP();
        }
    };

    Game_Battler.prototype.fieldMapRegenerateHP = function() {
        var regenerateVal = this.fieldMapRegeneTraits('fieldMapRegeneHP');
        var value = Math.floor(this.mhp * Number(regenerateVal / 100));
        value = Math.max(value, -this.maxSlipDamage());
        if (value !== 0) {
            this.gainHp(value);
        }
    };

    Game_Battler.prototype.fieldMapRegenerateMP = function() {
        var regenerateVal = this.fieldMapRegeneTraits('fieldMapRegeneMP');
        var value = Math.floor(this.mmp * Number(regenerateVal / 100));
        if (value !== 0) {
            this.gainMp(value);
        }
    };
    
    Game_Battler.prototype.fieldMapRegenerateTP = function() {
        var regenerateVal = this.fieldMapRegeneTraits('fieldMapRegeneTP');
        var value = Math.floor(100 * Number(regenerateVal / 100));
        this.gainSilentTp(value);
    };
})();
