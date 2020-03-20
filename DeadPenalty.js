/*:
 * @plugindesc 戦闘不能になるとTPが0になるプラグイン
 * @author さすらいのトム
 *
 *
 * @help 
 * その名の通りです。
 * アクターの特徴を有するメモ欄（武器・防具・ステートなど）に
 * 以下のオプションタグを付けることでTP0を回避できたりします。
 * 
 * 戦闘不能になった時でもTPが0にならない
 * <AvoidDeathPenalty>
 * 戦闘不能になった時TPが指定の値になる
 * <AvoidDeathPenalty2:指定値>
 * 
 *
 */

(function() {
    'use strict';
    
    var _Game_BattlerBase_prototype_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function(){
        var a = false;
        var b = 0;
        this.traitObjects().forEach(function(traitObject) {
            if (traitObject.meta['AvoidDeathPenalty']) {
                    a = true;
                }
                //死んだ際のTPをタグで指定　無ければ100になる
                if (traitObject.meta['AvoidDeathPenalty2']) {
                    b = Math.min(100,traitObject.meta['AvoidDeathPenalty2'] || 100);
                }
            });
        if(!a){
            this._tp = 0;
        }
        if(b > 0){
            this._tp = b;
        }
        _Game_BattlerBase_prototype_die.call(this);
    }
})();