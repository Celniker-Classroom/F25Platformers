new Q5();
//variables
let dirt, dirtImg, grass, grassImg, player, jamImg, spoonImg, butterKnifeImg, breadImg, butterImg, gameState;
let startBox, groundSensor, spoon, butterKnife, bread, butter, coin, j, level1, level2, coinImg, gumdropImg;
let gumdrop, jamLeftImg, jamRightImg, candyCornImg, cornSpike, badGrassImg, badGrass, lolipop, lolipopImg;
let coinCounter = 0;

//images
function preload() {
	dirtImg = loadImage('Images/Dirt.png');
	grassImg = loadImage('Images/Grass.png');
	jamImg = loadImage('Images/JamJar.png');
	spoonImg = loadImage('Images/Spoon.png');
	butterKnifeImg = loadImage('Images/ButterKnife.png');
	breadImg = loadImage('Images/Bread.png');
	butterImg = loadImage('Images/Butter.png');
	coinImg = loadImage('Images/Coin.png');
	gumdropImg = loadImage('Images/Gumdrop.png');
	jamLeftImg = loadImage('Images/JamLeft.png');
	jamRightImg = loadImage('Images/JamRight.png');
	candyCornImg = loadImage('Images/CandyCorn.png');
	badGrassImg = loadImage('Images/BadGrass.png');
	lolipopImg = loadImage('Images/Lolipop.png');
}

function setup() {
	//setup world + gamestate
	gameState = 'start';
	new Canvas(800, 600);
	world.gravity.y = 10;

	//player
	jamImg.resize(96, 96);
	player = new Sprite(-50, 400, 30, 48, STA);
	player.friction = .1;
	player.image = jamImg;

	//ground sensor
	groundSensor = new Sprite(-50, 420, 30, 20, 'n');
	groundSensor.visible = false;
	groundSensor.mass = 0.01;
	let j = new GlueJoint(player, groundSensor);
	j.visible = false;

	//click to start box
	startBox = new Sprite(400, 250, 200, 50, NONE);
	startBox.color = 'green';
	startBox.textSize = 32;
	startBox.text = 'Click to Start';
	startBox.stroke = 'black';


	//I tried to put tiles here like you said, but it only works when the tiles are setup where
	// they are right now, in the function, except for the ones below, that have special properties

	//gumdrop tiles
	gumdropImg.resize(128, 80);
	gumdrop = new Group();
	gumdrop.w = 64;
	gumdrop.h = 40;
	gumdrop.image = gumdropImg;
	gumdrop.physics = STA;
	gumdrop.tile = 'g';

	//candy corn spike tile
	candyCornImg.resize(64, 64);
	cornSpike = new Group();
	cornSpike.w = 16;
	cornSpike.h = 30;
	cornSpike.image = candyCornImg;
	cornSpike.tile = 'S';
	player.overlaps(cornSpike);
}

function update() {
	//gamestate code
	clear();
	if (gameState === 'start') {
		//start screen
		background('skyblue');
		textSize(50);
		text('Jumping Jam!', 250, 150);
		textSize(40);
		text('Info:', 10, 490);
		textSize(32);
		text('Use WASD or Arrow Keys to Move, Use R to Respawn!', 10, 532.5);
		text('Collect Coins to Progress! Collect them all to win!', 10, 575);
		//code to start next gamestate/to level one + puts the player in place
		if (mouse.presses()) {
			gameState = 'levelOne';
			startLevel(1);
			player.x = 50;
			player.y = 400;
			player.physics = DYN;
		}

		//level one code + remove some start screen elements
	} else if (gameState === 'levelOne') {
		background('skyblue');
		textSize(32);
		text('Coins: ' + coinCounter, 25, 50);
		playerMovement();
		playerRespawn();
		startBox.visible = false;
		//code to go to level two
		if (coinCounter === 1) {
			level1.remove();
			startLevel(2);
			gameState = 'levelTwo';
		}
		//level two code
	} else if (gameState === 'levelTwo') {
		background('skyblue');
		playerMovement();
		playerRespawn();
		text('Coins: ' + coinCounter, 25, 50);
		if (coinCounter === 2) {
			level2.remove();
			startLevel(3);
			gameState = 'levelThree';
		}
		//level 3
	} else if (gameState === 'levelThree') {
		background('skyblue');
		playerMovement();
		playerRespawn();
		text('Coins: ' + coinCounter, 25, 50);
		if (coinCounter === 3) {
			level3.remove();
			startLevel(4);
			gameState = 'levelFour';
		}
		// level 4
	} else if (gameState === 'levelFour') {
		background('skyblue');
		playerMovement();
		playerRespawn();
		text('Coins: ' + coinCounter, 25, 50);
		if (coinCounter === 4) {
			level4.remove();
			startLevel(5);
			gameState = 'levelFive';
		}
		//level 5
	} else if (gameState === 'levelFive') {
		background('skyblue');
		playerMovement();
		playerRespawn();
		text('Coins: ' + coinCounter, 25, 50);
		if (coinCounter === 5) {
			level5.remove();
			startLevel(6);
			gameState = 'levelSix';
		}
		//level 6
	} else if (gameState === 'levelSix') {
		background('skyblue');
		playerMovement();
		playerRespawn();
		text('Coins: ' + coinCounter, 25, 50);
		if (coinCounter === 6) {
			level6.remove();
			startLevel(7);
			gameState = 'levelSeven';
		}
		//level 7
	} else if (gameState === 'levelSeven') {
		background('skyblue');
		playerMovement();
		playerRespawn();
		text('Coins: ' + coinCounter, 25, 50);
		if (coinCounter === 7) {
			level7.remove();
			startLevel(8);
			gameState = 'levelEight';
		}
		//level 8
	} else if (gameState === 'levelEight') {
		background('skyblue');
		playerMovement();
		playerRespawn();
		text('Coins: ' + coinCounter, 25, 50);
		if (coinCounter === 8) {
			level8.remove();
			startLevel(9);
			gameState = 'levelNine';
		}
		//level 9
	} else if (gameState === 'levelNine') {
		background('skyblue');
		playerMovement();
		playerRespawn();
		text('Coins: ' + coinCounter, 25, 50);
		if (coinCounter === 9) {
			level9.remove();
			startLevel(10);
			gameState = 'levelTen';
		}
		//level 10 and you win
	} else if (gameState === 'levelTen') {
		background('skyblue');
		playerMovement();
		playerRespawn();
		textSize(32);
		text('Coins: ' + coinCounter, 25, 50);
		textSize(50);
		text('You Win!', 300, 200);
	}

}
//player movement
function playerMovement() {
	player.rotation = 0;

	if (kb.pressing('left')) {
		// Move left
		player.vel.x = -5;
		jamLeftImg.resize(96, 96);
		player.image = jamLeftImg;
	} else if (kb.pressing('right')) {
		// Move right
		player.vel.x = 5;
		jamRightImg.resize(96, 96);
		player.image = jamRightImg;
	} else {
		//stays if no input
		player.vel.x = 0;
		player.image = jamImg;
	}
	//jumping if player not in air sensor
	if (groundSensor.overlapping(gumdrop)) {
		player.vel.y = -6;
	} else if (groundSensor.overlapping(allSprites) && !groundSensor.overlapping(gumdrop) && !groundSensor.overlapping(cornSpike)) {
		//jumping
		if (kb.presses('up')) {
			player.vel.y = -5;
		}
	}
	//cheats for testing
	if (kb.presses('c')) {
		player.x = 600;
		player.y = 50;
	}

}

//player respawn
function playerRespawn() {
	if (player.overlapping(cornSpike)) {
		player.x = 50;
		player.y = 400;
	}
	//respawn if fall
	if (player.x > 200 && player.y > 450) {
		player.x = 50;
		player.y = 400;
	} else if (player.x < -30) {
		//respawn if offscreen
		player.x = 50;
		player.y = 400;
	} else if (kb.presses('r')) {
		//respawn if press "r"
		player.x = 50;
		player.y = 400;
	}
}

//coin remove + add to coin counter + player reset
function removeCoin(player, coinCollected) {
	coinCollected.remove();
	player.x = 50;
	player.y = 400;
	groundSensor.x = 50;
	groundSensor.y = 420;
	coinCounter = coinCounter + 1;
	return coinCounter;
}

//tiles
function startLevel(level) {
	//spoon tile
	spoonImg.resize(180, 180);
	spoon = new Group();
	spoon.w = 90;
	spoon.h = 15;
	spoon.physics = STA;
	spoon.rotation = 350;
	spoon.tile = 's';
	spoon.image = spoonImg;

	//ButterKnife tile
	butterKnifeImg.resize(180, 180);
	butterKnife = new Group();
	butterKnife.w = 90;
	butterKnife.h = 10;
	butterKnife.physics = STA;
	butterKnife.tile = 'b';
	butterKnife.image = butterKnifeImg;

	//bread tile
	breadImg.resize(180, 128);
	bread = new Group();
	bread.w = 80;
	bread.h = 30;
	bread.physics = STA;
	bread.tile = 'l';
	bread.image = breadImg;

	//butter tile
	butterImg.resize(180, 180);
	butter = new Group();
	butter.w = 90;
	butter.h = 30;
	butter.physics = STA;
	butter.tile = 'B';
	butter.image = butterImg;

	//coin tile
	coinImg.resize(64, 64)
	coin = new Sprite();
	coin.radius = 10;
	coin.physics = STA;
	coin.color = 'yellow';
	coin.tile = 'c';
	player.overlaps(coin, removeCoin);
	coin.image = coinImg;

	//dirt tiles
	dirtImg.resize(128, 128);
	dirt = new Group();
	dirt.w = 64;
	dirt.h = 64;
	dirt.image = dirtImg;
	dirt.physics = STA;
	dirt.tile = '=';

	//grass tiles
	grassImg.resize(128, 128);
	grass = new Group();
	grass.w = 64;
	grass.h = 64;
	grass.image = grassImg;
	grass.tile = '+';
	grass.physics = STA;

	//bad grass tile
	badGrassImg.resize(128, 128);
	badGrass = new Group();
	badGrass.w = 64;
	badGrass.h = 64;
	badGrass.image = badGrassImg;
	badGrass.tile = '-'
	badGrass.physics = STA;
	groundSensor.overlaps(allSprites);

	//lolipop tile
	lolipopImg.resize(128, 128);
	lolipop = new Group();
	lolipop.w = 32;
	lolipop.h = 64;
	lolipop.image = lolipopImg;
	lolipop.tile = 'L';
	lolipop.physics = STA;

	//level one tile setup
	if (level == 1) {
		level1 = new Tiles(
			[
				'.............',
				'.............',
				'.............',
				'...........c.',
				'...........B.',
				'........b....',
				'.....l.......',
				'..s..........',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	} else if (level == 2) {
		//level two tiles setup
		level2 = new Tiles(
			[
				'.............',
				'.............',
				'.............',
				'...........c.',
				'...........B.',
				'....s...b....',
				'.............',
				'...g.........',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	} else if (level == 3) {
		//level three tiles setup
		level3 = new Tiles(
			[
				'.............',
				'.............',
				'.............',
				'.............',
				'.............',
				'.............',
				'..S...S...c..',
				'..b.l.B.b.B..',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	} else if (level == 4) {
		//level four tiles setup
		level4 = new Tiles(
			[
				'.............',
				'.............',
				'.............',
				'.............',
				'......S....c.',
				'......b....B.',
				'.............',
				'..b.g........',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	} else if (level == 5) {
		//level five tiles setup
		level5 = new Tiles(
			[
				'.............',
				'...........c.',
				'...........B.',
				'......s......',
				'.....s.......',
				'....s........',
				'...s.........',
				'..s..........',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	} else if (level == 6) {
		//level six tiles setup
		level6 = new Tiles(
			[
				'.............',
				'.............',
				'.............',
				'............',
				'...........c.',
				'..g........s.',
				'..l..........',
				'.g.......g...',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	} else if (level == 7) {
		//level seven tiles setup
		level7 = new Tiles(
			[
				'.............',
				'.............',
				'.............',
				'..b.........',
				'..b......c...',
				'..b......B...',
				'..b..........',
				'..b..........',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	} else if (level == 8) {
		//level eight tiles setup
		level8 = new Tiles(
			[
				'.............',
				'.............',
				'.............',
				'.............',
				'.............',
				'.....S.....c.',
				'...S.l...S.B.',
				'...b.....b...',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	} else if (level == 9) {
		//level nine tiles setup
		level9 = new Tiles(
			[
				'.............',
				'.............',
				'.............',
				'.............',
				'......S....l.',
				'....S.b...Lc.',
				'..S.l....S.b.',
				'..B......b.b.',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	} else if (level == 10) {
		//level ten tiles setup or win setup
		level10 = new Tiles(
			[
				'.............',
				'.............',
				'.............',
				'.............',
				'.............',
				'.l.........B.',
				'.............',
				'....ggggggggg',
				'++++---------',
				'=============',
				'=============',
			],
			0,
			0,
			dirt.w + 0,
			dirt.h + 0,
		);
	}
}
