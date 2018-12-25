// Defines table boundaries in order to avoid a step
// outside the field
const [edgeL, edgeR, edgeU, edgeD] = [2, 402, 55, 405];

// Defines step size
const [stepX, stepY] = [100, 95];

// Defines Y-axis of the bricks
const brickRowY = [215, 120, 25];

// Sets the levels
// level: lives, enemies, maximum speed, points
const level = {
    1: [7, 4, 300, 100],
    2: [5, 6, 400, 150],
    3: [3, 7, 500, 350]
}


class HUD {
    
    constructor() {
        ctx.fillStyle = "Black";
        ctx.font = "18pt Courier New";
    }

    showScore() {
        ctx.textAlign = "left"; 
        ctx.fillText(`Score: ${player.score}`, 10, 30); 
    }

    showLevel() {
        ctx.textAlign = "center"; 
        ctx.fillText(`Level: ${player.level}`, 255, 30); 
    }

    showLives() {
        ctx.textAlign = "right"; 
        ctx.fillText(`Lives: ${player.lives}`, 490, 30); 
    }

    showGameOver() {
        if (player.lives < 1) {            
            ctx.drawImage(Resources.get('images/game-over.png'), 0, 50, 505, 550);
            player.reset();
        }
    }

    render() {
        this.showScore();
        this.showLevel();
        this.showLives();
        this.showGameOver();
    }
}

class Character {
    constructor(x, y, sprite, speed) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = speed;
    }    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Enemies our player must avoid
class Enemy extends Character {
    
    constructor(x, y, sprite, speed) {
        super(x, y, sprite, speed);
        this.hsize = 80;
    }
    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        
        if ( this.hasCollided() ) {
            player.endRound(false);
        }

        if (this.x < edgeR + 100) {
            this.x = this.x + this.speed * dt;
        } else {
            this.reset();
        }

    }

    // Checks if enemy has collided with player
    hasCollided() {

        // Normalizing coordinates
        let [enemyx, enemyy, playerx, playery] = [this.x, this.y, player.x, player.y].map(el => Math.floor(el) );

        if ( ( playerx <= enemyx + this.hsize && playerx >= enemyx - this.hsize ) && enemyy == playery ) {
            return true;
        }

    }

    // Initializes the enemy with a random speed
    // and outside the field
    reset() {
        this.x = edgeL - this.hsize;
        this.speed = Math.floor(Math.random() * 400) + 200;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {
    
    constructor(x = 202, y = 405, sprite = 'images/char-boy.png') {
        super(x, y, sprite);
        // this.level = level[1];
        // this.lives = this.level[0];
        this.level = 1;
        this.lives = 3;
        this.score = 0;
    }

    update() {
        // ...
    }

    handleInput(key) {

        // Allows movement if the player is within the limits
        switch (key) {
            case 'left':
                this.x = (this.x > edgeL) ? this.x - stepX : this.x;
                break;
            case 'right':
                this.x = (this.x < edgeR) ? this.x + stepX : this.x;
                break;
            case 'down':
                this.y = (this.y < edgeD) ? this.y + stepY : this.y;
                break;
            case 'up':
                if (this.y > edgeU) {
                    this.y = this.y - stepY;
                } else {
                    this.endRound(true);
                }                
                break;
        }

    }

    // Ends the round and according to the parameter
    // sums the score or removes a life
    endRound(win = false) {
        
        this.x = 202;
        this.y = 405;

        if (win) {
            // increaseLevel
            this.score++;
        } else {
            this.lives--;
        }

    }

    reset() {

    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
    new Enemy(-100, brickRowY[0], 'images/enemy-bug.png', 150),
    new Enemy(-100, brickRowY[1], 'images/enemy-bug.png', 230),
    new Enemy(-100, brickRowY[2], 'images/enemy-bug.png', 190)
];

let player = new Player();

let hud = new HUD();

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
