ig.module(
    'game.entities.projectile-icebolt'
)
.requires(
    'game.entities.projectile'
)
.defines(function() {
    EntityProjectileIcebolt = EntityProjectile.extend({
		ENTITY_NAME: 'projectileIcebolt',
        size: {x: 6, y: 6},
        offset: {x:3, y:3},
		animSheet: new ig.AnimationSheet( 'media/player/icebolt.png', 6, 6 ),
    }); 
})