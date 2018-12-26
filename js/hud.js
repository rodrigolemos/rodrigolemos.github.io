/**
* @description HUD (heads-up display) Handles on-screen information
*/
class HUD {

  constructor() {
  }

  showInstructions() {
    if (player.readInstructions === false) {

      ctx.globalAlpha = 0.85;
      ctx.fillStyle = "beige";
      ctx.fillRect(0, 50, 505, 535);

      ctx.font = "14pt Fredoka One";
      ctx.fillStyle = "darkred";
      ctx.fillText(`Hi there, friend! How you doin?`, 255, 130);

      ctx.textAlign = "center";
      ctx.font = "11pt Fredoka One";
      ctx.fillText(`It's been too hot lately, so I'm planning to dive into this river.`, 255, 170);
      ctx.fillText(`What do you think?`, 255, 190);

      ctx.fillText(`Using the arrow keys, please take me to the water`, 255, 230);
      ctx.fillText(`avoiding these annoying and giant bugs.`, 255, 250);

      ctx.fillText(`I LIKE ADRENALINE!`, 255, 290);
      ctx.font = "10pt Fredoka One";

      ctx.fillText(`The longer I stand in the brick zone, more points I score, but remember:`, 255, 310);
      ctx.fillText(`THESE POINTS ARE ONLY COUNTED IF I REACH THE WATER!`, 255, 330);

      ctx.font = "11pt Fredoka One";
      ctx.fillText(`I LIKE CHALLENGES!`, 255, 370);

      ctx.font = "10pt Fredoka One";
      ctx.fillText(`Scoring 1000 points I magically win a trophy!`, 255, 390);
      ctx.fillText(`(don't ask me how)`, 255, 410);

      ctx.font = "14pt Fredoka One";
      ctx.fillText(`That's it! Press enter and help me!`, 255, 460);

      ctx.globalAlpha = 1.0;
    }
  }

  showScore() {
    ctx.font = "16pt monospace";
    ctx.fillStyle = "#EEE";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${player.score}`, 10, 30);
    if (player.points > 0) {
      ctx.font = "10pt monospace";
      ctx.fillText(`(${player.points})`, 149, 30);
    }
  }

  showLevel() {
    ctx.font = "16pt monospace";
    ctx.fillStyle = "#EEE";
    ctx.textAlign = "center";
    ctx.fillText(`Level: ${player.level}`, 255, 30);
  }

  showLives() {
    ctx.font = "16pt monospace";
    ctx.fillStyle = "#EEE";
    ctx.textAlign = "right";
    ctx.fillText(`Lives: ${player.lives}`, 490, 30);
  }

  showGameOver() {

    ctx.textAlign = "center";

    if (player.hasLost) {

      ctx.drawImage(Resources.get('images/game-over.png'), 0, 50, 505, 550);
      ctx.font = "16pt monospace";
      ctx.fillStyle = "#EEE";
      ctx.fillText(`Thanks for playing!`, 255, 215);
      ctx.fillText(`Press enter to try again!`, 255, 450);

    }


  }

  showWin() {
    if (player.hasWon) {
      ctx.drawImage(Resources.get('images/you-win.png'), 310, -8, 67, 67);
    }
  }

  render() {
    this.showInstructions();
    this.showScore();
    this.showLevel();
    this.showLives();
    this.showGameOver();
    this.showWin();
  }
}
