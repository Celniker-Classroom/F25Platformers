//sprites and variables

let blocks, blocksImg, tilesGroup, player, lava, boss, walls, wallsImg, gems, playerImg, lavaImg,bossImg, gemImg, info, infoImg, flag, flagImg, bricks, bricksImg, saw, sawImg, time;
let lives = 5;
let timer = 0;
let score = 0;

function preload() {
  bricksImg = loadImage('images/bricks.png');
  blocksImg = loadImage('images/blocks.png');
  wallsImg = loadImage('images/wall.png');
  playerImg = loadImage('images/player.png');
  lavaImg = loadImage('images/lava.png');
  bossImg = loadImage('images/boss.png');
  gemImg= loadImage('images/coin.png');
  infoImg= loadImage('images/info.png');
  flagImg = loadImage('images/flag.png');
  sawImg=loadImage('images/saw.png');
}

function setup() {


  createCanvas(1000, 600); //sets up the canvas
  world.gravity.y = 10; //sets gravity to 10\

  //info 
  info= new Sprite();
  info.image = infoImg;
  infoImg.resize(300,300);
  info.physics=NONE;
  info.x=200;
  info.y=200;
  info.opacity=.3

  //flag
  flag= new Group();
  flag.image=flagImg;
  flag.physics=STA;
  flagImg.resize(50,100);
  flag.tile='a';

  //gems group
  gems = new Group();
  gems.image = gemImg;
  gemImg.resize(36,36);
  gems.physics = KIN;
  gems.x = () => random(100,5000);
  gems.y = () => random(500, 900);
  gems.amount = 15;
 

  //player sprite
  player = new Sprite();
  player.rotation = 0;
  player.image = playerImg
  playerImg.resize(100, 100);
  player.y = 200;
  player.x = 200

  //boss group
  boss = new Sprite();
  boss.image = bossImg;
  bossImg.resize(104,150);
  boss.x = 800;
  boss.y = 800;


  //wall group
  walls = new Group();
  walls.image = wallsImg;
  wallsImg.resize(50, 100);;
  walls.physics = STA;
  walls.tile = 'i';
  walls.color = 'brown';

  //bricks group
  bricks = new Group();
  bricks.image = bricksImg;
  bricksImg.resize(205, 105);
  bricks.w = 100;
  bricks.h = 50;
  bricks.physics = STA;
  bricks.tile = '=';

  //blocks group
  blocks = new Group();
  blocks.image = blocksImg;
  blocksImg.resize(100, 50);
  blocks.color = 'brown';
  blocks.physics = STA;
  blocks.tile = 's';

  //lava group
  lava = new Group();
  lava.image=lavaImg;
  lavaImg.resize(204,100);
  lava.physics=NONE;
  lava.tile = 'l';


  //saw
  saw= new Group();
  squareSequence();
  saw.physics=KIN;
  saw.image=sawImg;
  sawImg.resize(150,150);
  saw.x = () => random(500,2000);
  saw.y = () => random(0, 900);
  saw.amount = 12;

  //timer
  time = new Sprite();
  time.physics=NONE;
  time.w=100;
  time.h=50;
  time.x=200;
  time.y=850;
  time.color='white'

  //player collecting coins 
  player.overlaps(gems, collect);

  //this makes the map
  tilesGroup = new Tiles(
    [
      '=======================================================================================',
      '=lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll=',
      '=.....................................................................................=',
      '=.....................................................................................=',
      '=.....................................................................................=',
      '=.....s........s...i.......s...........i.....i..........i..........s.........i........=',
      '=.....s........s...i.......s...........i.....i..........i..........s.........i........=',
      '=..........s...........s.........s.........s.........s........i.......s...............=',
      '=.=.....i.........s.........i...........s...........s.........i......s..........s.....=',
      '=......s.......i....s.....s.........i..........i........s.....s......i.....s..........=',
      '=lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll.....i..=',
      '==============================================================================........=',
      '=lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll........=',
      '=....s......s.....i......s......s..............i.................s...........l........=',
      '=............s....s............s..........i.........i....s...........s....s..l........=',
      '=........i......s......s......i......s........s.............i...............s.........=',
      '=.....s.............i...........s.........i...........s....i......s............s......=',
      '=..............s.........i.......s......s........s....i...............i....s..........=',
      '=.a...i...................s.......i...............s.............s.......i.............=',
      '=.s..s..s..s.....s..s..s..s..i.....s.......s.......s........s..i........s............s=',
      '=.....................................................................................=',
      '=lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll=',
      '======================================================================================='
    ],
    0,
    0,
    bricks.w + 1,
    bricks.h + 1
  );

}




function update() {
  clear()
  handlePlayerMovement(); //movement function

  player.text = lives; //shows the lives of the player
  fill('blue');

  time.text = timer; //timer text
  

  if (frameCount % 60 == 0) {
    timer+= 1; //timer so that the boss would be able to rest and chase
  }

  if (timer >= 10) {
    boss.moveTo(player, 5); //chases the player
  } if (timer >= 16) {
    boss.moveTo(player, 7) //makes the boss faster
  }

//removes your health if you collide
  if (player.overlaps(lava) || (player.collides(boss) || (player.collides(saw)))) {
    lives-= .5; //gets rid of one life if it collides with lava or boss
  }

  //if score = 3 or 6, you remove something
  if(score===3){
    boss.delete();//deletes boss after you collect 6 coins 
  } if(score===6) {
    saw.delete();
  }

  if (lives <= 0) {
    textSize(40);
    text("Game Over", width / 2, height / 2);
    background = 'black';
    background(0);
    fill(255, 0, 0);
    textAlign(CENTER);
   //game over 
  }

  if(player.colliding(flag)) {
    textSize(40);
    text("YOU WIN!", width / 2, height / 2);
    background = 'black';
    background(0);
    fill(255, 0, 0);
    textAlign(CENTER);
    //you win if you touch the flag
  }



  }

//this function deletes the gems
function collect(player, gem) {
  score++;
  gem.delete();
}
//this function makes the camera follow the player
function drawFrame() {
  clear();
  camera.x = player.x;
  camera.y = player.y;
}


//charcter movement function
function handlePlayerMovement(character) {
  if (kb.pressing('left')) {
    player.vel.x = -8; // Move left
  } else if (kb.pressing('right')) {
    player.vel.x = 8; // Move righT
  } else {
    player.vel.x = 0; // Stop if no left/right key is pressed
  }
  if (kb.pressing('up') && (player.colliding(bricks) || player.colliding(blocks) || player.colliding(walls))) {
    player.vel.y = -5; // Move up
  } else if (kb.pressing('down')) {
    player.vel.y = 8; // Move down
  } 

  if (kb.presses('space')) {
    player.velocity.x *= 13;//dash
  }
}

//moves the saw to the right
async function squareSequence() {
  saw.rotationSpeed = 50;
   await saw.move(900, 0 , 1);
   await delay(10);
   squareSequence();
}






