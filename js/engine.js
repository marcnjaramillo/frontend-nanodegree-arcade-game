/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        if(gameBegin.gameFinished === true) {
          alert("Congratulations! You won!!!");
        }
        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollision();
    }

    function checkCollision () {

        allEnemies.forEach(function(enemy) {
          if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x &&
              player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
                player.collide();
              }
        });

        if(player.level === "levelOne") {
            if(player.x < 350 && player.y < 0) {
              gameBegin.resetGame();
            }
        }

    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {

        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });

        player.update();

        blueGem.update();
        greenGem.update();
        orangeGem.update();

        blueSelector.update();
        greenSelector.update();
        orangeSelector.update();

        blueStar.update();
        greenStar.update();
        orangeStar.update();
    }


/* --------------------------------------------------------------------------
 * This defines the first level.
 */

var levelOne = function () {

      var levelOneTopRow = [
            'images/water-block.png', // Row of water
            'images/stone-block.png', // Stone bridge
      ],

        row, col;

      for (row = 0; row < 1; row++) {
        for (col = 0; col < 4; col++) {
          ctx.drawImage(Resources.get('images/water-block.png'), col * 101, row * 83);
        }
          ctx.drawImage(Resources.get('images/stone-block.png'), col * 101, row * 83);
        }

      var levelOne = [
              'images/stone-block.png',
              'images/stone-block.png',   // Row 1 of 3 of stone
              'images/stone-block.png',   // Row 2 of 3 of stone
              'images/stone-block.png',   // Row 3 of 3 of stone
              'images/grass-block.png',   // Row 1 of 2 of grass
              'images/grass-block.png'   // Row 2 of 2 of grass
          ],

          numRows = 6,
          numCols = 5,
          row, col;

      for (row = 1; row < numRows; row++) {
          for (col = 0; col < numCols; col++) {

              ctx.drawImage(Resources.get(levelOne[row]), col * 101, row * 83);
          }
        }
      }

/* -----------------------------------------------------------------------
 * This defines the second level of the game.
 */

var levelTwo = function () {

      var levelTwoRows = [
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'   // Row 2 of 2 of grass
            ],

            numRows = 5,
            numCols = 5,
            row, col;

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(levelTwoRows[row]), col * 101, row * 83);
            }
          }

        var levelTwoLastRow = [
              'images/water-block.png', // Row of water
              'images/stone-block.png', // Stone bridge
        ],

          row, col;

          for (col = 0; col < 4; col++) {
            ctx.drawImage(Resources.get('images/water-block.png'), col * 101, row * 83);
          }
            ctx.drawImage(Resources.get('images/stone-block.png'), col * 101, row * 83);
      }

      function render() {
          if (player.level === "levelOne") {
              levelOne();
            }
          if (player.level === "levelTwo") {
              levelTwo();
            }
          renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();

        blueGem.render();
        greenGem.render();
        orangeGem.render();

        blueSelector.render();
        greenSelector.render();
        orangeSelector.render();

        blueStar.render();
        greenStar.render();
        orangeStar.render();
    }

    function textDrawer(text, x, y) {
      ctx.font = "30px Lato";
      ctx.textAlign = "center";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeText(text, x, y);
      ctx.fillStyle = "white";
      ctx.fillStyle(text, x, y);
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
          //noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/blue-gem.png',
        'images/green-gem.png',
        'images/orange-gem.png',
        'images/Selector.png',
        'images/blue-star.png',
        'images/green-star.png',
        'images/orange-star.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
