let soil, soilImg, grass, grassImg, player, meat, coin, coinImg, playerImg, luffyImg, spikes, finishBlock, finished;
let jumps = 1;
//jump count
function preload() {
	soilImg = loadImage('Images/Dirt.png');
	grassImg = loadImage('Images/grass.png');
	coinImg = loadImage('Images/Coin3.png');
	playerImg = loadImage('Images/Luffy.png');
	luffyImg = loadImage('Images/Luffy2.png');
}
//images of tiles and player
function setup() {
	world.gravity.y = 14;
	new Canvas(1000, 800);
//setup
	grass = new Group();
	grass.w = 20;
	grass.h = 20;
	grass.img = grassImg;
	grassImg.resize(40, 40);
	grass.tile = 'g';
	grass.physics = STATIC;
//grass tile properties
	soil = new Group();
	soil.w = 20;
	soil.h = 20;
	soil.img = soilImg;
	soilImg.resize(40, 40);
	soil.tile = '=';
	soil.physics = STATIC;
//soil tile properties

	player = new Sprite();
	playerImg.resize = (100, 80);
	player.x = 50;
	player.w = 20;
	player.h = 50;
	player.rotationLock = true;
	player.collider = DYNAMIC;
	player.img = playerImg;
//player sprite properties

	meat = new Group();
	meat.w = 40;
	meat.h = 40;
	meat.tile = 'm';
	meat.image = '🍖';
//the properties of meat that you need to collect

	spikes = new Group();
	spikes.w = 20;
	spikes.h = 20;
	spikes.tile = 's';
	spikes.color = 'red';
	spikes.physics = STATIC;
//properties of spikes group
	finishBlock = new Group();
	finishBlock.w = 20;
	finishBlock.h = 20;
	finishBlock.color = 'blue';
	finishBlock.tile = 'f';
	finishBlock.physics = STATIC;
//blocks that finish the game
	tilesGroup = new Tiles(
		[
			'.......................................................m.....................................................................................................................................m...............sss....sss',
			'..................................................ggggggggggg..............................................................................................................................ggggg.............ggg.mm.ggg',
			'.........................m........................===========................................................................................................................ggg...........sssss.............==========.......',
			'.....................ggggggggg.....................................................................m.........................................................mm..............sss............................................................mm....',
			'.....................=========..............................................mm.................gggggggggg...............................................sssggggggsss......................................................................ssggss.................................',
			'........................................................................ssssggssss.............ssssssssss...............................................ssssssssssss......................................................................ssssss.......................ssssssssss',
			'........................................................................ssssggssss...................................................................................................................................gggggggg..........................................ssssssssss',
			'.....................................................................................................................................................................................................................ssssssss..........................................ssssssssss',
			'.....................................................................................................................................................................................................................ssssssss..........................................ssssssssss',
			'ggggggggggggggggggggggggggggggggggggggssssssssssssssggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg.......gggggssssssssssssssssssggggggggggggggggggggggggggggggggggggggggggggggggg.......ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggssssssssssffffff',
			'ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg.......gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg.......ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggssssssssssffffff',
			'===============================================================================================================.......========================================================================.......==================================================================================',
			'===============================================================================================================.......========================================================================ss.m.ss==================================================================================',
			'===============================================================================================================ss.m.ss=================================================================================================================================================================',
			'=======================================================================================================================================================================================================================================================================================',
			'======================================================================================================================================================================================================================================================================================='

		],
		0,
		500,
		soil.w,
		soil.h


	);
}
//really long tiles group

function draw() {
	background(52, 192, 300);
	fill(0);
	textSize(20);
	text('AD to move, W to jump. Collect all the meat for Luffy and reach the end!!', 150, 100)
	luffyImg.resize(100, 100);
	characterMove();
	spikeTouched();
	finishing();
	imageChange();
	camera.x = player.x;
	camera.y = player.y;
	player.overlaps(meat, collectMeat);
}
//draw function that named my user created funtions and codes of camera
function characterMove() {
	if (kb.pressing('a')) {
		player.vel.x = -5;
	} else if (kb.pressing('d')) {
		player.vel.x = 5;
	} else {
		player.vel.x = 0;
	}
	if (player.colliding(grass) || player.colliding(soil)) {
		jumps = 1
		if (kb.presses('w')) {
			player.vel.y = -6;
		}
	} else {
		if (kb.presses('w') && jumps > 0) {
			player.vel.y = -6;
			jumps--;
		}
	}
}
//user created functions that make the character move and allow it to only double jump
function imageChange() {
	if (meat.length == 0) {
		player.img = luffyImg;
	}
}
//user created function of the change of appearance of player when collect all the meat
function collectMeat(player, meat) {
	meat.remove();
}
//user created function of collecting meat
function spikeTouched() {
	if (player.collides(spikes)) {
		player.x = 0;
		player.y = 600;
	}
}
//user created function of spikes that make you go back to the start
function finishing() {
	if (meat.length == 0 && player.colliding(finishBlock)) {
		finished = true;

	}
	if (finished) {

		fill(0);
		textSize(50);
		text('You Reached the End!', 400, 200);
	}

}
//user created function to see if you collect all the meat and reach the end
