ig.module(
    'game.entities.enemy'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityEnemy = ig.Entity.extend({
        ENTITY_NAME: 'enemy',
        size: {x: 17, y: 17},
        maxVel: {x: 100, y: 100},
        friction: {x: 150, y: 0},
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        health: 10,
        speed: 14,
        score: 100,
        flip: false,
        
        canHit: true,
        
        init: function(x,y,settings) {
            this.parent(x,y,settings);
        },
        
        update: function() {
            this.changeDirection();
            this.parent();
        },
        
        changeDirection: function() {
            var tile_pos_x = this.pos.x + (this.flip ? +4 : this.size.x -4);
            var tile_pos_y = this.pos.y + this.size.y + 1;
            
            // if there is no tile, move other way
            if (!ig.game.collisionMap.getTile(tile_pos_x, tile_pos_y)) {
                this.flip = !this.flip;
            }
            
            this.changeSpeed();            
            this.currentAnim.flip.x = this.flip;
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
        
        check: function(other) {
            other.receiveDamage(10, this);
        },
        
        receiveDamage: function(amt,who){
			ig.game.spawnEntity(EntityExplosion, this.pos.x, this.pos.y);
            SCORE += this.score;
			this.kill();
		}
        
    });    
    
    EntityExplosion = ig.Entity.extend({
		size: {x: 18, y: 18},
		type: ig.Entity.TYPE.NONE,
		animSheet: new ig.AnimationSheet( 'media/explosion.png', 18, 18 ),
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.07, [0,1,2,3,4,5,6,7] );
		},
		
		update:function(){
			this.parent();
			if(this.currentAnim.loopCount){
				this.kill();
			}
		}
	});
});