ig.module(
    'game.entities.elevator'
)
.requires(
    'impact.entity'
)
.defines(function() {
    
    EntityElevator = ig.Entity.extend({
        ENTITY_NAME: 'elevator',
        size: {x: 32, y: 17},
        animSheet: new ig.AnimationSheet( 'media/elevator.png', 32, 17 ),
        collides: ig.Entity.COLLIDES.FIXED,
        speed: 24,
        flip: false,
        gravityFactor: 0,
        
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
                
        init: function(x, y, settings) {
            this.parent(x,y,settings);
            this.addAnim('idle', 0.1, [0,1]);
            
        },
        
        update: function() {
            var robotom = ig.game.getEntitiesByType( EntityRoboTom )[0];
            robotom.onElevator = false;
            this.changeDirection();
            this.parent();
        },
        
        check: function(other) {
            other.onElevator = true;  
        },
        
        changeDirection: function() {
            var robotom = ig.game.getEntitiesByType( EntityRoboTom )[0];
            var tile_pos_x = this.pos.x + (this.flip ? +4 : this.size.x -4);
            var tile_pos_y = this.pos.y + this.size.y + 1 - (2.5 * robotom.size.y);
            
            if (ig.game.collisionMap.getTile(tile_pos_x, tile_pos_y)) {
                this.flip = !this.flip;
            }
            
            this.changeSpeed();            
        },
        
        changeSpeed: function() {
            var ydir = this.flip ? -1 : 1;
            this.vel.y = this.speed * ydir;
        },
        
        handleMovementTrace: function(res) {
            this.parent(res);
            
            if (res.collision.y) {
                this.flip = !this.flip;
            }
        },
    });
});