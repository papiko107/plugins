//=============================================================================
// NoRejenerateAtMap.js
//=============================================================================

/*:
 * @plugindesc 戦闘時以外でリジェネしなくなるプラグイン
 * @author さすらいのトム
 *
 * @help
 * その名の通り戦闘時以外でのHPやMP、TP再生やスリップダメージを無効化します。
 * 例えばHPやMPが再生する装備を装備していると、
 * フィールドマップ上でも一定歩数歩けば
 * 自動的にHPやMPが再生してしまうという謎仕様がありますが、これを無効化します。
 * 副作用で状態異常「毒」なんかのスリップダメージも無効化されてしまいます。
 * 地形ダメージは普通に適用されます。
 * プラグインパラメータ等はございません。
 * 導入した時点で適用されます。
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

    var _Game_Battler_prototype_regenerateAll = Game_Battler.prototype.regenerateAll;
    Game_Battler.prototype.regenerateAll = function() {
        if ($gameParty.inBattle()) {
            _Game_Battler_prototype_regenerateAll.call(this);
        }
    };
    })();