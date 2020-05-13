﻿/*:
 * @plugindesc コラプスアニメ設定プラグイン
 * @author さすらいのトム
 *
 * @help 
 * 敵キャラごとに散り際の技アニメを設定できるようになるプラグインです。
 * 例えば↓のタグを敵キャラのメモ欄にコピペしてやると、敵が爆ぜながら死にます。
 * <AnimationCollapse:107>
 * 
 * 一応存在しない技アニメーションIDを指定してもバグりはしない…と思います
 * 
 *
 */

(function() {
    'use strict';

    var Game_Enemy_prototype_performCollapse = Game_Enemy.prototype.performCollapse;
    Game_Enemy.prototype.performCollapse = function() {
        var enemyID = this._enemyId;
        if (this.chkCollapseAnimation(enemyID)) {
            this.requestEffect('AnimationCollapse');
            this.setAnimationID($dataEnemies[enemyID].meta['AnimationCollapse']);
            return;
        }
        Game_Enemy_prototype_performCollapse.call(this);
    };

    Game_Battler.prototype.chkCollapseAnimation = function(enemyID) {
        return $dataEnemies[enemyID].meta['AnimationCollapse']  && 
               $dataAnimations[$dataEnemies[enemyID].meta['AnimationCollapse']] ;
    }
    

    Game_Battler.prototype.setAnimationID = function(animationId) {
        this._animationId = animationId;
    };

    var Sprite_Enemy_prototype_startEffect = Sprite_Enemy.prototype.startEffect; 
    Sprite_Enemy.prototype.startEffect = function(effectType) {
        this._effectType = effectType;
        switch (this._effectType) {
        case 'AnimationCollapse':
            this.startAnimationCollapse();
            break;
        }
        Sprite_Enemy_prototype_startEffect.call(this,effectType);
    };

    Sprite_Enemy.prototype.startAnimationCollapse = function() {
        this._appeared = false;
        var ani = this._enemy._animationId;
        this._battler.startAnimation(ani,false,0);
        var waits = $dataAnimations[ani].frames.length;
        this._effectDuration = waits + 1;
    };

    var Sprite_Enemy_prototype_updateEffect = Sprite_Enemy.prototype.updateEffect; 
    Sprite_Enemy.prototype.updateEffect = function() {
            if (this._effectType ===  'AnimationCollapse' && this._effectDuration <= 1) {
            this.opacity = 0;
            this._effectType = null;
        }
        Sprite_Enemy_prototype_updateEffect.call(this);
    };

})();