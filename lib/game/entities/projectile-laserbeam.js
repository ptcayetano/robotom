ig.module(
    'game.entities.projectile-laserbeam'
)
.requires(
    'game.entities.projectile'
)
.defines(function() {
    EntityProjectileLaserbeam = EntityProjectile.extend({
		ENTITY_NAME: 'projectileLaserbeam',
        size: {x:6, y:3},
        offset: {x:6, y:3},
		animSheet: new ig.AnimationSheet( 'media/player/laserbeam.png', 6, 3 ),
    }); 
})