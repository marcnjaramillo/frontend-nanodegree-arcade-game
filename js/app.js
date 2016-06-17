/* This is a very basic game. I played around for the past two weeks with other
 * features like adding a level and collectible items; however, I could not get
 * the game to function the way I wanted to. For now, I pared it down to the
 * most basic requirements. Perhaps in the future I can come back to this and
 * make it more interesting once I learn more advanced techniques.
 */


/*
CONTENTS
01. Player
02. Enemies
03. Controls

*/

/*
-----------------------------PLAYER-----------------------------
*/

var Player = function(x, y) {

    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.height = 50;
    this.width = 25;
};

var player = new Player(200, 400);

/* -------------------------------------------------------
 * This resets player if the game detects collision with enemy bugs or water.
 */

Player.prototype.reset = function() {

    this.x = 200;
    this.y = 400;
};

/* ---------------------------------------------------------------------
 * The function for checking collisions is located in engine.js.
 */

Player.prototype.collide = function() {
    alert("Sorry. You Lose. Try Again.")
    this.reset();
};

Player.prototype.update = function(dt) {
    this.move(dt);
};

Player.prototype.move = function(dt) {

    this.x * (dt);
    this.y * (dt);

    if(this.x < 0) {
      this.x = 0;
    }

    if(this.x > 400) {
      this.x = 400;
    }

    if(this.y < 10) {
      alert("Congratulations! You won!!")
      this.reset();
    }

    if(this.y > 400) {
      this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

/*
-----------------------------ENEMIES-----------------------------
*/

var Enemy = function(x, y, speed) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.height = 30;
    this.width = 30;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {

    if(this.x >= 600) {
      this.x = -101;
      this.speed = randomInt(50, 300);
    }
};

Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;
    this.reset();
};

var allEnemies = [];

allEnemies[0] = new Enemy(100, 50, randomInt(50, 300));
allEnemies[1] = new Enemy(100, 135, randomInt(50, 300));
allEnemies[2] = new Enemy(100, 220, randomInt(50, 300));

/*
-----------------------------CONTROLS-----------------------------
*/

/* ----------------------------------------------------------------
 * This function is used to create a random speed for enemies.
 */

Player.prototype.handleInput = function(direction) {

     if(direction === 'left') {
       this.x = this.x - 20;
     }

     if(direction === 'right') {
       this.x = this.x + 20;
     }

     if(direction === 'up') {
       this.y = this.y - 20;
     }

     if(direction === 'down') {
       this.y = this.y + 20;
     }
 };

function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
