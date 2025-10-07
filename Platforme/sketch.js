let currentScore = 0;
let currentLives = 3;
let started=false
function preload() {
	//images
	playerImg = loadImage('images/th.png');
	playertImg = loadImage('images/th-1.png.png');
	enimieImg = loadImage('images/e.png');
	mushImg = loadImage('images/m.png');
	gtsImg = loadImage('images/gts.png');
	gtrcImg = loadImage('images/gtrc.png');
	gtlcImg = loadImage('images/gtlc.png');
	grsImg = loadImage('images/grs.png');
	glsImg = loadImage('images/gls.png');
	gbsImg = loadImage('images/gbs.png');
	gbrcImg = loadImage('images/gbrc.png');
	gblcImg = loadImage('images/gblc.png');
}
function setup() {
	//camera view
	new Canvas(800, 700);
	//grvity
	world.gravity.y = 10;
	//player
	player = new Sprite();
	player.y = 890;
	player.h = 38;
	player.image = playerImg;
	playerImg.resize(100, 80);
	player.color = 'gray'
	//ground
	ground = new Group();
	ground.w = 50;
	ground.h = 42;
	ground.tile = '*';
	ground.color = 'black'
	groundSensor = new Sprite(2, 2000, 6, 12, 'n');
	groundSensor.visible = false;
	groundSensor.mass = 0.01;
	let j = new GlueJoint(player, groundSensor);
	j.visible = false;
	ground.physics = STATIC;
	gts = new Group();
	gts.w = 50;
	gts.h = 42;
	gts.tile = '^';
	gts.image = gtsImg;
	gtsImg.resize(100, 84)
	gts.physics = STATIC;
	gls = new Group();
	gls.w = 50;
	gls.h = 42;
	gls.tile = '|';
	gls.image = glsImg;
	glsImg.resize(100, 84)
	gls.physics = STATIC;
	grs = new Group();
	grs.w = 50;
	grs.h = 42;
	grs.tile = '1';
	grs.image = grsImg;
	grsImg.resize(100, 84)
	grs.physics = STATIC;
	gtrc = new Group();
	gtrc.w = 50;
	gtrc.h = 42;
	gtrc.tile = '2';
	gtrc.image = gtrcImg;
	gtrcImg.resize(100, 84)
	gtrc.physics = STATIC;
	gtlc = new Group();
	gtlc.w = 50;
	gtlc.h = 42;
	gtlc.tile = '3';
	gtlc.image = gtlcImg;
	gtlcImg.resize(100, 84)
	gtlc.physics = STATIC;
	gbrc = new Group();
	gbrc.w = 50;
	gbrc.h = 42;
	gbrc.tile = '4';
	gbrc.image = gbrcImg;
	gbrcImg.resize(100, 84)
	gbrc.physics = STATIC;
	gblc = new Group();
	gblc.w = 50;
	gblc.h = 42;
	gblc.tile = '5';
	gblc.image = gblcImg;
	gblcImg.resize(100, 84)
	gblc.physics = STATIC;
	gbs = new Group();
	gbs.w = 50;
	gbs.h = 42;
	gbs.tile = '6';
	gbs.image = gbsImg;
	gbsImg.resize(100, 84)
	gbs.physics = STATIC;
	//spike
	spike = new Group();
	spike.w = 50;
	spike.h = 40.2;
	spike.tile = '/';
	spike.color = 'red'
	spike.physics = STATIC;
	//enimies
	evil = new Group();
	evil.w = 40;
	evil.h = 90;
	evil.tile = ',';
	evil.color = 'red'
	evil.physics = STATIC;
	evil.image = enimieImg;
	enimieImg.resize(100, 150);
	//prizes
	mush = new Group();
	mush.w = 30;
	mush.h = 30;
	mush.tile = '`';
	mush.color = 'yellow';
	mush.physics = STATIC;
	mush.image = mushImg;
	mushImg.resize(90, 90);
	//finish line
	end = new Group();
	end.w = 50;
	end.h = 40;
	end.tile = '-';
	end.color = 'yellow'
	end.physics = STATIC;
	//fakes
	fend = new Group();
	fend.w = 50;
	fend.h = 40;
	fend.tile = '_';
	fend.color = 'yellow'
	fend.physics = STATIC;
	fgls = new Group();
	fgls.w = 50;
	fgls.h = 42;
	fgls.tile = '7';
	fgls.image = glsImg;
	fgls.physics = STATIC;
	//map
	tilesGroup = new Tiles(
		[

			'************************666666666666666666666666666666**************',
			'**********************64..............................56************',
			'********************64..................................56**********',
			'*******************4......................................5*********',
			'.*66666666666666664...........`............................566666666.',
			'*1............................^.......^^....^^^...................._|',
			'*1.................................................^...3^^^^^^^^--__|',
			'*1................................................^....5666666****..*',
			'*1`...........................................3^..............|***..*',
			'**^2/////^/////^///^////^//////^///2..........................|***..*',
			'**64......................................3^2.................|***..*',
			'*1...........................................^................|***..*',
			'*1..................................................^.......`.|***..*',
			'*1................................................^^.......3^^****..*',
			'*1............^^...........^...............................5******..*',
			'*1................................^^......^^^...............5*****..*',
			'*1....................^^.....................................5****..*',
			'*1.`..........................................................|**...*',
			'**^^2............^............................................|*....*',
			'**664.........................................................7`....*',
			'*1..........32........................^.......................|***..*',
			'*1.....................,..........^...1....^............,....3****..*',
			'**^^^^^^^^2.......3^^^^^^^^^^^^^^^2...|....3^^^^^^^^^^^^^^^^^*****..*',
			'**********1..^^...56666666666666664...1....|**********************..*',
			'**********1................`..........3////|**********************..*',
			'**********1....^..3^^^^^^^^^^^^^^^^^^^*^^^^****************6666666..*',
			'**********1///////|***************************************1.........|',
			'***********^^^^^^^****************************************1.....````|',
			'***********************************************************--^^^^^^^*',
			'/////////////////////////////////////////////////////////////////////'
		],
		10,
		6,
		ground.w,
		ground.h
	);
}
function update() {
	background('black');
	player.overlaps(fend);
	player.overlaps(fgls);
	//player controls
	if (player.colliding(gts)) {
		playerCanJump = true;
	}
	if (player.colliding(end)) {
		playerCanJump = true;
	}
	if (player.colliding(gtlc)) {
		playerCanJump = true;
	}
	if (player.colliding(gtrc)) {
		playerCanJump = true;
	}
	if (kb.presses('up')) {
		if (playerCanJump == true) {
			player.vel.y = -6;
			playerCanJump = false;
			started=true
		}
	}
	if (kb.pressing('left')) {
		player.vel.x = -5;
		player.image = playertImg;
		playertImg.resize(100, 80);
		started=true
	} else if (kb.pressing('right')) {
		player.vel.x = 5;
		player.image = playerImg;
		playerImg.resize(100, 80);
		started=true
	} else {
		player.vel.x = 0;
	}
	if(!started) {
		drawStart()
	}
	//spike effects
	if (player.colliding(spike, hit)) {
		player.x = 270;
		player.y = 890;
	}
	//evil effects
	if (player.colliding(evil, hit)) {
		player.x = 270;
		player.y = 890;
	}
	//finish effects
	if (player.colliding(end)) {
		drawFinish();
		player.vel.x=0;
	}
	if (currentLives <= 0) {
		drawGameOver();
		player.vel.x = 0;
		player.vel.y = 0;
	}
	//collects
	player.overlaps(mush, removeMush)
	//camera follow player
	camera.x = player.x;
	camera.y = player.y - 190;
	//how many mushrooms
	fill('white')
	text(currentScore, 10, 40);
	//# of lives left
	text(currentLives, 790, 40);
}
function removeMush(player, mushCollected) {
	mushCollected.remove();
	currentScore = calcScore(currentScore, 1);
}
function calcScore(score, points) {
	return score + points;

}
function hit(player) {
	currentLives = calcLives(currentLives, 1);
}
function calcLives(health, damage) {
	return health - damage;
}
function drawGameOver(){
	fill('white');
	textSize(48);
	text('You failed',400,350);
}
function drawFinish(){
	fill('white');
	textSize(48);
	text('You did it!',400,350);
}
function drawStart(){
	fill('white');
	textSize(48);
	text('Pill Bug',400,300);
	textSize(20);
	text('collect mushrooms,',380,400);
	text('avoid centipieds and the red,',340,430);
	text('and get to the end',380,460);
	text('(use arrow keys to move)',350,500);
}