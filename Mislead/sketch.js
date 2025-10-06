new Q5();

let player;

function setup() {
	new Canvas(1000, 1000);
	world.gravity.y = 10;
	allSprites.pixelPerfect = true;

	//sprites and tiles
	player = new Sprite(500,700,50,50);
	player.img = 'assets/sadboy.png';

	//the singular moving platform
	platform = new Sprite(1520, 700, 80, 50, KIN);
	platform.img = 'assets/tilee.png';

	bricks = new Group();
	bricks.w = 80;
	bricks.h = 50;
	bricks.img = 'assets/tilee.png'
	bricks.tile = '=';
	bricks.physics = STA;

	//the two conveyers
	conveyerl = new Group();
	conveyerl.img = 'assets/conveyerright.png';
	conveyerl.w = 80;
	conveyerl.h = 50;
	conveyerl.tile = 'l';
	conveyerl.physics = STA;

	conveyerr = new Group();
	conveyerr.img = 'assets/conveyerleft.png';
	conveyerr.w = 80;
	conveyerr.h = 50;
	conveyerr.tile = 'r';
	conveyerr.physics = STA;

	winpad = new Group();
	winpad.color = 'white'
	winpad.w = 80;
	winpad.h = 50;
	winpad.tile = '!'
	winpad.physics = STA;

	player.friction = 0.5;

	//tower level
	tilesGroup = new Tiles(
		[
			'=..............=',
			'=..!!..........=',
			'=.....====.....=',
			'=...........lll=',
			'=..............=',
			'=.....rr====...=',
			'=..............=',
			'=====..........=',
			'=.....llllll...=',
			'=...........=..=',
			'=..............=',
			'=..............=',
			'=..............=',
			'=..........rrr.=',
			'=........=.....=',
			'=.....===......=',
			'=====..........=',
			'=..............=',
			'=..............=',
			'================',
		],
		400, 200,
		bricks.w, bricks.h


	)

}

//custom functions
function characterMove() {
	if (kb.pressing('right')){
		player.vel.x = 3;
	} else if (kb.pressing('left')){
		player.vel.x = -3;
	}
	
	if (kb.presses('up')||kb.presses('space')){
		player.vel.y = -6;
	}
}

function boost1(player, conveyerl) {
	player.vel.x = -6;
}

function boost2(player, conveyerr) {
	player.vel.x = 6;
}

//actual functions
function update() {
	background('black');
	noStroke();

	characterMove();

	player.collides(conveyerl, boost1);
	player.collides(conveyerr, boost2);

	platform.vel.y = cos(frameCount * 2.2) * 4;
}

function drawFrame() {
	camera.x = player.x;
	camera.y = player.y;

}