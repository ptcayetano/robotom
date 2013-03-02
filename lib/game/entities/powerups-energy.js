ig.module(
	'game.entities.powerups-energy'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityPowerupsEnergy = ig.Entity.extend({
		ENTITY_NAME: 'powerupsEnergy',
		size: {x: 10, y: 14},
		type: ig.Entity.TYPE.C,
		checkAgainst: ig.Entity.TYPE.A,
		addUp: 100,
        animSheet: new ig.AnimationSheet( 'media/player/powerups-energy.png', 10, 14 ),
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.2, [0,1,2,3] );
		},
		
		check: function(other) {
            other.gotPowerup('energy', this);
			this.kill();
		}
    });
});