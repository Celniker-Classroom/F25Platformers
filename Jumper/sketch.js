let player, ground, spikes, groundSensor, goal, zoom, coins, coinCount, startTime;
let groundImg, coinsImg, spikesImg;


new Q5();
new Canvas(600, 400);

//loads images
function preload(){
 groundImg = loadImage('images/ground.png');
 coinsImg = loadImage('images/coins.png');
 spikesImg = loadImage('images/spikes.png');
}


function setup() {
 world.gravity.y = 50;
 coinCount = 0;


 // ground
 ground = new Group();
 ground.tile = 'g';
 ground.physics = 'static';
 ground.w = 32;
 ground.h = 32;
 ground.img = groundImg;
 ground.image.scale = 2;


 // spikes
 spikes = new Group();
 spikes.tile = 's';
 spikes.physics = 'static';
 spikes.w = 32;
 spikes.h = 32;
 spikes.img = spikesImg;
 spikes.image.scale = 2;


 // goal
 goal = new Group();
 goal.tile = "o";
 goal.physics = 'static';
 goal.w = 32;
 goal.h = 32;
 goal.color = 'green';


 // coins
 coins = new Group();
 coins.tile = 'c';
 coins.physics = 'static';
 coins.w = 20;
 coins.h = 20;
 coins.img = coinsImg;


 // tiles
 new Tiles(
   [
     "gggggggggggggggggggggggggggggggg",
     "gc...........gc................g",
     "g............g....ccccccccc....g",
     "gg.............g...............g",
     "g.........s....gs....s....s....g",
     "g...gg..ggggggggggggggggggggg..g",
     "g...gg......................g..g",
     "g..ggg......................g..g",
     "gg...........ggg..ggg..gg...gg.g",
     "ggg..........cggs..ggs..gg..g..g",
     "gggg..........cgg...gg......g..g",
     "gc.........................gg..g",
     "g....g......g....ss.......ggg..g",
     "g...ggg......g...gg....g....g..g",
     "gg.......ss...g........gs...g.gg",
     "g....s...gg....o.......ggg..g..g",
     "g..ggg.....................gg..g",
     "g...........ss............ggg..g",
     "gg.....s....gg......ggg..gggg..g",
     "gggg...ggg............gggggggs.g",
     "gggggg.......s....gc........gg.g",
     "gggg.......ggg....ggc.......g..g",
     "ggg....s...........ggc......g..g",
     "gg.....ggg..........gg.........g",
     "g................c.............g",
     "...........ggg.........gggs....g",
     "................gg..ss.ggggggggg",
     "...c............gg..gg....sggggg",
     "..........s....ggg......sggggggg",
     "...g.....ggg..........sggggggggg",
     "..ggg..ggggggg......sggggggggggg",
     "gggggggggggggg.....ggggggggggggg",
   ],
   0, 0, 32, 32
 );


 let tileSize = 32;
 let numRows = 32;
 let spawnX = tileSize + 18;
 let spawnY = (numRows - 2) * tileSize;


 // player
 player = new Sprite(spawnX, spawnY, 28, 28);
 player.color = 'blue';
 player.rotationLock = true;
 player.collider = 'dynamic';
 player.friction = 0;
 player.bounciness = 0;


 // ground sensor
 groundSensor = new Sprite(player.x, player.y + player.h/2, 10, 4);
 groundSensor.removeColliders();
 groundSensor.visible = false;
 new GlueJoint(player, groundSensor);


 // start time
 startTime = millis();
}


function update() {
 background('skyblue');


 //check if player reaches goal
 player.overlaps(goal, winGame);


 //instructions
 camera.off();
 fill(0);
 textSize(14);
 text('Arrows to move, Up or Space to jump', 10, 20);
 camera.on();


 //jumping
 if (groundSensor.overlapping(ground) && (kb.presses('up') || kb.presses('space'))) {
   player.vel.y = -12;
 }


 //movement
 if (kb.pressing('left')) {
   player.vel.x = -4.5;
 } else if (kb.pressing('right')) {
   player.vel.x = 4.5;
 } else {
   player.vel.x = 0;
 }


 //crashing into spike
 if (player.overlapping(spikes)) {
   respawnPlayer();
 }


 //fall off screen
 if (player.y > 1320) {
   respawnPlayer();
 }


 //coin collection
 player.overlaps(coins, removeCoin);



 updateCoinCount();
 showTimer();
}


function drawFrame() {
 camera.x = player.x;
 camera.y = lerp(camera.y, player.y, 0.05);  // smooth vertical camera
}


//user created functions


// remove coin when collected
function removeCoin(player, coinCollected) {
 coinCollected.remove();
 coinCount++;
}


// show coin counter
function updateCoinCount() {
 camera.off();
 fill(0);
 textSize(18);
 text("Coins: " + coinCount, 20, 50);
 camera.on();
}


// show timer
function showTimer() {
 let elapsed = Math.floor((millis() - startTime) / 1000);
 camera.off();
 fill(0);
 textSize(18);
 text("Time: " + elapsed + "s", 20, 70);
 camera.on();
}


// respawn function
function respawnPlayer() {
 player.x = 50;
 player.y = 800;
 player.vel.x = 0;
 player.vel.y = 0;
}


// win function
function winGame(player, goalBlock) {
 noLoop();
 camera.off();
 fill("green");
 textSize(32);
 text("You Win!", width/2 - 70, height/2);
 camera.on();
}





