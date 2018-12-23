// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
// };

class Character {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }
    update() {

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Character {
    constructor() {
        super(0, 0, 'images/enemy-bug.png');
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    
    constructor(x, y, sprite) {
        super(x, y, sprite);
    }

    handleInput(key) {
        
        /*
        const distance = 100;
        const movement = {}
        let axis = (key == 'up' || key == 'down') ? this.y : this.x;
        */
        
        switch (key) {
            case 'left':
                this.x -= 100;
                break;
            case 'up':
                this.y -= 100;
                break;
            case 'right':
                this.x += 100;
                break;
            case 'down':
                this.y += 100;
                break;
        }

    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [ new Enemy() ];

let player = new Player(202, 405, 'images/char-boy.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
