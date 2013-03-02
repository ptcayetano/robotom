ig.module(
    'game.entities.enemy-crabbot' 
)
.requires(
    'game.entities.enemy'
)
.defines(function() {
    EntityEnemyCrabbot = EntityEnemy.extend({
        ENTITY_NAME: 'enemyCrabbot',
        animSheet: new ig.AnimationSheet('media/enemy/crabbot.png', 18, 18),
        
        init: function(x,y,settings) {
            this.parent(x,y,settings);
            
            this.addAnim('crawl', 0.5, [0,1]);
        }
    });
});