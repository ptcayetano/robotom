ig.module(
    'game.entities.enemy-metalbot' 
)
.requires(
    'game.entities.enemy'
)
.defines(function() {
    EntityEnemyMetalbot = EntityEnemy.extend({
        ENTITY_NAME: 'enemyMetalbot',
        animSheet: new ig.AnimationSheet('media/enemy/metalbot.png', 18, 18),
        speed: 5,
        
        init: function(x,y,settings) {
            this.parent(x,y,settings);
            
            this.addAnim('crawl', 1, [0,1]);
        }
        
    });
});