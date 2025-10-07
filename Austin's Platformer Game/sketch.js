let player;
let ground;
let platform1;
let platform2;
let hookithink;
let hook2;
let obstacle1;
let grappleTarget = null;
let grappleJoint = null;
let grappleLine = null;
let ATTATCH;
let PLATFORMS;
let brick;
let health = 100; // Added: Initial health value
let isHurt = false; // Added: Cooldown variable for taking damage
let hurtCooldown = 60; // Added: Cooldown frames (e.g., 60 frames = 1 second)
let hurtTimer = 0; // Added: Timer to track cooldown
let gravityshift;
let spike;
let spike1;
let spike2;
let spike3;
let spike4;
let spike5;
let hook3;

function preload() {
  ATTATCH = loadImage('assets/grappling hook test image.png');
  PLATFORMS = loadImage('assets/Piskel COncrete.png');
 
  FIRE = loadImage('assets/3xfirer.png'); //this was supposed to be a gif but i was unable to get it to work, fix that later.
}


function setup() {
  new Canvas(1200, 600);
  world.gravity.y = 20; // Set world gravity once in setup. (Vertical) Velocity can be changed but this gravity variable is static.

  brick = new Group();
  brick.w = 20;
  brick.h = 10;
  // Apply image to the group's `tile` property, not the group itself
  brick.tile = '=';
  brick.image = PLATFORMS;
  brick.physics = STATIC
  
  tilesGroup = new Tiles(
    [
      '=...............=',
    ],
    200,
    400
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=',
    ],
    400,
    350
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=',
    ],
    1600,
    300
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=',
    ],
    1000,
    300
  );

  tilesGroup = new Tiles(
    [
      '=...............=',
    ],
    1800,
    250
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=',
    ],
    2100,
    300
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=',
    ],
    2400,
    250
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=',
    ],
    2450,
    0
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=',
    ],
    2800,
    0
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=',
    ],
    3200,
    100
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=',
    ],
    3400,
    300
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=...............=...............=',
    ],
    3700,
    300
  );

  tilesGroup = new Tiles(
    [
      '=...............=...............=...............=...............=',
    ],
    4400,
    300
  );

  // Create and set player sprite properties
  player = new Sprite();
  player.x = 200;
  player.w = 20;
  player.h = 20;
  player.physics = DYNAMIC;
  player.vel.y = 20;
  player.bounciness = 0
//spikes and spike properties.
let spike = new Sprite(2515, 0, 50, 'triangle'); 
spike.color = 'red';
spike.physics = 'STATIC';
spike.rotation = 180;

let spike1 = new Sprite(2565, 0, 50, 'triangle'); 
spike1.color = 'red';
spike1.physics = 'STATIC';
spike1.rotation = 180;

let spike2 = new Sprite(2615, 0, 50, 'triangle'); 
spike2.color = 'red';
spike2.physics = 'STATIC';
spike2.rotation = 180;

let spike3 = new Sprite(2665, 0, 50, 'triangle'); 
spike3.color = 'red';
spike3.physics = 'STATIC';
spike3.rotation = 180;

let spike4 = new Sprite(2715, 0, 50, 'triangle'); 
spike4.color = 'red';
spike4.physics = 'STATIC';
spike4.rotation = 180;

let spike5 = new Sprite(2765, 0, 50, 'triangle'); 
spike5.color = 'red';
spike5.collider = 'STATIC';
spike5.rotation = 180;





  // Create and set platform sprite properties
//(REPLACED BY TILES) but im leaving it hear incase you want to add it bakc later

gravityshift = new Sprite();
gravityshift.x = 2450
gravityshift.y = 250
gravityshift.w = 10
gravityshift.h = 10

obstacle1 = new Sprite();
obstacle1.x = 1400;
obstacle1.y = 200
obstacle1.w = 100;
obstacle1.h = 5;
obstacle1.color = 'red';
obstacle1.physics = STATIC;
obstacle1.image = FIRE

obstacle1emission = new Sprite 
obstacle1emission.x = 1430
obstacle1emission.y =200
obstacle1emission.color = 'gray'
obstacle1emission.physics = STATIC
obstacle1emission.h = 10
obstacle1emission.w = 10

  // Create and set hook sprites
  hookithink = new Sprite();
  hookithink.x = 700;
  hookithink.y = 100;
  hookithink.w = 20;
  hookithink.h = 20;
  hookithink.image = ATTATCH;
  hookithink.physics = STATIC;

  hook2 = new Sprite();
  hook2.x = 1200;
  hook2.y = 0;
  hook2.w = 50;
  hook2.h = 5;
  hook2.image = ATTATCH;
  hook2.physics = STATIC;

  hook3 = new Sprite();
  hook3.x = 4000;
  hook3.y = 0;
  hook3.w = 50;
  hook3.h = 5;
  hook3.image = ATTATCH;
  hook3.physics = STATIC;

  // Create and set obstacle sprite properties
}

function draw() {

  if (player.x >= 4600){
    camera.off();
    background('black');
    fill('white');
    textSize(50);
    textAlign(CENTER);
    text("Congratulations! You won!", width / 2, height / 2);
    textSize(20);
    text("Press 'R' to restart", width / 2, height / 2 + 50);

    if (kb.presses('R')) {
      resetGame();
    }
    camera.on();
    return; // Stop the draw loop
  }
  
  if (health <= 0) {
    // Game over 
    camera.off();
    background('black');
    fill('white');
    textSize(50);
    textAlign(CENTER);
    text("Death by: Immolation", width / 2, height / 2);
    textSize(20);
    text("Press 'R' to restart", width / 2, height / 2 + 50);

    if (kb.presses('R')) {
      resetGame();
    }
    camera.on();
    return; // Stop the draw loop
  }
  if (player.y >= 1000) {
    // Game over 
    camera.off();
    background('black');
    fill('white');
    textSize(50);
    textAlign(CENTER);
    text("Death by: Falling from a high place", width / 2, height / 2);
    textSize(20);
    text("Press 'R' to restart", width / 2, height / 2 + 50);

    if (kb.presses('R')) {
      resetGame();
    }
    camera.on();
    return; // Stop the draw loop
  }

 // if ((player.colliding(spike) || (player.colliding(spike1) ) || (player.colliding(spike2) ) || (player.colliding(spike3) ) || (player.colliding(spike4) ) || (player.colliding(spike5) ))){
    // Game over. Unfortunately this part of the code did not work. I am unsure as to why.
  // camera.off();
   // background('black');
   // fill('white');
   // textSize(50);
  //  textAlign(CENTER);
  //  text("Death by: Impalement", width / 2, height / 2);
   // textSize(20);
   // text("Press 'R' to restart", width / 2, height / 2 + 50);

  // if (kb.presses('R')) {f
   // resetGame();
  //  }
  //  camera.on();
   // return; // Stop the draw loop
 // }

  // Normal game loop
  camera.x = player.x; // Set camera to follow player on X-axis
  camera.y = player.y; // Set camera to follow player on Y-axis
  clear();
  background('lightblue');

  

  // Player movement
  if (!kb.pressing('left') && !kb.pressing('right')) {
    player.vel.x = 0;
  }
  if (kb.pressing('left')) {
    player.vel.x = -5;
  }
  if (kb.pressing('right')) {
    player.vel.x = 5;
  }

  // Jump
  if (kb.presses(' ') && (player.colliding(brick))) {
    player.vel.y = -10;
  }

  // Slow-motion with T
  if (kb.pressing('T')) {
    world.timeScale = 0.25;
  } else {
    world.timeScale = 1;
  }

  // Gravity Shift with F
  if (kb.presses('F')) {
    world.gravity.y *= -1;
  }

  // Health and collision with obstacle
  if (player.colliding(obstacle1) && !isHurt) {
    health -= 34;
    isHurt = true;
    hurtTimer = frameCount;
  }

  // Hurt cooldown timer
  if (isHurt && frameCount > hurtTimer + hurtCooldown) {
    isHurt = false;
  }

  player.strokeWeight = 0;

  // Update the grappling line
  if (grappleLine && grappleTarget) {
    grappleLine.x = (player.x + grappleTarget.x) / 2;
    grappleLine.y = (player.y + grappleTarget.y) / 2;
    grappleLine.w = dist(player.x, player.y, grappleTarget.x, grappleTarget.y);
    grappleLine.rotateTo(grappleTarget, {
      axis: 'y'
    });
  }

  // Display health on screen
  drawHealth();
}

function drawHealth() {
  camera.off();
  fill('red');
  noStroke();
  textSize(20);
  textAlign(LEFT, TOP);
  text('Health: ' + health, 10, 10);
  camera.on();
}

function resetGame() {
  health = 100;
  isHurt = false;
  player.x = 200;
  player.y = 200;
  player.vel.x = 0;
  player.vel.y = 0;
}

function mousePressed() {
  if (health <= 0) {
    return; // Don't allow grappling when dead
  }

  if ((!grappleJoint) && (player.x <= 1100)) {
    grappleTarget = new Sprite(hookithink.x, hookithink.y, 10, 10);
    grappleTarget.collider = 'static';
    grappleTarget.visible = true;
    grappleTarget.debug = true;
    grappleJoint = new RopeJoint(player, grappleTarget);
    grappleJoint.visible = true
    grappleLine = new Sprite(player.x, player.y, 1, 1);
    grappleLine.color = 'black';
    grappleLine.collider = 'none';
    grappleLine.visible = false;
  } else if ((!grappleJoint) && (player.x >= 1100) && (player.x <= 3500)) {
    grappleTarget = new Sprite(hook2.x, hook2.y, 10, 10);
    grappleTarget.collider = 'static';
    grappleTarget.visible = true;
    grappleTarget.debug = true;
    grappleJoint = new RopeJoint(player, grappleTarget);
    grappleJoint.visible = true;
    grappleLine = new Sprite(player.x, player.y, 1, 1);
    grappleLine.color = 'black';
    grappleLine.collider = 'none';
    grappleLine.visible = false;
  } else if ((!grappleJoint) && (player.x >= 3501)){
    grappleTarget = new Sprite(hook3.x, hook3.y, 10, 10);
    grappleTarget.collider = 'static';
    grappleTarget.visible = true;
    grappleTarget.debug = true;
    grappleJoint = new RopeJoint(player, grappleTarget);
    grappleJoint.visible = true;
    grappleLine = new Sprite(player.x, player.y, 1, 1);
    grappleLine.color = 'black';
    grappleLine.collider = 'none';
    grappleLine.visible = false;
  }
}

function mouseReleased() {
  // Remove the grappling hook joint and sprites
  if (grappleJoint) {
    grappleJoint.remove();
    grappleJoint = null;
  }
  if (grappleTarget) {
    grappleTarget.remove();
    grappleTarget = null;
  }
  if (grappleLine) {
    grappleLine.remove();
    grappleLine = null;
  }
}
