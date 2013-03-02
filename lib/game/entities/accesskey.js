ig.module(
	'game.entities.accesskey'
)
.requires(
	'impact.entity'
)
.defines(function(){
    EntityAccesskey = ig.Entity.extend({
		ENTITY_NAME: 'accesskey',
		size: {x: 10, y: 14},
		type: ig.Entity.TYPE.C,
		checkAgainst: ig.Entity.TYPE.A,
		addUp: 1,
        animSheet: new ig.AnimationSheet( 'media/player/accesskey.png', 10, 14 ),
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.2, [0,1,2,3] );
		},
		
		check: function(other) {
            other.addAccess(this);
			this.kill();
		}
    });
});