ig.module(
    'game.entities.platform'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityPlatform = ig.Entity.extend({
        ENTITY_NAME: 'platform',
        size: {x: 48, y: 17},
        animSheet: new ig.AnimationSheet( 'media/platform.png', 48, 17 ),
        collides: ig.Entity.COLLIDES.FIXED,
        checkAgainst: ig.Entity.TYPE.C, 
        speed: 40,
        flip: false,
        gravityFactor: 0,
        
        init: function(x, y, settings) {
            this.parent(x,y,settings);
            this.addAnim('idle', 0.1, [0,1]);
            
        },
        
        update: function() {
            this.changeDirection();
            this.parent();
        },
        
        changeDirection: function() {
            var tile_pos_x = this.pos.x + (this.flip ? +4 : this.size.x -4);
            var tile_pos_y = this.pos.y + this.size.y + 1;
            
            if (ig.game.collisionMap.getTile(tile_pos_x, tile_pos_y)) {
                this.flip = !this.flip;
            }
            
            this.changeSpeed();            
        },
        
        changeSpeed: function() {
            var xdir = this.flip ? -1 : 1;
            this.vel.x = this.speed * xdir;
        },
        
        handleMovementTrace: function(res) {
            this.parent(res);
            
            if (res.collision.x) {
                this.flip = !this.flip;
            }
        },
    });
});