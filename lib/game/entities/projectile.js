ig.module(
    'game.entities.projectile'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityProjectile = ig.Entity.extend({
		ENTITY_NAME: 'projectile',
		maxVel: {x: 200, y: 200},
		type: ig.Entity.TYPE.C,
		checkAgainst: ig.Entity.TYPE.B, 
		collides: ig.Entity.COLLIDES.PASSIVE,
		bounceCounter: 0,
        gravityFactor: 0,
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.addAnim( 'idle', 0.2, [0] );
		},
		
        handleMovementTrace: function( res ) {
			this.parent( res );
            if( res.collision.x || res.collision.y ) {
				this.kill();
            }
        },
        
		check: function( other ) {
			if (other.canHit === true) {
				other.receiveDamage( 10, this );
				player = ig.game.getEntitiesByType( EntityRoboTom )[0];
				if (player) {
					SCORE += other.score;
				}
				
			}
			this.kill();	
		}
    }); 
})