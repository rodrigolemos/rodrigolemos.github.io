const [edgeL, edgeR, edgeU, edgeD] = [2, 402, 55, 405];
const [stepX, stepY] = [100, 95];
const brickRowY = [215, 120, 25];

// lives, enemies, speed
const level = {
    1: [7, 4, 300],
    2: [5, 6, 400],
    3: [3, 7, 500]
}

class HUD {
    
    constructor() {
        ctx.fillStyle = "Black";
        ctx.font = "16pt Courier New";
    }

    showScore() {
        ctx.textAlign = "left"; 
        ctx.fillText(`Score: ${player.score}`, 10, 30); 
    }

    showLives() {
        ctx.textAlign = "right"; 
        ctx.fillText(`Lives: ${player.lives}`, 490, 30); 
    }

    render() {
        this.showScore();
        this.showLives();
    }
}

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
            player.endRound(false);
        }

        if (this.x < edgeR + 100) {
            this.x = this.x + this.speed * dt;
        } else {
            this.initialize();
        }

    }

    hasCollided() {

        let [enemyx, enemyy, playerx, playery] = [this.x, this.y, player.x, player.y].map(el => Math.floor(el) );

        if ( ( playerx <= enemyx + this.hsize && playerx >= enemyx - this.hsize ) && enemyy == playery ) {
            return true;
        }

    }

    initialize() {
        this.x = -100;
        this.speed = Math.floor(Math.random() * 500) + 200;
    }
}

// Now write your own player class
class Player extends Character {
    
    constructor(x = 202, y = 405, sprite = 'images/char-boy.png') {
        super(x, y, sprite);
        this.score = 0;
        this.lives = 3;
    }

    update() {
        // ...
    }

    handleInput(key) {

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

    endRound(win = false) {
        
        this.x = 202;
        this.y = 405;

        if (win) {
            this.score++;
        } else {
            this.lives--;
        }

    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(-100, brickRowY[0], 'images/enemy-bug.png', 100),
    new Enemy(-100, brickRowY[1], 'images/enemy-bug.png', 100),
    new Enemy(-100, brickRowY[2], 'images/enemy-bug.png', 100)
];

// Place the player object in a variable called player
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
