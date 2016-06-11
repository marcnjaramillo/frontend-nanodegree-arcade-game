/*

CONTENTS
01. Player
02. Enemies
03. Gems
04. Selectors
05. Gameplay
06. Controls

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


/* -----------------------------------------------------
 * This determines which level the player is on.
 */

Player.prototype.levelCheck = function() {

    if(this.level === "levelOne") {
      this.x = 200;
      this.y = 400;
    }

    else if(this.level === "levelTwo") {
      this.x = 400;
      this.y = 400;
    }
};

/* -------------------------------------------------------
 * This resets player position.
 */

Player.prototype.reset = function() {
  if(this.level === "levelOne") {
    this.x = 200;
    this.y = 400;
  }

  else if(this.level === "levelTwo") {
    this.x = 400;
    this.y = 400;
  }


};

/* ---------------------------------------------------------------------
 * This checks for collision with enemy objects.
 */

Player.prototype.collide = function() {
    for(var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 25 && this.x + 25 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
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

  if(this.y < 0 || this.y > 400) {
    if(this.y < 0) {
      this.level = "levelTwo";
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
allEnemies[1] = new Enemy(100, 130, randomInt(50, 300));
allEnemies[2] = new Enemy(100, 225, randomInt(50, 300));

/*
-----------------------------GEMS-----------------------------
*/

/* ---------------------------------------------------------------------
 * This creates the location parameters and height and width of the gems.
 */

var Gem = function(x, y) {

    this.x = randomInt(0, 400);
    this.y = randomInt(60, 220);
    this.height = 40;
    this.width = 40;
};

/* -------------------------------------------------------------------------
 * This section creates the gems by calling the location, height, and width
 * from Gem, and sets the initial display and collected status so that the gems
 * will appear on screen when the game is loaded.
 */

var Blue = function(sprite, x, y) {
    Gem.call(this, x, y);
    this.sprite = sprite;
    this.display = true;
    this.collected = false;
};

var Green = function(sprite, x, y) {
    Gem.call(this, x, y);
    this.sprite = sprite;
    this.display = false;
    this.collected = false;
};

var Orange = function(sprite, x, y) {
    Gem.call(this, x, y);
    this.sprite = sprite;
    this.display = false;
    this.collected = false;
};

/* ------------------------------------------------------------------------
 * This section renders the gems that are to be collected.
 */

Blue.prototype.render = function() {
    if(this.display === true) {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Green.prototype.render = function() {
    if(blueStar.display === true && orangeGem.display === false &&
       player.level === "levelOne") {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

Orange.prototype.render = function() {
    if(blueStar.display === true && greenStar.display === true &&
       player.level === "levelOne") {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


/* ----------------------------------------------------------------------
 * This section checks to see if the player has touched the gems; if so,
 * the gem display and collected status are altered.
 */

Blue.prototype.checkStatus = function() {
    if (player.x < blueGem.x + 25 && player.x + 25 > blueGem.x &&
        player.y < blueGem.y + 30 && player.y + 30 > blueGem.y) {
          player.gemStatus = 1;
          this.collected = true;
          this.display = false;
    }
};

Green.prototype.checkStatus = function() {
    if (player.x < greenGem.x + 25 && player.x + 25 > greenGem.x &&
        player.y < greenGem.y + 30 && player.y + 30 > greenGem.y) {
          player.gemStatus = 1;
          this.collected = true;
          this.display = false;
    }
};

Orange.prototype.checkStatus = function() {
    if (player.x < orangeGem.x + 25 && player.x + 25 > orangeGem.x &&
        player.y < orangeGem.y + 30 && player.y + 30 > orangeGem.y) {
          player.gemStatus = 1;
          this.collected = true;
          this.display = false;
    }
};

/* ---------------------------------------------------------------------------
 * This section makes the gems disappear from the gameboard once they have been
 * collected by the player.
 */

Blue.prototype.update = function() {
    this.checkStatus();
};

Green.prototype.update = function() {
    this.checkStatus();
};

Orange.prototype.update = function() {
    this.checkStatus();
};

/* ----------------------------------------------------------------
 * Instantiates the gems.
 */

var gem = new Gem();
var blueGem = new Blue('images/blue-gem.png');
var greenGem = new Green('images/green-gem.png');
var orangeGem = new Orange('images/orange-gem.png');


/*
-----------------------------SELECTORS-----------------------------
*/

/* ---------------------------------------------------------------------
 * This creates the location parameters and height and width of the selectors.
 */

var Selector = function(x, y) {

    this.x = x;
    this.y = y;
    this.height = 83;
    this.width = 101;
};

/* -------------------------------------------------------------------------
 * This section creates the selectors by calling the location, height, and width
 * from Selector, and sets the initial display so that selectors will
 * appear on screen when the corresponding gems are collected.
 */

var BlueSelector = function(sprite, x, y) {
    Selector.call(this, x, y);
    this.sprite = sprite;
    this.display = false;
};

var GreenSelector = function(sprite, x, y) {
    Selector.call(this, x, y);
    this.sprite = sprite;
    this.display = false;
};

var OrangeSelector = function(sprite, x, y) {
    Selector.call(this, x, y);
    this.sprite = sprite;
    this.display = false;
};

/* ------------------------------------------------------------------------
 * This section renders the selectors that identify where to place gems.
 */

BlueSelector.prototype.render = function() {
    if(this.display === true) {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

GreenSelector.prototype.render = function() {
    if(this.display === true) {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

OrangeSelector.prototype.render = function() {
    if(this.display === true) {
       ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

/* ----------------------------------------------------------------------
 * This section checks to see if the player has touched the gems; if so,
 * the corresponding selector display is altered.
 */

BlueSelector.prototype.checkStatus = function() {
    if (blueGem.collected === true && player.level === "levelTwo") {
          this.display = true;
    }
};

GreenSelector.prototype.checkStatus = function() {
    if (greenGem.collected === true && player.level === "levelTwo" &&
        blueStar.display === true) {
          this.display = true;
    }
};

OrangeSelector.prototype.checkStatus = function() {
    if (orangeGem.collected === true && player.level === "levelTwo" &&
        blueStar.display === true && greenStar.display === true) {
          this.display = true;
    }
};

/* ---------------------------------------------------------------------------
 * This section makes the selectors appear on the gameboard once gems have been
 * collected by the player.
 */

BlueSelector.prototype.update = function() {
    this.checkStatus();
};

GreenSelector.prototype.update = function() {
    this.checkStatus();
};

OrangeSelector.prototype.update = function() {
    this.checkStatus();
};

/* ----------------------------------------------------------------
 * Instantiates the selectors.
 */

var selector = new Selector();
var blueSelector = new BlueSelector('images/Selector.png', 100, 40);
var greenSelector = new GreenSelector('images/Selector.png', 200, 40);
var orangeSelector = new OrangeSelector('images/Selector.png', 300, 40);

/*
-----------------------------GAMEPLAY-----------------------------
*/

/* ---------------------------------------------------------------------
 * This creates the parameters for gameplay.
 */

var Game = function(x, y) {


    this.gameFinished = false;
};

/* ----------------------------------------------------------------------
 *
 *
 */

 var BluePlaced = function(sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.height = 90;
    this.width = 90;
    this.sprite = sprite;
    this.checkStatus;
    this.render;
    this.update;
    this.display = false;
 }

 var GreenPlaced = function(sprite, x, y) {
   this.sprite = sprite;
   this.x = x;
   this.y = y;
   this.height = 90;
   this.width = 90;
   this.sprite = sprite;
   this.checkStatus;
   this.render;
   this.update;
   this.display = false;
 }

 var OrangePlaced = function(sprite, x, y) {
   this.sprite = sprite;
   this.x = x;
   this.y = y;
   this.height = 90;
   this.width = 90;
   this.sprite = sprite;
   this.checkStatus;
   this.render;
   this.update;
   this.display = false;
 }

/* ----------------------------------------------------------------------
 *
 *
 */

BluePlaced.prototype.checkStatus = function() {
    if (blueGem.collected === true && player.level === "levelTwo" &&
        player.x < blueSelector.x + 25 && player.x + 25 > blueSelector.x &&
        player.y < blueSelector.y + 30 && player.y + 30 > blueSelector.y) {
          this.display = true;
    }
};

GreenPlaced.prototype.checkStatus = function() {
    if (greenGem.collected === true && player.level === "levelTwo" &&
        player.x < greenSelector.x + 25 && player.x + 25 > greenSelector.x &&
        player.y < greenSelector.y + 30 && player.y + 30 > greenSelector.y) {
          this.display = true;
    }
};

OrangePlaced.prototype.checkStatus = function() {
    if (orangeGem.collected === true && player.level === "levelTwo" &&
        player.x < orangeSelector.x + 25 && player.x + 25 > orangeSelector.x &&
        player.y < orangeSelector.y + 30 && player.y + 30 > orangeSelector.y) {
          this.display = true;
    }
};

/* ---------------------------------------------------------------------------
 *
 *
 */

 BluePlaced.prototype.render = function() {
     if(this.display === true) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
     }
 };

 GreenPlaced.prototype.render = function() {
     if(this.display === true) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
     }
 };

 OrangePlaced.prototype.render = function() {
     if(this.display === true) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
     }
 };


 /* ---------------------------------------------------------------------------
  *
  *
  */

  BluePlaced.prototype.update = function() {
      this.checkStatus();
  };

  GreenPlaced.prototype.update = function() {
      this.checkStatus();
  };

  OrangePlaced.prototype.update = function() {
      this.checkStatus();
  };

var gameBegin = new Game();

var blueStar = new BluePlaced('images/blue-star.png', 100, -40);
var greenStar = new GreenPlaced('images/green-star.png', 200, -40);
var orangeStar = new OrangePlaced('images/orange-star.png', 300, -40);

/*
-----------------------------CONTROLS-----------------------------
*/

/* ----------------------------------------------------------------
 * This function is used to create a random speed for enemies and
 * a random location for the gems.
 */

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
