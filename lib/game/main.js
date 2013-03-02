var SCORE = 0;
var CURRENT_LEVEL = 0;
var NEXT_LEVEL = 1;

ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.robo-tom',
	'game.entities.portal',
	'game.entities.kill',
	'game.entities.trigger',
	'game.entities.debris',
	'game.entities.snow',
	'game.entities.platform',
	'game.entities.powerups-energy',
	'game.entities.accesskey',
	'game.entities.elevator',
	'game.levels.island',
	'game.levels.redvalley',
	'game.levels.cavern',
	'game.levels.snowmountain'
)
.defines(function(){

	RoboTomGame = ig.Game.extend({
		
		gravity: 300,	
		font: new ig.Font( 'media/04b03.font.png' ),
		player: null,
		portal: null,
		accessCount: 0,
		gameOver: false,
		startingLevel: 3,
		levels: [LevelIsland, LevelRedvalley, LevelCavern, LevelSnowmountain],
		levelName: null,
		levelIndex: null,
		levelNext: null,
		levelComplete: false,
		debug: 1,
						
		init: function() {
			ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
			ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
			ig.input.bind(ig.KEY.X, 'jump');
			ig.input.bind(ig.KEY.UP_ARROW, 'up');
			ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
			ig.input.bind(ig.KEY.C, 'shoot');
			ig.input.bind(ig.KEY.R, 'restart');
			
			this.portalSpawned = false;
			this.levelComplete = false;
						
			this.loadLevel( this.levels[this.startingLevel] );
			
			this.followPlayer();
		},
		
		update: function() {
			this.parent();
			
			this.player = this.getEntitiesByType( EntityRoboTom )[0];
			this._updateLevelInfo();
			this._updateAccessCount();
			
			this.followPlayer();
			
			if (ig.input.state('restart')) {
				ig.system.setGame(RoboTomGame);
			}
		},
		
		followPlayer: function() {
			if (this.player) {
				this.player = this.getEntitiesByType( EntityRoboTom )[0];
			}
			
			if( this.player ) {
				var screen_x = this.player.pos.x - ig.system.width/2;
				var screen_y = this.player.pos.y - ig.system.height/2;
				if (screen_x > 0 && screen_x != this.screen.y) {
					this.screen.x = screen_x;
				}
				
				if (screen_y > 0  && screen_y != this.screen.y) {
					this.screen.y = screen_y;
				}
			}
		},
		
		draw: function() {
			this.parent();
			this.drawStats();		
			
		},
		
		drawStats: function() {
			var current_health = 0;
			var current_energy = 0;
			var access_collected = 0;
			if (this.player) {
				current_health = this.player.health;
				current_energy = this.player.energy;
				access_collected = this.player.accessCollected;
				if (access_collected === this.accessCount) {
				//if (access_collected === 1) {
					this.levelComplete = true;
					var msg = "Portal is now active. Enter through the portal for the next level."
					var len = msg.length;
					this.font.draw(msg, 10, 20);
				} else {
					this.levelComplete = false;
				}
				
				if (this.player.energy <= 0) {
					this.font.draw("Not enough energy to perform hyper jump", 10, 20);												
				}
			}
			
			var hud = "LIFE: " + current_health + "\nFUEL: " + current_energy +  "\nKEY: " + access_collected + "/" + this.accessCount + "\nZONE: " + this.levelName;
			this.font.draw(hud, 10, 160);
			
			if (this.gameOver === true) {
				this.font.draw( 'GAME OVER! PRESS "R" TO RESTART', 130, 100 );				
			}
		},
		
		nextLevel: function() {
			/* loop to starting level if reached final zone or level */
			var next_level = (this.levels.length > this.levelNext) ? this.levels[this.levelNext] : this.levels[0];
			NEXT_LEVEL = next_level;
			// insert the clear level
			
			
			// LevelClear
			this.loadLevelDeferred(next_level);
			this.portalSpawned = false;
            this.levelComplete = false;
			CURRENT_LEVEL = next_level;
		},
		
		_updateAccessCount: function() {
			if (this.levelIndex != this.portal.levelIndex) {
				this.accessCount = (this.getEntitiesByType( EntityAccesskey )).length;
			}			
		},
		
		_updateLevelInfo: function() {
			this.portal = this.getEntitiesByType( EntityPortal )[0];
			if (this.levelName != this.portal.levelName) {
				// new level
				this.levelName = this.portal.levelName;
				this.levelIndex = this.portal.levelIndex;
				this.levelNext = this.portal.levelIndex + 1;
				this.accessCount = (this.getEntitiesByType( EntityAccesskey )).length;
			}
		}
	});
	
	ig.main( '#canvas', RoboTomGame, 60, 300, 200, 1.5 );

});
