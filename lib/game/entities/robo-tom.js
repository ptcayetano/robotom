ig.module(
    'game.entities.robo-tom' 
)
.requires(
    'game.entities.player',
    'game.entities.projectile-icebolt',
    'game.entities.projectile-laserbeam'
)
.defines(function() {
    EntityRoboTom = EntityPlayer.extend({
        ENTITY_NAME: 'roboTom',
        size: {x: 9, y:17},
        maxVel: {x: 100, y: 180},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        animSheet: new ig.AnimationSheet('media/player/robotom.png', 16, 18),
        
        flip: false,
        velGround: 100,
        velAir: 100,
        jump: 200,
        health: 100,
        energy: 1000,
        shooting: false,
        damage: false,
        spawnTimer: null,
        accessCollected: 0,
        
        onElevator: false,
        
        init: function(x,y,settings) {
            this.parent(x,y,settings);
            
            /* robotom animation */
            this.addAnim('idle', 1, [1]);
            this.addAnim('run', 0.2, [0, 1]);
            this.addAnim('jump', 0.07, [2]);
            this.addAnim('shoot', 0.07, [0]);
            this.addAnim('climb', 0.07, [8,9]);
            this.addAnim('damage_idle', 0.05, [3, 4]);
            this.addAnim('damage_run', 0.07, [5, 1]);
            this.addAnim('damage_jump', 0.07, [2, 7]);
            this.addAnim('damage_shoot', 0.07, [1, 5]);
            
            this.spawnTimer = new ig.Timer();
        },
        
        update: function() {
            this._changeMovement();
            this._changeAnimation();
            if (this.spawnTimer.delta() > 0) {
                this.damage = false;
            }
            this.parent();
        },
        
        receiveDamage: function(amt, who) {
            if (this.spawnTimer.delta() > 0) {
                this.health -= amt;
                this.spawnTimer.set(3);
                this.damage = true;
                if (this.health <= 0) {
                    this.playDead();
                }    
            }
        },
        
        loseEnergy: function(amt) {
            this.energy -= amt;
            if (this.energy <= 0) {
                this.energy = 0;
            }
        },
        
        playDead: function() {
            ig.game.spawnEntity(EntityBlueExplosion, this.pos.x, this.pos.y);
            ig.game.gameOver = true;
            this.kill();
        },
        
        addAccess: function(obj) {
          this.accessCollected += obj.addUp;  
        },
        
        gotPowerup: function(powerup, obj) {
            switch(powerup) {
                case "energy":
                    this.energy += obj.addUp;
                break;
            }
            ig.game.spawnEntity(EntitySplash, this.pos.x, this.pos.y);  
        },
        
        goNextLevel: function() {
            ig.game.nextLevel();
        },
        
        /* private */
        
        _jump: function() {
            // jump
            if( this.standing && ig.input.pressed('jump') ) {
                if (this.energy > 0) {
                    this.vel.y = -this.jump;
                    this.loseEnergy(50);
                } else {
                    this.vel.y = 0;
                }
            }
        },
        
        _shoot: function() {
            if( ig.input.pressed('shoot') ) {
                ig.game.spawnEntity( EntityProjectileLaserbeam, this.pos.x+20, this.pos.y+8, {flip:this.flip} );
                this.shooting = true;
            }
        },
        
        _changeMovement: function() {
            var vel = this.standing ? this.velGround : this.velAir;
            /* movement left, right or standing*/
            if (ig.input.state('left')) {
                this.vel.x = -vel;
                this.flip = true;
            }
            else if (ig.input.state('right')) {
                this.vel.x = vel;
                this.flip = false;
            }
            else {
                this.vel.x = 0;
            }
            
            this._jump();    
            
            this._shoot();
            
            this.currentAnim.flip.x = this.flip;
        },
        
        _changeAnimation: function() {
            if (this.damage === false) {
                if( this.vel.y < 0 && !this.standing) {
                    this.currentAnim = this.anims.jump;
                }
                else if( this.vel.x != 0 ) {
                    this.currentAnim = this.anims.run;
                }
                else {
                    this.currentAnim = this.anims.idle;    
                }    
            } else {
                /* accepting damage */
                if( this.vel.y < 0 && !this.standing) {
                    this.currentAnim = this.anims.damage_jump;
                }
                else if( this.vel.x != 0 ) {
                    this.currentAnim = this.anims.damage_run;
                }
                else {
                    this.currentAnim = this.anims.damage_idle;    
                }
            }
            
        }
    
    });
    
    EntitySplash = ig.Entity.extend({
		size: {x: 10, y: 14},
		type: ig.Entity.TYPE.NONE,
		animSheet: new ig.AnimationSheet( 'media/player/splash.png', 10, 14 ),
		
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
    
    EntityBlueExplosion = ig.Entity.extend({
		size: {x: 18, y: 18},
		type: ig.Entity.TYPE.NONE,
		animSheet: new ig.AnimationSheet( 'media/player/blue-explosion.png', 18, 18 ),
		
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