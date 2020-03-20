//=============================================================================
// AddBuffAtDmg.js
//=============================================================================

/*:
 * @plugindesc 攻撃を受けると能力強化・弱体する不思議なプラグイン
 * @author さすらいのトム
 *
 * @help
 * 以下の通りメモすれば能力が上昇・下降します
 *
 * 特徴を有するメモ欄に以下の通り記述してください。
 * <addBuffAtDmg:ステータスID> #対応するステータスIDの能力値が1段階上昇
 * <addDebuffAtDmg:ステータスID> #対応するステータスIDの能力値が1段階下降
 * <addBuffTurns:ターン数> #能力強化がかかるターン数を指定
 * <addDebuffTurns:ターン数> #能力弱体がかかるターン数を指定
 * New!
 * <addrate:百分率(％はいらないぞ！)> #能力変化がかかる確率を指定
 * 
 * 能力値ID
 * 0:HP 1:MP 2:攻撃 3:防御 4:魔法 5:魔防 6:敏捷 7:運
 * だったハズ
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 *
 *  更新履歴
 *   Ver 1.00  2018/01/01  初版
 */

(function(){
    'use strict';
    
    var _Game_Action_addBuffAtDmg = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) 
    {
        	var parameters = null;
        	var parameters2 = null;
        	var turns = null;
            var turns2 = null;
            var addrate = 100;
            target.traitObjects().forEach(function(traitObject) 
            {
            addrate = (traitObject.meta['addrate'] || 100);
                if (traitObject.meta['addBuffAtDmg'] && value > 0 && addrate >= Math.random()*100) 
                {
                	 parameters = (traitObject.meta['addBuffAtDmg'] || 0);
                     turns = (traitObject.meta['addBuffTurns'] || 5);
                     //console.log(addrate);
		             target.addBuff(parameters,turns);
                }
                if (traitObject.meta['addDebuffAtDmg'] && value > 0 && addrate >= Math.random()*100) 
                {
                	 parameters2 = (traitObject.meta['addDebuffAtDmg'] || 0);
                	 turns2 = (traitObject.meta['addDebuffTurns'] || 5);
		             target.addDebuff(parameters2,turns2);
                }
            })
        _Game_Action_addBuffAtDmg.call(this, target, value);
    };
}());