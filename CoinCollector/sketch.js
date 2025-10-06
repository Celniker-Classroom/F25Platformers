new Q5();


//Define vairables

let player, playerImg, playerLeftImg;

let tutorialCoin, tutorialJump, tutorialButton;

let startButton, resetButton;

// TILES

let tilesGroup, tilesGroupBack;

let coins, coinImg;

let dirt, grass, grassImg;

let water;
let waves, waveImg;

let bricks, brickImg;

let buttons, buttonUnpressedImg, buttonPressedImg;
let buttonsPressed;

let spikes, spikeImg;


// OTHER VARIABLES

//Makes it so the player can't fly
//By delaying the jump
let canJump;

// Detects if the player is in water
let diving;

// Coin counter
let coinsCollected;

// Lives counter
let lives;

// Which Level
let level;

//Makes it so you can't lose 2 lives at once
let iFrames = 0;

// If you've lost the game
let lost;

// If you've won the game
let won;


// Game States
let startscreen;
let gameplay;

function preload(){
	playerImg = loadImage('Images/BigPlayer.png');
	playerLeftImg = loadImage('Images/BigPlayerLeft.png');
    grassImg = loadImage('Images/Grass.png');
    coinImg = loadImage('Images/Coin.png');
    waveImg = loadImage('Images/Wave.png');
	buttonUnpressedImg = loadImage('Images/ButtonUnpressed.png');
	buttonPressedImg = loadImage('Images/ButtonPressed.png');
    brickImg = loadImage('Images/Brick.png');
	spikeImg = loadImage('Images/Spike.png');
}

function setup(){

	new Canvas(600,500);
	
	// Set Framerate
	frameRate(60);

	diving = 0;
	canJump = 0;
	coinsCollected = 0;
	lives = 3;
	lost = false;
	won = false;
	level = 1;
	buttonsPressed = 0;

	// SPRITE CREATION
	player = new Sprite();
	player.y = 300;
	player.x = 60;

	player.w = 30;
	player.h = 40;

	player.bounciness = 0;
	
	player.img = playerImg;

	// Player is on top
	player.layer = 3;

	// Tutorial sprites
	tutorialCoin = new Sprite();
	tutorialCoin.color = 'white';
	tutorialCoin.x = 330;
	tutorialCoin.y = 130;
	tutorialCoin.w = 230;
	tutorialCoin.h = 25;
	tutorialCoin.textSize = 12;
	tutorialCoin.text = "Collect  all 40 coins to go to the next level!";
	tutorialCoin.physics = 'none';

	
	tutorialButton = new Sprite();
	tutorialButton.color = 'skyblue';
	tutorialButton.stroke = 'skyblue';
	tutorialButton.x = 60;
	tutorialButton.y = 150;
	tutorialButton.w = 220;
	tutorialButton.h = 25;
	tutorialButton.textSize = 9;
	tutorialButton.text = "I wonder what this does...";
	tutorialButton.physics = 'none';
	tutorialButton.layer = 0;
	
	tutorialJump = new Sprite();
	tutorialJump.color = 'skyblue';
	tutorialJump.stroke = 'skyblue';
	tutorialJump.x = 1000;
	tutorialJump.y = 150;
	tutorialJump.w = 220;
	tutorialJump.h = 25;
	tutorialJump.textSize = 9;
	tutorialJump.text = "Trying jumping after walking off";
	tutorialJump.physics = 'none';
	tutorialJump.layer = 0;

	// Start Button
	startButton = new Sprite();
	startButton.color = 'green';
	startButton.textSize = 20;
	startButton.text = "Start";
	startButton.physics = STATIC;

	// Reset Button
	resetButton = new Sprite();
	resetButton.color = 'green';
	resetButton.w = 60;
	resetButton.y = halfHeight + 50;
	resetButton.textSize = 20;
	resetButton.text = "Reset";
	resetButton.physics = 'none';
	resetButton.visible = false;

	// TILES
	coins = new Group();
    coins.w = 16;
    coins.h = 16;
    coinImg.resize(32, 32);
    coins.img = coinImg;
    coins.tile = 'c';

	coins.collider = STATIC;




    dirt = new Group();
    dirt.w = 16;
    dirt.h = 16;
    dirt.color = '#582800';
    dirt.tile = 'd';

	dirt.bounciness = 0;

	dirt.collider = STATIC;
   


    grass = new Group();
    grass.w = 16;
    grass.h = 16;
	grassImg.resize(32, 32);
    grass.img = grassImg;
    grass.tile = 'g';

	grass.bounciness = 0;

	grass.collider = STATIC;



    water = new Group();
    water.w = 16;
    water.h = 16;
    water.color = 'blue';
    water.tile = 'w';
	water.layer = 0;
	water.collider = STATIC;

	water.layer = 0;

	waves = new Group();
    waves.w = 5;
    waves.h = 5;
    waveImg.resize(32, 32);
    waves.img = waveImg;
    waves.tile = 't';
	waves.collider = STATIC;

	waves.layer = 0;

	buttons = new Group();
    buttons.w = 16;
    buttons.h = 16;
    buttonUnpressedImg.resize(32, 32);
    buttonPressedImg.resize(32, 32);
    buttons.img = buttonUnpressedImg;
    buttons.tile = 'o';
	buttons.collider = STATIC;

	buttons.layer = 0;


	bricks = new Group();
    bricks.w = 16;
    bricks.h = 16;
    brickImg.resize(32, 32);
    bricks.img = brickImg;
    bricks.tile = 'r';
	bricks.bounciness = 0;

	bricks.collider = 'none';
	bricks.visible = false;

	spikes = new Group();
    spikes.w = 8;
    spikes.h = 8;
    spikeImg.resize(32, 32);
    spikes.img = spikeImg;
    spikes.tile = 's';
	spikes.bounciness = 0;

	spikes.collider = 'none';

	
	// OVERLAP INTERACTIONS

	// The player can collet coins
	player.overlaps(coins, collectCoin);

	// The player can dive
	player.overlapping(water, dive);
	player.overlapping(waves, dive);

	// The player can press buttons
	player.overlapping(buttons, press);

	// The player can die on spikes
	player.overlapping(spikes, death);


    tilesGroup = new Tiles(
        [
            '............................ccc....................................',
            '..................................................................s',
            '.....................................ccc..........................d',
            '............s...................r....ccc..........................s',
            '....o.......d................................cc...................d',
            '....d........................................cc...................s',
            '........................c.............d.............cc............d',
            '........cc.......cc.....c.............c......r....................s',
            '........cc...cc............d..........c...........r........cc.....d',
            '........dd...cc......d............................................s',
            '.............dd.................c..........................rr.....d',
            '......cc........................d.......................cc........s',
            '.cc...............................................................d',
            '.cc..gggg.....ssss.r....................................rr........s',
            'gggggddddgggggggggggggttttttttttttttttttttttttttttttttttttttttttttd',
            'ddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'dddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwrrwwwwwwwwwwwwwwd',
            'ddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'dddddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'ddddddddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'dddddddddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'ddddddddddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
        ],
        0,
        100,
        17,
        17
    );

	// Game States
	startscreen = true;
	gameplay = false;


}

function update() {

	if (startscreen){
		background('white');
		toggleVisible(false);
		if ((startButton.mouse.presses())){
			startscreen = false;
			gameplay = true;
			startButton.visible = false;
			startButton.physics = 'none';
			player.y = 300;
			player.x = 60;
			toggleVisible(true);
		}
	}
	if (gameplay){
		backgroundupdate();
		variablecheck();
		playermove();

		// For Testing Purposes
		//if (player.mouse.presses()){
		//	coinsCollected += 20;
		//}
	}
	
	if (won || lost){
		toggleVisible(false);
		tilesGroup.remove();
		resetButton.visible = true;
		resetButton.physics = STATIC;
		if ((resetButton.mouse.presses())){
			startscreen = true;
			gameplay = false;
			resetButton.visible = false;
			resetButton.physics = 'none';
			reset();
		}
	}
	
	
}


// Coin collection function
function collectCoin(myPlayer, coinCol){
	coinCol.remove();
	coinsCollected += 1;
}

// Diving function
function dive(player, water){
	diving = 10;
}

// Button pressing function
function press(player, button){
	if (button.img == buttonUnpressedImg){
		button.img = buttonPressedImg;
		buttonsPressed += 1;
	}
}

// Death function
function death(player, deathCauser){
	player.y = 300;
	player.x = 60;
	player.vel.y = 0;

	if (iFrames == 0 & !lost & !won){
		lives -= 1;
		iFrames = 5;
	}
}

function lose(){
	// Making everything else invisible
	player.visible = false;
	tilesGroup.visible = false;
	tilesGroup.remove();
	lost = true;
	lives = 0;
	if (level == 3){
		tilesGroupBack.remove();
	}
}

function win(){
	// Making everything else invisible
	player.visible = false;
	tilesGroup.visible = false;
	tilesGroup.remove();
	won = true;
	coinsCollected = 999;
	if (level == 4){
		tilesGroupBack.remove();
	}
}

function levelup(lv){
	tilesGroup.remove();
	if (level == 2){
		tilesGroup = new Tiles(
        	[
        	    '...................................................................',
        	    '............................cc....................................s',
        	    '...........................rcc.....................c..............d',
        	    '.........c..................r..............c.......c.........cc...s',
        	    '.........c.........c.......................c.......r.........cc...d',
        	    '.........r.........c...........ss..........r..................r...s',
        	    '...................r...........rrr............................rr..d',
        	    '..........c....................ccc............................r...s',
        	    '..........c....................ccc............................r...d',
        	    '..........r....................rrr............................r...s',
        	    '..........s...................................................rr..d',
        	    '..........d....................sss............................r...s',
        	    '...............................sss............................r.ccd',
        	    '........r...r..................sss............................r.ccs',
        	    '........ggggggggggggggg...ggggggggggggggg...ggggggggggggggggggggggg',
        	    '.......rddddddddddddddd...ddddddddddddddd...ddddddddddddddddddddddd',
        	    '........ddddddddddddddd...ddddddddddddddd...ddddddddddddddddddddddd',
        	    'dddd....dddddddd............................ddddddddddddddddddddddd',
        	    'dddd....dddddddd............................ddddddddddddddddddddddd',
        	    'ddddr...dddddddd............................ddddddddddddddddddddddd',
        	    'dddd..........ccccddddddddddddddddddddddddddddddddddddddddddddddddd',
        	    'dddd..........ccccddddddddddddddddddddddddddddddddddddddddddddddddd',
        	    'dddd..........ccccodddddddddddddddddddddddddddddddddddddddddddddddd',
        	    'dddddddddddddd....ddddddddddddddddddddddddddddddddddddddddddddddddd',
        	    'dddddddddddddd...rddddddddddddddddddddddddddddddddddddddddddddddddd'
        	],
        	0,
        	100,
        	17,
        	17
    	);
	}


	if (level == 3){
		tilesGroupBack = new Tiles(
        	[
        	    '...................................................................',
        	    '...................................................................',
        	    '...................................................................',
        	    '...................................................................',
        	    '...................................................................',
        	    'ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        	    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
        	],
        	0,
        	100,
        	17,
        	17
    	);
		
		tilesGroup = new Tiles(
        	[
        	    '...................................c......c.......c.......c........',
        	    '...................................c......c.......c.......c........',
        	    '...................................c......c.......c.......c........',
        	    '...................................................................',
        	    '...................................................................',
        	    '...................................r......r.......r.......r........',
        	    '...........c.......................r......r.......r.......r........',
        	    '...........c.......................r......r.......r.......r........',
        	    '...........s...............cccc....r......r.......r.......r........',
        	    '.........ddddd.............cccc....rr.....r.......r.......r...c....',
        	    '......c....................cccc....r..c.......c.......c.......c....',
        	    '......c...................scccc....r..c.......c.......c.......o....',
        	    '......s...................ddddd....r..d.......d.......d.......d....',
        	    'ddddddd............................r...............................',
        	    '.................................................................r.',
        	    '...................................................................',
        	    '................................................................r..',
        	    '...................................................................',
        	    '...................................................................',
        	    '....................................................r.......r......',
        	    '...........................................r.......................',
        	    '...................................r...............................',
        	    '...................................................................',
        	    '...................................................................',
        	    '...................................................................',
        	],
        	0,
        	100,
        	17,
        	17
    	);
	}
	
	player.y = 300;
	player.x = 60;
}

function backgroundupdate(){
	
	// BACKGROUND INTERACTIONS (background, gravity, camera)
	if (diving>0){
		// Gradually changes the sky back to normal
		background(100 - 20 * diving, 200 - 40 * diving, 235 + 4 * diving);
		//tutorialButton.color = 0, 255, 0;
		//tutorialJump.color = 100 - 20 * diving, 200 - 40 * diving, 235 + 4 * diving;
		if (diving == 10){
			//Low Gravity only when in water
			world.gravity.y = 7;
		}
		diving -= 1;
	} else {
		// Normal Background and gravity
		background(135, 206, 235);
		tutorialButton.color = 'skyblue';
		tutorialJump.color = 'skyblue';
		world.gravity.y = 10;
	}
	

	// Camera follows player
	camera.x = halfWidth;
	if (player.x > halfWidth){
		camera.x = player.x;
	}
}

function variablecheck(){
	
	// VARIABLES (diving is in background interactions)

	// Bricks show when a button is pressed
	if (buttonsPressed > 0){
		bricks.visible = true;
		bricks.collider = STATIC;
		bricks.bounciness = 0;
	} else {
		bricks.visible = false;
		bricks.collider = 'none';
	}

	if (lives < 0){
		lose();
	}
	if (level > 3){
		win();
	}

	if (lost){
		textAlign(CENTER);
		textSize(100);
		text("YOU LOSE",halfWidth,halfHeight);
	}

	if (won){
		textAlign(CENTER);
		textSize(100);
		text("YOU WON!!!",halfWidth,halfHeight);
	}

	if (iFrames > 0){
		iFrames -= 1;
	}



	if (coinsCollected == 40){
		buttonsPressed = 0;
		coinsCollected = 0;
		lives += 1;
		level += 1;
		levelup(level);
	}

	if (player.y > 1000){
		death(player, player);
	}


	// Coin Counter (is blocked by the p5play bar in vscode)
	textAlign(CENTER);
	textSize(20);
	text("Coins: " + coinsCollected, 530, 50);

	// Life counter
	text("Lives: " + lives, 530, 80);

	if (level != 4){  // You've won at level 4
		// Level counter
		text("Level: " + level, 70, 50);
	}

	//Tutorial Instructions

	if (level == 1){
		tutorialCoin.visible = true;
		tutorialButton.visible = true;
	} else {
		tutorialCoin.visible = false;
		tutorialButton.visible = false;
		tutorialJump.visible = false;
	}
}

function playermove(){
	
	// PLAYER MOVEMENT

	// Prevents the player from jumping on air
	if (kb.arrowUp && canJump == 0) {
		player.vel.y = -5;
		canJump = 2;
	}
	// They have to have 0 y veloity for 2 frames
	if (player.vel.y == 0 && canJump != 0){
		canJump -= 1;
	}

	
	if (kb.arrowLeft && player.x>0) {
		player.x += -2;
		player.img = playerLeftImg;
	}
	//Prevents falling off from the left
	if (player.x <0){
		player.x = 0;
	}

	if (kb.arrowRight) {
		player.x += 2;
		player.img = playerImg;
	}

	// The player shouldn't fall over
	player.rotationSpeed = 0;
	player.rotation = 0;
	player.vel.x = 0;
}

// Toggles Everything's Visibility
function toggleVisible(tf){
	tilesGroup.visible = tf;
	player.visible = tf;
	tutorialButton.visible = tf;
	tutorialCoin.visible = tf;
	tutorialJump.visible = tf;
}

function reset(){
	

	diving = 0;
	canJump = 0;
	coinsCollected = 0;
	lives = 3;
	lost = false;
	won = false;
	level = 1;
	buttonsPressed = 0;
	
    tilesGroup = new Tiles(
        [
            '............................ccc....................................',
            '..................................................................s',
            '.....................................ccc..........................d',
            '............s...................r....ccc..........................s',
            '....o.......d................................cc...................d',
            '....d........................................cc...................s',
            '........................c.............d.............cc............d',
            '........cc.......cc.....c.............c......r....................s',
            '........cc...cc............d..........c...........r........cc.....d',
            '........dd...cc......d............................................s',
            '.............dd.................c..........................rr.....d',
            '......cc........................d.......................cc........s',
            '.cc...............................................................d',
            '.cc..gggg.....ssss.r....................................rr........s',
            'gggggddddgggggggggggggttttttttttttttttttttttttttttttttttttttttttttd',
            'ddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'dddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwrrwwwwwwwwwwwwwwd',
            'ddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'dddddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'ddddddddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'dddddddddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'ddddddddddddddddddddddddddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd',
            'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            'ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
        ],
        0,
        100,
        17,
        17
    );

	// Game States
	startscreen = true;
	gameplay = false;

	
	startButton.visible = true;
	startButton.physics = STATIC;

	
	bricks.collider = 'none';
	bricks.visible = false;
}