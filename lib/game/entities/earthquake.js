/*
This entity shakes the screen when its triggeredBy() method is called - usually
through an EntityTrigger entity.


Keys for Weltmeister:

strength 
	max amount of screen movement in pixels
	default: 8

duration 
	duration of the screen shaking in seconds
	default: 1
*/

ig.module(
	'game.entities.earthquake'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntityEarthquake = ig.Entity.extend({
		ENTITY_NAME: 'earthquake',
		
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(80, 130, 170, 0.7)',
        
        size: {x: 8, y: 8},
        
        duration: 100,
		cooldown: 10,
        strength: 3,
        quakeTimer: null,
		cooldownTimer: null,
		
		onCooldown: false,
        
        init: function( x, y, settings ) {
            this.quakeTimer = new ig.Timer();
			this.cooldownTimer = new ig.Timer();
            this.parent( x, y, settings );
        },	
        
        
        triggeredBy: function( entity, trigger ) {
			this.quakeTimer.set( this.duration );
        },
                
        update: function() {
			var delta = this.quakeTimer.delta();
			if( delta < -0.1 ) {
                var s = this.strength * Math.pow( -delta / this.duration, 2 );
				if( s > 0.5 ) {
					ig.game.screen.x += Math.random().map( 0, 1, -s, s );
                    ig.game.screen.y += Math.random().map( 0, 1, -s, s );
                }
            }
        }
    });

});
