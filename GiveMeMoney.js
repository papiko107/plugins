/*:
 * @plugindesc 敵撃破時の報酬を詳細にするプラグイン
 * @author さすらいのトム
 *
 *
 * @help 
 * 敵撃破時の報酬（お金）をキャラの特徴ごとに増額させます。
 * 味方キャラの武器や防具、職業欄などに以下のタグを記載すると
 * 通常報酬額（「獲得金額2倍」適用時は2倍）○○％だけ
 * 報酬額を増額させます。
 * <kaneyokose:百分率>
 * 
 * 5000兆円欲しいです
 *
 */

(function() {
    'use strict';
    
    var _Game_Troop_prototype_goldTotal = Game_Troop.prototype.goldTotal;
    Game_Troop.prototype.goldTotal = function() {
        var perika = Math.floor(_Game_Troop_prototype_goldTotal.call(this));
        return perika;
    };

    var _Game_Troop_prototype_goldRate =  Game_Troop.prototype.goldRate;
    Game_Troop.prototype.goldRate = function() {
        var money = _Game_Troop_prototype_goldRate.call(this);
        var okanetyoudai = $gameParty.okaneKudasai();
        return money * okanetyoudai;
    };

    Game_Party.prototype.okaneKudasai = function() {
        var kaneyokose = 1;
        $gameParty.members().forEach(function(actor) {
            actor.traitObjects().forEach(function(traitObject) {
                if(traitObject.meta['kaneyokose']){
                    kaneyokose += traitObject.meta['kaneyokose'] / 100;
                }
            });
        });
        return kaneyokose;
    };

})();