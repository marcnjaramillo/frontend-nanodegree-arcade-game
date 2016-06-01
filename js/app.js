
var Enemy = function(x, y, speed) {

    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.height = 80;
    this.width = 30;

};


Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;
    this.reset();

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {

    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 47;
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
      alert("Congratulations! You win!!");
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

Enemy.prototype.reset = function() {

    if(this.x >= 600) {
      this.x = -101;
      this.speed = randomInt(50, 300);
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;

};


Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

Player.prototype.handleInput = function(direction) {
  if(direction === 'left') {
    this.x = this.x - 25;
  }

  if(direction === 'right') {
    this.x = this.x + 25;

  }
  if(direction === 'up') {
      this.y = this.y - 25;

    }
  if(direction === 'down') {
      this.y = this.y + 25;
    }
}

var allEnemies = [];

allEnemies[0] = new Enemy(100, 50, randomInt(50, 300));
allEnemies[1] = new Enemy(100, 130, randomInt(50, 300));
allEnemies[2] = new Enemy(100, 225, randomInt(50, 300));

var player = new Player(200, 400);

Player.prototype.collide = function () {
    for(var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 25 && this.x + 25 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
            this.reset();
            return true;
        }
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
