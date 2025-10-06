new Q5();
let ropes, ropesImg, rocks, rocksImg, flagImg, icyRocks, icyRocksImg, camies, camiesImg, player, playerImg;
let ropeAmount = 1;

function preload() {//gets all my pixel art
	playerImg = loadImage('images/player.png')
	ropesImg = loadImage('images/ropecoil.png')
	flagImg = loadImage('images/flag.png')
	icyRocksImg = loadImage('images/ice.png')
	rocksImg = loadImage('images/rock2.png')

}
function setup() {
	new Canvas(576, 576);
	world.gravity.y = 10

	let ropes = new Group();
	ropes.diameter = 16;
	//bricks.color = 'blue'
	ropes.tile = 'r';
	ropes.image = ropesImg
	ropesImg.resize(64, 64)
	//ropes.physics = KIN;

	let rocks = new Group();
	rocks.w = 32;
	rocks.h = 32;
	rocks.color = 'grey';
	rocks.physics = STATIC;
	rocks.friction = 10;
	rocks.tile = '='
	rocks.image = rocksImg
	rocksImg.resize(64, 64)

	let icyRocks = new Group();
	icyRocks.w = 32;
	icyRocks.h = 32;
	icyRocks.color = 'lightblue';
	icyRocks.physics = STATIC;
	icyRocks.friction = 0;//makes it slidyt
	icyRocks.tile = '-';
	icyRocks.image = icyRocksImg
	icyRocksImg.resize(64, 64)

	let camies = new Group();
	camies.w = 4;
	camies.h = 10;
	camies.color = 'silver';
	camies.tile = 'c';
	camies.physics = STATIC

	player = new Sprite();
	player.diameter = 16;
	player.y = 1500;
	player.physics = DYN
	player.image = playerImg
	playerImg.resize(64, 64);

	//player.overlaps(ropes);
	//player.rotationDrag = 5;


	let ground = new Sprite();
	ground.h = 500
	ground.w = 700
	ground.x = 288
	ground.y = 1750
	ground.color = 'white'
	ground.physics = STATIC
	ground.friction = 10;

	let flag = new Sprite();
	flag.h = 32
	flag.w = 8
	flag.x = 80
	flag.y = 32
	flag.image = flagImg;
	flagImg.resize(64, 64)
	flag.physics = NONE;




	tilesGroup = new Tiles( //world
		[
			'=..=..............=',
			'=..===...........r.=',
			'=..====......==..=.=',
			'=.........--.......=',
			'=......=......r...==',
			'=.==.....=---===...=',
			'=....--...........==',
			'=r...........r.==..=',
			'===.....=.--.=.....=',
			'=....=.............=',
			'=.....=............=',
			'=r......-----...r..=',
			'===.............==.=',
			'=.......r.....-....=',
			'=..r-.-.-.-.-......=',
			'=c.=..............r=',
			'==............==...=',
			'====......==......==',
			'=....-=-.r.......===',
			'=.r......-......==.=',
			'===..........=.....=',
			'=..=.....---.......=',
			'=.....==...........=',
			'=...=..............=',
			'=..=...............=',
			'=-.....c.....r.....=',
			'=--...===...===....=',
			'=..............=...=',
			'=................=.=',
			'=...............-..=',
			'=.............==...=',
			'=.==..=.=.=.=......=',
			'=...-..............=',
			'=.....==..r........=',
			'=..=.....--..=-=...=',
			'==..r.............==',
			'=...=..........--..=',
			'==.....=-=-=-=.....=',
			'=..==..............=',
			'=....=.............=',
			'=......--.--.--..r.=',
			'=...............==.=',
			'=..............=...=',
			'=......==..=--.....=',
			'=.==...............=',
			'=..................=',
		],
		-16,
		64,
		rocks.w,
		rocks.h
	);
	player.overlaps(ropes, ropeColect);

}
function spriteMovement() {
	if (kb.presses('up')) {
		player.velocity.y = -4;
	}
	if (kb.pressing('left')) {
		player.velocity.x = -3;
	} else if (kb.pressing('right')) {
		player.velocity.x = 3;
	} else {
		player.rotationDrag = 1 * ropeAmount;//more rope more conrtrol
	}
}
function ropeColect(ropes, player) {//
	if (player.overlaps(ropes)) {
		player.delete();
		ropeAmount += 1
	}
}
function respawn() {
	if (ropeAmount >= 9 && player.y >= 600){
		player.x = 16,
		player.y = 512,
		ropeAmount -= 1;
	} else if (ropeAmount >= 5 && player.y >= 900) {
		player.x = 224;
		player.y = 850;
		ropeAmount -= 1;
	}
}
function gameover(){
	if(player.y<= 0){
		player.physics = STATIC
		textAlign(CENTER);
		text('You Win!!', 288, 288)
	}
}


function update() {
	//code here runs once per frame
	background('lightgrey');
	spriteMovement()
	camera.y = player.y;// allows for it to be higher
	respawn();
	textAlign(LEFT);
	textSize(15);
	text('rope amount', 25, 25)
	text(ropeAmount-1, 125, 25)
	text('get to the top', 25, 50)
	gameover();

}
