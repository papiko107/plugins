//=============================================================================
// sokusiKaihi.js ver 1.20
//=============================================================================

/*:
 * @plugindesc 即死回避実装プラグイン
 * @author さすらいのトム
 *
 * @param stsKaihirate
 * @desc ステータス依存の確率で即死を回避させる際の基準値
 * @default 999
 * @help
 * 装備するとHPが一定割合以上残っていれば即死を免れHP1で耐える武器や装備品、
 * またはかかるとHPが一定割合以上残っていれば即死を免れるステートなどを実装します。
 * 百分率で即死を免れる下限HPを設定することが出来ます。
 *
 * 特徴を有するメモ欄に以下の通り記述してください。
 * <sokusiKaihi:下限HP率>
 *
 * 例えば、<sokusiKaihi:30>と入力した場合、対象のアクターは30%以上HPが残っていれば
 * 致死ダメージを受けてもHP1で耐えることが出来ます。
 * 1アクターに複数のメモタグが使用されている場合、一番低いHP率が参照されます。
 * 何も入力されていない場合、30%で発動します。
 * 
 * 2019/02/01追加
 * <kaihiRate:能力値ID>
 * 特徴を有するメモ欄に以下の記述を追加することでステータス依存の確率で即死回避を
 * 発動させます。
 * <kaihiRate:7>と記述すると
 * （ダメージを受けたアクターの運　÷　パラメータで設定した基準値）　×100
 * の確率で即死回避が発動します。
 * 
 * 能力値ID
 * 0:現HP 1:現MP 2:攻撃 3:防御 4:魔法 5:魔防 6:敏捷 7:運
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
 *  更新履歴
 *   Ver 1.00  2017/10/08  初版
 *   Ver 1.10  2018/01/01  オブジェクトごとに下限HP率を設定できるように修正
 *   Ver 1.20  2019/02/01　ステータス依存の回避率追加
 */

(function(){
    'use strict';

    var parameters = PluginManager.parameters('stsKaihirate' || 999);
    var stsKaihirate = Number(parameters['stsKaihirate']);
    var kaihiRate = 0;
    
    var _Game_Action_sokusiDmg = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
    	var _hpRate = (target._hp /  target.mhp) * 100;
        if (value >= target._hp) 
        {
        	var sokusiKaihi = 100;
            var kaihiFlg = false;
            var kaihiFlg2 = false;
            target.traitObjects().forEach(function(traitObject) {
                if(traitObject.meta['kaihiRate']){
                    switch(traitObject.meta['kaihiRate']){
                        case '0':
                        kaihiRate = target._hp / stsKaihirate;
                        case '1':
                        kaihiRate = target._mp / stsKaihirate;
                        case '2':
                        kaihiRate = target.atk / stsKaihirate;
                        case '3':
                        kaihiRate = target.def / stsKaihirate;
                        case '4':
                        kaihiRate = target.mat / stsKaihirate;
                        case '5':
                        kaihiRate = target.mdf / stsKaihirate;
                        case '6':
                        kaihiRate = target.agi / stsKaihirate;
                        case '7':
                        kaihiRate = target.luk / stsKaihirate;
                    }
					if(kaihiRate >= Math.random()){
						kaihiFlg2 = true;
					}
                }
                if (traitObject.meta['sokusiKaihi']) 
                {
                    sokusiKaihi = Math.min(sokusiKaihi, traitObject.meta['sokusiKaihi']);
                    kaihiFlg = true;
                }
            });
            if (sokusiKaihi > 0 && _hpRate >= sokusiKaihi) 
            {
                if(kaihiFlg || kaihiFlg2){
                    value = target._hp - 1;
                }
            }
        }
        _Game_Action_sokusiDmg.call(this, target, value);
    };
}());

