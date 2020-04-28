/*:
 * @plugindesc 勝利時喜ばないプラグイン
 * @author さすらいのトム
 *
 * @param NoPerformVictorySwitch
 * @desc 勝利時喜ばないスイッチ
 * @default 30
 *
 * @help 
 * プラグインパラメータで指定したスイッチがオンになっている時、
 * サイドビューアクターが喜ぶモーションを取らなくなります。
 * 世界を危機に陥れんとする真のラスボスが主人公の父親だった時などに
 * お使いください。
 * フロントビューで使用してもバグることは無いかと思われますが
 * 使っても効果が無いかと思われます。
 * 
 *
 */

(function() {
    'use strict';

    var parameters = PluginManager.parameters('NoPerformVictory');
    var NoPerformVictorySwitch = Number(parameters['NoPerformVictorySwitch'] || 30);

    var Game_Party_prototype_performVictory = Game_Party.prototype.performVictory;
    Game_Party.prototype.performVictory = function () {
        //勝利時喜ばないスイッチ
        if(!$gameSwitches.value(NoPerformVictorySwitch)) {
            Game_Party_prototype_performVictory.call(this);
        }
    }
})();