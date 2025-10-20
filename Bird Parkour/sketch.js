// Simple Platformer in p5play
// Goal: collect coins and reach the flag without touching the enemy

let player;
let enemy;
let flag;
let score = 0;
let lives = 3;
let birdImg; // bird image
let player2;
let coins;
let tiles;

function preload() {
  // Make sure the file path is correct
  birdImg = loadImage('images/New Piskel-1.png.png');
  enemyImg = loadImage('images/snake.png-1.png.png');
  coinImg = loadImage('images/coin.png.png');
}

function setup() {
  new Canvas(700, 700);
  world.gravity.y = 10;

  // create player (bird)
  player = new Sprite(50, 300, 5, 5, 'dynamic'); // must be dynamic to move!
  player.image = birdImg;
  player.scale = 5.5;
;
  ; // shrink instead of enlarging

  // create enemy
  enemy = new Sprite(450, 365, 10, 10, 'kenematic');
  enemy.image=enemyImg;
  enemy.scale= 2.2;
  enemy.vel.x = 2;

  ;
  // create flag (goal)
  flag = new Sprite(650, 300, 25, 25, 'static');
  flag.color = 'green';

  // group for coins
  coins = new Group();
  for (let i = 0; i < 10; i++) {
    let coin = new coins.Sprite(150 + i * 80, 250, 20, 20);
    coin.image = coinImg;
    coin.scale=0.45;

  }

  // tiles (platforms)
  tiles = new Group();
  let ground = new tiles.Sprite(300, 390, 800, 15, 'static');
  let block1 = new tiles.Sprite(250, 330, 90, 20, 'static');
  let block2 = new tiles.Sprite(450, 280, 90, 20, 'static');
}

function draw() {
  background(220);

  // HUD
  textSize(18);
  fill(0);
  text("Score: " + score, 20, 20);
  text("Lives: " + lives, 20, 40);

  // player movement
  if (kb.pressing('left')) player.vel.x = -3;
  else if (kb.pressing('right')) player.vel.x = 3;
  else player.vel.x = 0;

  if (kb.presses('up') && player.colliding(tiles)) {
    player.vel.y = -8;
  }

  // enemy bounce
  if (enemy.x > 500 || enemy.x < 300) {
    enemy.vel.x *= -1;
  }

  // interactions
  player.overlaps(coins, collectCoin);
  player.overlaps(flag, reachGoal);
  player.overlaps(enemy, hitEnemy);
}

// collect coin
function collectCoin(player, coin) {
  coin.remove();
  score += 1;
}

// reach goal
function reachGoal() {
  if (score >= 5) {
    textSize(32);
    fill('green');
    text("YOU WIN!", 220, 200);
    noLoop();
  }
}

// hit enemy
function hitEnemy() {
  lives -= 1;
  player.x = 50;
  player.y = 300;
  if (lives <= 0) {
    textSize(32);
    fill('red');
    text("GAME OVER", 200, 200);
    noLoop();
  }
}
