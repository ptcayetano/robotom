ig.module(
    'game.entities.kill'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityKill = ig.Entity.extend({
        ENTITY_NAME: 'kill',
        size: {x: 20, y: 20},
        
        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(100, 100, 0, 0.7)',
        
        checkAgainst: ig.Entity.TYPE.BOTH,
        
        update: function() {},
        
        check: function(other) {
            other.receiveDamage(10, this);
        }
    });
})