ig.module(
	'game.entities.snow'
)
.requires(
	'impact.entity',
	'game.entities.particle'
)
.defines(function(){

	EntitySnow = ig.Entity.extend({
		ENTITY_NAME: 'snow',
		
		_wmScalable: true,
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(170, 66, 255, 0.7)',
		
		size: {x: 8, y: 8},
		count: 50,
		
		nextEmit: null,
		
		init: function( x, y, settings ) {
			this.parent( x, y, settings );
			this.nextEmit = new ig.Timer(0);
		},
		
		update: function(){		
            if( this.nextEmit.delta() >= 0 ) {
				this.nextEmit.set( this.duration / this.count );
				
				var x = Math.random().map( 0,1, this.pos.x, this.pos.x+this.size.x );
				var y = Math.random().map( 0,1, this.pos.y, this.pos.y+this.size.y );
				ig.game.spawnEntity( EntitySnowParticle, x, y );
			}
		}
	});

	EntitySnowParticle = EntityParticle.extend({
		ENTITY_NAME: 'snowParticle',
		lifetime: 2,
		fadetime: 1,
		bounciness: 0,
		vel: {x: 40, y: 20},
		
		animSheet: new ig.AnimationSheet( 'media/snow.png', 1, 1 ),
			
		init: function( x, y, settings ) {
			this.addAnim( 'idle', 5, [0,1,2,3,4,5,6,7,8,9,10,11] );		
			this.parent( x, y, settings );
		}
	});

});