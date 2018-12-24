const [edgel, edger, edgeu, edged] = [2, 402, 55, 405];
const [distx, disty] = [100, 95];
const bricklines = [215, 120, 25];

class Character {
    constructor(x, y, sprite, speed) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = speed;
        this.crash = false;
    }    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Character {
    
    constructor(x, y, sprite, speed) {
        super(x, y, sprite, speed);
        this.hsize = 80;
    }
    
    update(dt) {
        
        if ( this.hasCollided() ) {
            player.endRound();
        }

        this.x = this.x + this.speed * dt;

    }

    hasCollided() {

        let [enemyx, enemyy, playerx, playery] = [this.x, this.y, player.x, player.y].map(el => Math.floor(el) );

        if ( ( playerx <= enemyx + this.hsize && playerx >= enemyx - this.hsize ) && enemyy == playery ) {
            return true;
        }

    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    
    constructor(x = 202, y = 405, sprite = 'images/char-boy.png') {
        super(x, y, sprite);
        this.score = 0;        
    }

    update() {
        // ...
    }

    handleInput(key) {

        switch (key) {
            case 'left':
                this.x = (this.x > edgel) ? this.x - distx : this.x;
                break;
            case 'right':
                this.x = (this.x < edger) ? this.x + distx : this.x;
                break;
            case 'down':
                this.y = (this.y < edged) ? this.y + disty : this.y;
                break;
            case 'up':
                if (this.y > edgeu) {
                    this.y = this.y - disty;
                } else {
                    this.endRound(true);
                }                
                break;
        }

    }

    endRound(resultRound = false) {
        this.x = 202;
        this.y = 405;
        this.score = (resultRound) ? this.score++ : this.score;
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(-100, 215, 'images/enemy-bug.png', 55) ];

let player = new Player();

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
