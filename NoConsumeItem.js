/*:
 * @plugindesc 確率で戦闘中アイテム消費しなくなるプラグイン
 * @author さすらいのトム
 *
 *
 * @help 
 * 戦闘中に確率でアイテムを消費せず消耗アイテムを使うことができるようになる
 * プラグインです。
 * アクターの特徴を有するメモ欄（武器・防具・ステートなど）に
 * 以下のタグを記述してください
 * <NoConsumeItem:百分率>
 *
 * ※戦闘中しか適用されないので気を付けましょう
 *
 */

(function() {
    'use strict';
    
    var consumeItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        var NoConsumeItem = 0;
        this.traitObjects().forEach(function(traitObject) {
            if (traitObject.meta['NoConsumeItem']) {
                    NoConsumeItem += traitObject.meta['NoConsumeItem'];
                }
            });
            if(NoConsumeItem > Math.random() * 100 && DataManager.isItem(item) && $gameParty.inBattle()){
                return;
            }
        consumeItem.call(this,item);
    }

})();