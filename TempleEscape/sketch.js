let canvasW = 960;
let canvasH = 576;
let tileSize = 48;

// Game physics settings
let gravity = 0.75;
let jumpPower = -14;
let doubleJumpPower = -12;
let playerSpeed = 4.5;
let boulderIntervalFrames = 140;
let boulderFallSpeed = 2.2;
let snakeSpeed = 1.2;
let invulnFramesAfterHit = 60;

// Images
let imgExplorer, imgSnake, imgBoulder, imgCoin, imgHeart, imgCar, imgSpike, imgGrass, imgBg;

// Sprites
let player;
let platforms = [];
let coins = [];
let spikes = [];
let snakes = [];
let boulders = [];
let car = null;

// Game stats
let hearts = 3;
let coinCount = 0;
let invulnTimer = 0;

// Game states: TITLE, PLAY, GAMEOVER, WIN
let state = "TITLE";

// Level map layout
let levelMap = [
  "                                        ",
  "                                        ",
  "                                        ",
  "                                        ",
  "               c                 c      ",
  "        gg            c         gg      ",
  "                 ggg                    ",
  "     c     ggg   c    c   g             ",
  "                 g          c         d ",
  "   g    gggg           g    gg          ",
  "        g       c    c       c          ",
  "gggggggggggwwwwwgggggwwggggggggggggggggg"
];

let frameSinceLastBoulder = 0;

function preload() {
  // Load all sprite images
  imgExplorer = loadImage("pixel_art/Explorer.png");
  imgSnake = loadImage("pixel_art/snake.png");
  imgBoulder = loadImage("pixel_art/boulder.png");
  imgCoin = loadImage("pixel_art/coin.png");
  imgHeart = loadImage("pixel_art/heart.png");
  imgCar = loadImage("pixel_art/car.png");
  imgSpike = loadImage("pixel_art/spike.png");
  imgGrass = loadImage("pixel_art/grass_dirt_block.png");
  imgBg = loadImage("pixel_art/jungle_background.png");
}

function setup() {
  createCanvas(canvasW, canvasH);
  imageMode(CORNER);
  textFont("Georgia");
  initLevel();
}

function initLevel() {
  // Reset all sprites and stats
  platforms = []; coins = []; spikes = []; snakes = []; boulders = [];
  hearts = 3; coinCount = 0; invulnTimer = 0; frameSinceLastBoulder = 0;
  state = "TITLE";

  // Setup player
  player = {
    x: tileSize * 1.5,
    y: height - tileSize * 4,
    w: 44,
    h: 64,
    vy: 0,
    onGround: false,
    jumpsUsed: 0
  };

  // Analyze level map
  for (let r = 0; r < levelMap.length; r++) {
    const row = levelMap[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      const x = c * tileSize;
      const y = r * tileSize;

      if (ch === "g") {
        platforms.push({ x: x, y: y, w: tileSize, h: tileSize });
      } else if (ch === "c") {
        coins.push({ x: x + 10, y: y + 10, w: 28, h: 28 });
      } else if (ch === "w") {
        spikes.push({ x: x, y: y + tileSize - 32, w: 32, h: 32 });
      } else if (ch === "s") {
        snakes.push({
          x: x,
          y: y + tileSize - 32,
          w: 64,
          h: 32,
          baseX: x,
          dir: 1,
          minX: x - tileSize * 1.5,
          maxX: x + tileSize * 1.5
        });
      } else if (ch === "d") {
        car = { x: x - 70, y: y - 60, w: 180, h: 200, active: true };
      }
    }
  }

  // Default car placement if none in map
  if (!car) {
    car = { x: (levelMap[0].length - 2) * tileSize, y: height - tileSize - 400, w: 48, h: 72, active: true };
  }

  // Spawn snakes if none are on the map
  if (snakes.length === 0) {
    for (let i = 3; i < levelMap[0].length - 3; i += 6) {
      if (random() < 0.4) {
        let gx = i * tileSize;
        snakes.push({
          x: gx,
          y: height - tileSize - 32,
          w: 64,
          h: 32,
          baseX: gx,
          dir: 1,
          minX: gx - tileSize,
          maxX: gx + tileSize
        });
      }
    }
  }
}

function draw() {
  image(imgBg, 0, 0, width, height); // Background

  // game states
  if (state === "TITLE") { drawTitle(); return; }
  if (state === "GAMEOVER") { drawGameOver(); return; }
  if (state === "WIN") { drawWin(); return; }

  if (state === "PLAY") updatePlayerHorizontal();

  push();
  // Camera follows player
  let camX = constrain(player.x - width / 2 + player.w / 2, 0, (levelMap[0].length * tileSize) - width);
  translate(-camX, 0);

  // Draw platforms
  for (let p of platforms) {
    if (p.x + p.w >= camX - 100 && p.x <= camX + width + 100) {
      image(imgGrass, p.x, p.y, p.w, p.h);
    }
  }

  // Coin collection
  for (let i = coins.length - 1; i >= 0; i--) {
    let c = coins[i];
    image(imgCoin, c.x, c.y, c.w, c.h);
    if (rectOverlap(player, c)) {
      coinCount++;
      coins.splice(i, 1);
    }
  }

  // Spikes (instant death)
  for (let sp of spikes) {
    image(imgSpike, sp.x, sp.y, sp.w, sp.h);
    if (rectOverlap(player, sp)) {
      state = "GAMEOVER"; // instant death
    }
  }

  // Snakes patrol
  for (let s of snakes) {
    s.x += s.dir * snakeSpeed;
    if (s.x < s.minX) s.dir = 1;
    if (s.x > s.maxX) s.dir = -1;
    image(imgSnake, s.x, s.y, s.w, s.h);
    if (!isInvulnerable() && rectOverlap(player, s)) {
      playerHit();
    }
  }

  // Boulder spawning
  frameSinceLastBoulder++;
  if (frameSinceLastBoulder > boulderIntervalFrames) {
    if (random() < 0.5) spawnBoulder();
    frameSinceLastBoulder = 0;
  }

  // Boulder movement
  for (let i = boulders.length - 1; i >= 0; i--) {
    let b = boulders[i];
    b.vy += gravity * 0.4;
    b.y += b.vy;
    image(imgBoulder, b.x, b.y, b.w, b.h);

    // Remove if hit ground
    if (b.y + b.h >= height - tileSize) {
      boulders.splice(i, 1);
      continue;
    }

    // Safe under platform check: if any platform is above player, boulder can't hit
    let safeUnderPlatform = platforms.some(p => player.x + player.w > p.x && player.x < p.x + p.w && p.y <= player.y);

    if (!safeUnderPlatform && !isInvulnerable() && rectOverlap(player, b)) {
      playerHit();
      boulders.splice(i, 1);
    }
  }

  // Player physics
  player.vy += gravity;
  player.y += player.vy;
  player.onGround = false;

  // Platform collisions
  for (let p of platforms) {
    if (player.x + player.w > p.x && player.x < p.x + p.w) {
      if (player.y + player.h > p.y && player.y + player.h < p.y + 22 && player.vy >= 0) {
        player.y = p.y - player.h;
        player.vy = 0;
        player.onGround = true;
        player.jumpsUsed = 0;
      }
      if (player.y < p.y + p.h && player.y > p.y && player.vy < 0) {
        player.y = p.y + p.h;
        player.vy = 0;
      }
    }
  }

  // Keep player inside level bounds
  let levelWidthPx = levelMap[0].length * tileSize;
  player.x = constrain(player.x, 4, levelWidthPx - player.w - 4);

  // Draw player
  image(imgExplorer, player.x, player.y, player.w, player.h);

  // car / Win condition
  if (car && car.active) {
    image(imgCar, car.x, car.y, car.w, car.h);
    if (rectOverlap(player, car) && !isInvulnerable()) {
      state = "WIN";
    }
  }

  pop();

  // (hearts + coins)
  for (let i = 0; i < hearts; i++) {
    image(imgHeart, 12 + i * 40, 12, 32, 32);
  }
  image(imgCoin, 12, 56, 28, 28);
  fill(255);
  textSize(20);
  text(" x " + coinCount, 52, 76);

  // Reduce invulnerability timer if active
  if (invulnTimer > 0) invulnTimer--;
}

function keyPressed() {
  if (state === "TITLE") {
    if (keyCode === ENTER || keyCode === 32) {
      state = "PLAY";
      player.x = tileSize * 1.5;
      player.y = height - tileSize * 4;
      player.vy = 0;
      hearts = 3; coinCount = 0;
      invulnTimer = 0;
    }
    return;
  }
  // Restart from Game Over / Win
  if (state === "GAMEOVER" || state === "WIN") {
    if (key === 'r' || key === 'R') {
      initLevel();
      state = "PLAY";
    }
    return;
  }
  // Jump + double jump
  if (state === "PLAY") {
    if (keyCode === UP_ARROW) {
      if (player.onGround) {
        player.vy = jumpPower;
        player.jumpsUsed = 1;
      } else if ((player.jumpsUsed || 0) < 2) {
        player.vy = doubleJumpPower;
        player.jumpsUsed = (player.jumpsUsed || 0) + 1;
      }
    }
  }
}

function mousePressed() {
  // Start game from title with mouse click
  if (state === "TITLE") {
    state = "PLAY";
    player.x = tileSize * 1.5;
    player.y = height - tileSize * 4;
  }
}

function updatePlayerHorizontal() {
  if (state !== "PLAY") return;
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= playerSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += playerSpeed;
  }
}

// Rectangle collision detection
function rectOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
    a.y < b.y + b.h && a.y + a.h > b.y;
}

function isInvulnerable() {
  return invulnTimer > 0;
}

// Reduce heart + knockback on hit
function playerHit() {
  hearts--;
  invulnTimer = invulnFramesAfterHit;
  player.x -= tileSize * 2;
  if (hearts <= 0) {
    state = "GAMEOVER";
  }
}

// Spawn boulders above player
function spawnBoulder() {
  let bx = player.x + random(-200, 200);
  bx = constrain(bx, 0, (levelMap[0].length * tileSize) - tileSize);
  boulders.push({ x: bx, y: 0, w: 40, h: 40, vy: boulderFallSpeed });
}

// Title screen
function drawTitle() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("Jungle Escape", width / 2, height / 2 - 60);
  textSize(24);
  text("Press ENTER or click to Start", width / 2, height / 2 + 20);
  textSize(20);
  text("Use arrow keys, double tap up arrow for double jump", width / 2, height / 2 + 50);
}

// Game Over screen
function drawGameOver() {
  fill(255, 50, 50);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(24);
  text("Press R to Restart", width / 2, height / 2 + 20);
}

// Win screen (shows coins collected)
function drawWin() {
  fill(50, 255, 50);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("You Escaped!", width / 2, height / 2 - 40);
  textSize(24);
  text("Coins Collected: " + coinCount, width / 2, height / 2 + 10);
  text("Press R to Play Again", width / 2, height / 2 + 50);
}