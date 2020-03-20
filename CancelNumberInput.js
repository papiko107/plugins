/*:
 * @plugindesc 数値入力の処理仕様変更プラグイン
 * @author さすらいのトム
 * @help 
 * 数値入力の処理にてキャンセルキーを押したとき
 * 入力画面が閉じるようになります
 * 設定した変数には0が代入されます。
 * 
 * 利用規約
 * クレジットの表記等は特に必要ありません
 * 二次配布や無断転載等、商用や18禁利用制限等につきましても特に規制は設けません
 * 
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */

(function() {
    'use strict';

    Window_NumberInput.prototype.isCancelEnabled = function() {
        return true;
    };

    Window_NumberInput.prototype.processCancel = function() {
        SoundManager.playCancel();
        $gameVariables.setValue($gameMessage.numInputVariableId(), 0);
        this._messageWindow.terminateMessage();
        this.updateInputData();
        this.deactivate();
        this.close();
    }
})();