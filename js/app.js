/**
 * Defines table boundaries in order to avoid a step
 * outside the field
 */
const [edgeL, edgeR, edgeU, edgeD] = [2, 402, 55, 405];

// Defines step size
const [stepX, stepY] = [100, 95];

// Defines Y-axis of the bricks
const brickRowY = [310, 215, 120, 25];

/**
 * Defines the score to win a trophy and the score to increase
 * player level
 */
const [scoreToWin, scoreToLevelUp] = [1000, 400];

/**
* @description Represents a character
* @constructor
* @param {number} x - The value of x-axis
* @param {number} y - The value of y-axis
* @param {string} sprite - The character image
* @param {number} speed - The character speed
*/
class Character {
    constructor(x, y, sprite, speed) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.speed = speed;
        this.hsize = 80;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/**
 * @description Enemies our player must avoid
 */
class Enemy extends Character {

    constructor(x, y, sprite, speed) {
        super(x, y, sprite, speed);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {

        // If enemy collides, player loses round
        if (this.hasCollided()) {
            player.endRound(false);
        }

        // Resets enemy position if out of boundaries
        if (this.x < edgeR + 100) {
            this.x = this.x + this.speed * dt;
        } else {
            this.reset();
        }

    }

    // Checks if enemy has collided with player
    hasCollided() {

        let [enemyx, enemyy, playerx, playery] = [this.x, this.y, player.x, player.y];

        if ((playerx <= enemyx + this.hsize && playerx >= enemyx - this.hsize) && enemyy == playery) {
            return true;
        }

    }

    // Initializes the enemy with a random speed
    // and outside the field
    reset() {

        let minSpeed = (player.level * 100);
        let maxSpeed = minSpeed + 100;

        this.x = edgeL - 120;
        this.speed = Math.floor(Math.random() * maxSpeed) + minSpeed;

    }

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends Character {

    constructor(x = 202, y = 405, sprite = 'images/char-boy.png') {
        super(x, y, sprite);
        this.readInstructions = false;
        this.hasLost = false;
        this.hasWon = false;
        this.level = 1;
        this.lives = 5;
        this.score = 0;
        this.points = 0;
    }

    update() {
        // Player scores points if is in the brick row ('danger zone')
        // but only effective them finishing the round
        if (brickRowY.includes(this.y)) {
            // Setting up a limit of two levels per round
            if (this.points < scoreToLevelUp * 2) {
                this.points++;
            }
        } else {
            this.points = 0;
        }
    }

    handleInput(key) {

        if (this.readInstructions) {

            // Allows restart only if player has lost
            if (this.hasLost) {

                if (key == 'enter') {
                    this.resetGame();
                }

            } else {

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
                            // If player reaches the water
                            this.endRound(true);
                        }
                        break;
                }

            }

        } else {

            if (key == 'enter') {
                this.readInstructions = true;
            }

        }

    }

    /**
     * Ends the round and according to the parameter,
     * sums the points to the final score and manipulate the level
     * or removes a life
     */
    endRound(win = false) {

        // Initial position
        this.x = 202;
        this.y = 405;

        if (win) {

            this.score += this.points;

            if (this.score >= scoreToWin) {
                this.hasWon = true;
            }

            this.updateLevel();

        } else {

            this.lives--;
            if (this.lives < 1) {
                this.hasLost = true;
            }

        }

    }

    /**
     * Calculates how many levels the player has increased according to his score.
     * If the player has scored points enough to increase two or more levels in a single round
     * this method will handle that.
     */
    updateLevel() {
        if (this.score >= this.level * scoreToLevelUp) {
            this.level = Math.floor(this.score / scoreToLevelUp) + 1;
        }
    }

    resetGame() {
        this.hasLost = false;
        this.hasWon = false;
        this.level = 1;
        this.lives = 5;
        this.score = 0;
        this.points = 0;
    }

}

let hud = new HUD();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [
    new Enemy(-120, brickRowY[0], 'images/enemy-bug.png', 90),
    new Enemy(-120, brickRowY[1], 'images/enemy-bug.png', 160),
    new Enemy(-120, brickRowY[2], 'images/enemy-bug.png', 120),
    new Enemy(-120, brickRowY[3], 'images/enemy-bug.png', 100)
];

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
