new Q5();

//variables
let player, platforms, textInfo;
//

function preload(){
	//background setup
	nightsky = loadImage("assets/jumping-the-stars_background.png");
}

function setup() {
	//canvas
	new Canvas(700, 800);
	//

	// start text
	textInfo = 'Press SPACE To START!'
	text(textInfo, halfWidth, 200);
	textSize(20);
	//
	
	//gravity
	world.gravity.y = 10;
	//

	//sprites
	player = new Sprite
	player.x = halfWidth;
	player.y = 7745;
	// player.bounciness = 1;
	//

	//starter platform
	start = new Sprite(halfWidth, 7750, 120, 25, STATIC);
	//

	//platforms
	platforms = new Group();
	platforms.physics = STATIC;
	platforms.w = 100;
	platforms.h = 10;
	platforms.tile = '=';

	tilesGroup = new Tiles(
		[
			'..=..',
			'.=...',
			'=..=.',
			'.=..=',
			'=.=..',
			'.=...',
			'..=..',
			'.=..=',
			'...=.',
			'.=..=',
			'..=..',
			'=...=',
			'..=..',
			'.=...',
			'...=.',
			'....=',
			'..=..',
			'=....',
			'..=..',
			'.=...',
			'=..=.',
			'.=..=',
			'=.=..',
			'.=...',
			'..=..',
			'.=..=',
			'...=.',
			'.=..=',
			'..=..',
			'=...=',
			'..=..',
			'.=...',
			'...=.',
			'....=',
			'..=..',
			'=....'
		],
		150, 100,
		platforms.w + 15, platforms.h + 200
	);
	//
}

function update() {
	//background
	clear();
	background(nightsky)
	//

	// text
	text(textInfo, halfWidth, 200);
	textSize(20);
	//

	//start!
	if (kb.pressing('space')) {
		textInfo = '';
		player.vel.y = -10
	}
	//
	
	//player movement
	if (kb.pressing('left')) {
		player.vel.x = -3;
	} else if (kb.pressing('right')) {
		player.vel.x = 3;
	} else {
		player.vel.x = 0;
	}
	//
}

function drawFrame() {
	//stops the player from spinning
	player.rotation = 0;
	//

	//the camera follows the player
	camera.y = player.y
	//

	// makes the player jump the stars
	if (player.collided(platforms)) {
		player.vel.y = -10;
	}
	//
}