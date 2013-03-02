/*

//************ An entity that can use a ladder must declare these variables: ***********

    canClimb: false,
    isClimbing: false,
    momentumDirection: {'x':0,'y':0},
    ladderReleaseTimer: new ig.Timer(0.0),
    ladderSpeed: 75 // optional

    */


ig.module(
	'game.entities.ladder'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntityLadder = ig.Entity.extend({
        size: { x: 8, y: 64 },
        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(150, 150, 255, 0.7)',
        ladderSpeed: 65,
        
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.LITE,
        
        init: function (x, y, settings) {
            this.parent(x, y, settings);
        },
        
        update: function () {
			var robotom = ig.game.getEntitiesByType(EntityRoboTom)[0];
			if (robotom){
				robotom.isClimbing = false; // reset every frame in case you leave ladder. Allows to walk across/atop ladder
			}
        },
        
        check: function (other) {
			if (Math.floor(other.pos.y) <= (this.pos.y - other.size.y)) {
				console.log('top');
				other.momentumDirection.y = 0;
				other.isClimbing = false;
				other.canClimb = false;
			}
			
            // if entity has this timer, then it has the ability to climb
            if (other.ladderReleaseTimer) { 
                
                // entity is touching ladder, so climbing is an option if up or down movement
				other.canClimb = true;
				
                // ladderReleaserTimer almost up, so grab on to ladder
				if (other.ladderReleaseTimer.delta() > -0.1) {
					
                    // moving upwards, by jumping
                    if (other.vel.y < 0 && other.momentumDirection.y !=-1) {
                        other.isClimbing = true;
                    } else {
                        if (other.isClimbing && other.momentumDirection.y !=0 ) {
                            // move
                            
                            // if entity has a ladderSpeed variable, use it, otherwise use default
                            if (other.ladderSpeed) {
								this.ladderSpeed = other.ladderSpeed;
							}
                            
                            // moves player up or down depending on momentumDirection
                            other.vel.y = this.ladderSpeed * other.momentumDirection.y; // 1, 0 or -1
                        }
                        else {
                            // not climbing, but stick to ladder while falling or jumping to it
                            other.momentumDirection.y = 0;
                            other.vel.y = 0;
                            other.pos.y = other.last.y // avoid movement due to system delay
							
                            // uncomment to always show climbing animation while on ladder,
                            // or leave comment to allow standing/walking atop ladder, and jumping animation (not climbing) when jumping past a ladder
                            if (other.canClimb == true && other.momentumDirection.y == 0) {
								other.isClimbing = true;
							}
                        }
                        
                        
                        //avoid climbing in place if at bottom of ladder
						if (( other.momentumDirection.y == -1) && other.pos.y == other.last.y) {
							other.momentumDirection.y = 0;
							other.isClimbing=false;
						}
                         
                    }
                } else {
                    // ladderReleaseTimer < -0.1, so is jumping off or through ladder, so ignore it	
                }
            }
            else{
                // entity does not have ladder timer (maybe it only flies or swims, or is a trigger or mover), so ignore ladder
            }
        }
    });
});

