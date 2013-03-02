ig.module(
    'game.entities.portal'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityPortal = ig.Entity.extend({
		ENTITY_NAME: 'portal',
		size: {x: 25, y: 30},
        offSet: {x: 25, y: 20},
		animSheet: new ig.AnimationSheet( 'media/portal.png', 25, 30 ),
        type: ig.Entity.TYPE.C,
        checkAgainst: ig.Entity.TYPE.A,
        		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.addAnim( 'idle', 0.1, [0,1,2,3,4,5,6,7] );
		},
        
        check: function(other) {
			if (ig.game.levelComplete === true) {
				other.goNextLevel();	
			} 
        },
	});
});