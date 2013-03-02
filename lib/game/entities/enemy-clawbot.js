ig.module(
    'game.entities.enemy-clawbot' 
)
.requires(
    'game.entities.enemy'
)
.defines(function() {
    EntityEnemyClawbot = EntityEnemy.extend({
        ENTITY_NAME: 'enemyClawbot',
        animSheet: new ig.AnimationSheet('media/enemy/clawbot.png', 18, 18),
        speed: 20,
        
        init: function(x,y,settings) {
            this.parent(x,y,settings);
            
            this.addAnim('walk', 0.3, [0,1,2]);
        }
        
    });
});