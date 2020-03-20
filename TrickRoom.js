/*:
 * @plugindesc 行動順を逆さにするステート
 * @author さすらいのトム
 *
 * @param TrickRoomState
 * @desc 行動順を逆さにするステート
 * @default 27
 *
 * @help 
 * 特定のステートにかかっている味方または敵がいると
 * 行動順が逆になる的な何かを実装します。
 * 速度補正とかも逆に働くようになります。
 * 複数人ステートにかかった敵味方がいた状態でも
 * 同じように行動順が逆さになります
 *
 */

(function() {
    'use strict';
    
    var parameters = PluginManager.parameters('TrickRoom');
    var TrickRoomState = Number(parameters['TrickRoomState'] || 27);

    var _Game_Action_prototype_speed = Game_Action.prototype.speed;
    Game_Action.prototype.speed = function() {
        var result = _Game_Action_prototype_speed.call(this);
        var battlers = [];
        var flg = false;
        battlers = battlers.concat($gameParty.members());
        battlers = battlers.concat($gameTroop.members());
        battlers.forEach(function(battler) {
            if (battler.isStateAffected(TrickRoomState)) {
                flg = true;
            }
        });
        if(flg){
            result *= -1;
        }
        return result;
    };

})();