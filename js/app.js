/*

CONTENTS
01. Player
02. Enemies
03. Items
04. Controls

*/

/*
-----------------------------PLAYER-----------------------------
*/

var Player = function(x, y) {

    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.height = 80;
    this.width = 47;
    this.gemStatus = 0;
    this.level = "levelOne";
};

var player = new Player(200, 400);


/* This determines which level the player is on. */

Player.prototype.levelCheck = function() {

    if (this.level === "levelOne") {
      this.x = 200;
      this.y = 400;
    }

    else if (this.level === "levelTwo") {
      this.x = 400;
      this.y = 400;
    }
};

/* This resets player position. */

Player.prototype.reset = function() {
  if (this.level === "levelOne") {
    this.x = 200;
    this.y = 400;
  }

  else if (this.level === "levelTwo") {
    this.x = 400;
    this.y = 400;
  }

};

/* This checks for collision with enemy objects. */

Player.prototype.collide = function () {
    for(var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 25 && this.x + 25 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
            this.reset();
            return true;
        }
    }
};

Player.prototype.update = function(dt) {

  this.x * (dt);
  this.y * (dt);

  if(this.x < 0 || this.x > 400) {
    if(this.x < 0) {
        this.x = 0;
    }

    else {
      this.x = 400;
    }
  }

//Is there a way to ensure the player can only activate the level reset
//by touching the stone block in the top row by modifying this code?

  if(this.y < 0 || this.y > 400) {
    if(this.y < 0) {
      player.level = "levelTwo";
      this.reset();
    }
    else {
      this.y = 400;
    }
  }


  if(this.collide()) {
    alert("You lose. Try Again.");
    this.reset();
  }

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

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

/*
-----------------------------ENEMIES-----------------------------
*/

var Enemy = function(x, y, speed) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.height = 80;
    this.width = 30;

};

function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [];

allEnemies[0] = new Enemy(100, 50, randomInt(50, 300));
allEnemies[1] = new Enemy(100, 130, randomInt(50, 300));
allEnemies[2] = new Enemy(100, 225, randomInt(50, 300));

/*
-----------------------------ITEMS-----------------------------
*/


/*
-----------------------------CONTROLS-----------------------------
*/

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
