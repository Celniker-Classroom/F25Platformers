let grass, grassImg, dirt, dirtImg, dynaPlatform, dynamicPlatformImg, spikeUp, 
spikeUpImg, exit, exitImg, player, j, points, coin, reset;

function preload() {
	grassImg = loadImage('images/grass1.png');
	dirtImg = loadImage('images/dirt1.png');
	dynamicPlatformImg = loadImage('images/dynaplat1.png')
	spikeUpImg = loadImage('images/spikeUp1.png')
	exitImg = loadImage('images/exit1.png')
}

//Vertical Ragebait

function setup() {
	new Canvas(1000, 2000);
	world.gravity.y = 2.45
	reset = 200
	//Creates Player
	player = new Sprite();
	player.x = 100
	player.y = reset
	player.w = 32
	player.h = 32
	player.physics = DYN
	player.color = color('white')
	player.rotationLock = true
	player.mass = 1
	player.bounciness = 0

	points = 0
	
	//creates the world
	
	//normal platform
    platform = new Group();
    platform.w = 64;
    platform.h = 64;
    platform.stroke = "grey"
    platform.color = color('grey');
    platform.tile = 'p';
	platform.physics = STA
	

	//dynamic platform (only when collided for over 10 frames)
    dynamicPlatform = new Group();
	dynamicPlatform.w = 40;
	dynamicPlatform.h = 30;
	dynamicPlatform.img = dynamicPlatformImg
	dynamicPlatformImg.resize(128.0001, 128.0001)
	dynamicPlatform.tile = 'd';
	dynamicPlatform.physics = STA

	//Spike, doesn't do anything yet but exist
	spikeUp = new Group();
	spikeUp.w = 64;
	spikeUp.h = 64;
	spikeUp.img = spikeUpImg
	spikeUpImg.resize(128.0001, 128.0001)
	spikeUp.tile = 'k';
	spikeUp.physics = STA

	//dirt
    dirt = new Group();
	dirt.w = 64;
	dirt.h = 64;
	dirt.img = dirtImg
	dirtImg.resize(128.0001, 128.0001)
	dirt.tile = 's';
	dirt.physics = STA

	//grass
    grass = new Group();
	grass.w = 64;
	grass.h = 64;
	grass.img = grassImg
	grassImg.resize(128.0001, 128.0001)
	grass.tile = 'g';
	grass.physics = STA

	//VOID
    theVoid = new Group();
    theVoid.w = 64;
    theVoid.h = 64;
    theVoid.stroke = "blue"
    theVoid.color = color('blue');
    theVoid.tile = 'v';
	theVoid.physics = STA

	//halfvoid
    halfvoid = new Group();
    halfvoid.w = 64;
    halfvoid.h = 32;
    halfvoid.stroke = "blue"
    halfvoid.color = color('blue');
    halfvoid.tile = 'h';
	halfvoid.physics = STA

	//halfvoid
    thirdvoid = new Group();
    thirdvoid.w = 64;
    thirdvoid.h = 21;
    thirdvoid.stroke = "blue"
    thirdvoid.color = color('blue');
    thirdvoid.tile = 't';
	thirdvoid.physics = STA

	//coin
    coin = new Group();
    coin.d = 32;
    coin.h = 64;
    coin.stroke = "yellow"
    coin.color = color('yellow');
    coin.tile = 'c';
	coin.physics = STA
	coin.visible = true

	//exit
    exit = new Group();
	exit.w = 64;
	exit.h = 64;
	exit.img = exitImg
	exitImg.resize(128.0001, 128.0001)
	exit.tile = 'e';
	exit.physics = STA


    tilesGroup = new Tiles(
	    [
			'vvvvvvvvvvvvvvvv',
			'..........hcvvvv',
			'e......c......c.',
			'pphhhhtd....pppp',
			'h.........pvpvvv',
			'c....hd.v..ch..t',
			'phhdhv..v......c',
			'..c......phhphhp',
			'vvpvvp.c........',
            't.....vphdtdtp..',
            '.......c.......g',
		    'ghvvvhggg.p.d.ds',
		    'svvvvvsssvvvvvvs'
	    ],
			30, 120,
	    dirt.w + 0.5 , dirt.h + 0.5
    );


}

function update() {

	background('skyBlue');

	//player movement
	if (kb.pressing('a')) player.vel.x = -2.5;
	else if (kb.pressing('d')) player.vel.x = 2.5;
	else if (kb.presses('w')) player.vel.y = -2.5;
	else if (kb.presses('s')) player.vel.y = 2.5;
	else player.vel.x = 0;

	//playerchange color
	if (kb.pressing('1')) player.color = color('red');
	else if (kb.pressing('2')) player.color = color('blue');
	else player.color = color('white');


	if (player.colliding(dynamicPlatform) > 10) {
		player.overlapping(dynamicPlatform, fall);
	}

	//reset system for mistakes

	if (player.overlapping(theVoid)) {
		player.x = 50
		player.y = reset
		points = 0
	}

	if (player.overlapping(halfvoid)) {
		player.x = 50
		player.y = reset
		points = 0
	}


	if (player.overlapping(thirdvoid)) {
		player.x = 50
		player.y = reset
		points = 0
	}

	//points system
	if (player.overlapping(coin)) {
		player.overlapping(coin, collect);
	}



	//NOTE: FIX ON FRIDAY
	if (player.overlapping(exit)){
		if (points < 7){
		textSize(10);
		text("You Have To Collect All Eight Coins First!", 25,215);
		} else if (points == 8){
		textSize(50);
		text("You beat the game!", 40, 200);
		}
	}

	//text system
	fill(0, 0, 0);
	textSize(25);
	text("Points: " + points, 45, 65);

	//ADD COLOR ON FRI - done
	fill(255, 0, 0); // RGB values for red
	textSize(35);
	text("Vertical Ragebait - How to make (name here) mad!", 25, 35);

function fall(player,platform) {
	platform.physics = DYN;
}

function collect(player,coin) {
	coin.delete();
	points ++
}

}