/*:
 * @plugindesc 会心が出なくなるプラグイン
 * @author さすらいのトム
 *
 *
 * @help 
 * その名の通り特定の条件下で会心ダメージを
 * 発生させなくさせます。
 * 特徴を有するメモ欄（武器・防具・ステート・職業のメモ欄など）に
 * 以下の記述をすれば適用されます。
 * 攻撃を撃つ側：<SubjectNoCriticalHit>
 * 攻撃を受ける側：<TargetNoCriticalHit>
 *
 */

(function() {
    'use strict';
    
    //会心が出なくなる
    var _Game_Action_itemCri = Game_Action.prototype.itemCri;
    Game_Action.prototype.itemCri = function(target) {
        var NoCritical = false;
        //攻撃する側の場合
        this.subject().traitObjects().forEach(function(traitObject) {
            if(traitObject.meta['SubjectNoCriticalHit']){
                NoCritical = true;
            }
        });
        //攻撃を受ける側の場合
        target.traitObjects().forEach(function(traitObject) {
            if(traitObject.meta['TargetNoCriticalHit']){
                NoCritical = true;
            }
        });
        return NoCritical ? 0 : _Game_Action_itemCri.call(this,target);
    };

})();