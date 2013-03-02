ig.module(
    'game.entities.enemy-snowbot' 
)
.requires(
    'game.entities.enemy'
)
.defines(function() {
    EntityEnemySnowbot = EntityEnemy.extend({
        ENTITY_NAME: 'enemySnowbot',
        animSheet: new ig.AnimationSheet('media/enemy/snowbot.png', 18, 18),
        speed: 10,
        
        init: function(x,y,settings) {
            this.parent(x,y,settings);
            
            this.addAnim('walk', 0.3, [0,1,2,1,2]);
        }
        
    });
});