﻿//=============================================================================
// NoBuySwitch.js
//=============================================================================

/*:
 * @plugindesc お店で何も買ってない時特定のスイッチがオンになる不思議なプラグイン
 * @author さすらいのトム
 *
 * @param NoBuySwitch
 * @desc 買ってないよフラグ
 * @default 10
 * @help
 * 
 * そのまんまです。
 * お店で何も買ってない時パラメータで指定したIDのスイッチがオンになる
 * 不思議なプラグインです。
 * 一応MITライセンスとします。
 *
 * 
 * 
 */


(function() {
    'use strict';

    var parameters = PluginManager.parameters('NoBuySwitch');
    var NoBuySwitch = Number(parameters['NoBuySwitch']);

    var Scene_Shop_prototype_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        Scene_Shop_prototype_create.call(this);
        $gameSwitches.setValue(NoBuySwitch,true);
    };

    var Scene_Shop_prototype_doBuy =  Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function (number) {
        Scene_Shop_prototype_doBuy.call(this,number);
        $gameSwitches.setValue(NoBuySwitch,false);
    }
})();