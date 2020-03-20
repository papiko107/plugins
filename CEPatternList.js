/*:
 * @plugindesc 敵行動パターン改造プラグイン
 * @author さすらいのトム
 *
 * @help
 * 複数回行動する敵キャラについて、ターンの間に使った技を
 * そのターンの以降の行動パターンから除外させます。
 * 如何に行動パターンのレーティング差があろうとも
 * 敵に同じ技を続けて撃てないようにします。
 * 例えば、2回以上行動するボスキャラに対して
 * 1回目に補助技を使い2回目に攻撃技を使う、などといった感じの
 * 詳細な行動パターンの設定が可能になる…かも知れません。
 * 
 * <CEPatternList>
 * スキルのメモ欄にこのタグを入れるとその技は
 * 同じターンに何度使おうとも除外されません。
 * 
 * このプラグインにプラグインコマンドはありません。
 * 
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 * 
 */

(function(){
    'use strict';
    var _Game_Enemy_prototype_selectAllActions = Game_Enemy.prototype.selectAllActions;
    Game_Enemy.prototype.selectAllActions = function (actionList) {
        _Game_Enemy_prototype_selectAllActions.call(this,actionList);
            var actionListbk = actionList;
            var actionListbk2 = actionList;
            var ratingMax = this.setRatingMax(actionListbk);
            var ratingZero = ratingMax - 3;
            actionListbk = this.makeActionList(actionListbk,ratingZero);
            for (var i = 0; i < this.numActions(); i++) {
                //技パターンリストから技を選定する
                var enemyAction = this.selectAction(actionListbk, ratingZero);
                this.action(i).setEnemyAction(enemyAction);
                    actionListbk2.some(function(item,index){
                        //撃った技を同じターンに撃てないよう行動パターンから除外
                        if(item.skillId === enemyAction.skillId && !$dataSkills[enemyAction.skillId].note.match(/<CEPatternList>/)){
                            actionListbk2.splice(index,1);
                        }
                    });
                    //技パターンリスト整形
                    var ratingMax = this.setRatingMax(actionListbk2);
                    var ratingZero = ratingMax - 3;
                    actionListbk = this.makeActionList(actionListbk2,ratingZero);
                }
        }
    Game_Enemy.prototype.setRatingMax = function(actionList) {
        var ratingMax = Math.max.apply(null, actionList.map(function(a) {
            return a.rating;
        }));
        return ratingMax;
    }
    Game_Enemy.prototype.makeActionList = function(actionList,ratingZero) {
        var actionList = actionList.filter(function(a) {
            return a.rating > ratingZero;
        });
        return actionList;
    }
}());
