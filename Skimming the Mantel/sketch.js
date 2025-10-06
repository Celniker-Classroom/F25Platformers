new Q5();

function preload() {
	groundImg = loadImage('assets/dirt.png');
	rockImg = loadImage('assets/rock.png');
	playerImg = loadImage('assets/player.png');
	playerImgHead = loadImage('assets/playerHead.png');
	corner1Img = loadImage('assets/corner1.png');
	corner2Img = loadImage('assets/corner2.png');
	corner3Img = loadImage('assets/corner3.png');
	corner4Img = loadImage('assets/corner4.png');
	side1Img = loadImage('assets/side1.png');
	side2Img = loadImage('assets/side2.png');
	button1Img = loadImage("assets/buttonSeg1.png")
	button2Img = loadImage("assets/buttonSeg2.png")
	button3Img = loadImage("assets/buttonSeg3.png")
	lavaAni = loadAni('assets/lava1.png','assets/lava2.png','assets/lava3.png','assets/lava4.png','assets/lava5.png' );}

function setup() {
	new Canvas();
	camPos = true
	move = true
	
	
	

//-------------player---------------
	player = new Sprite();
	player.x = 0;
	player.y = 500;
	player.bounciness = 0;
	player.r = 23;
	playerImg.resize(90,90);
	player.image=playerImg;

//-------------head---------------
	playerHead = new Sprite();
	playerImgHead.resize(70,70);
	playerHead.image = playerImgHead;
	playerHead.x = player.x;
	playerHead.y = player.y - 35;
	playerHead.overlaps(allSprites);
	new GlueJoint(player, playerHead);
	playerHead.rotation = 0;
	playerHead.w = 15;
	playerHead.h = 10;

//-------------jump---------------
	playerJump = new Sprite();
	playerJump.x = player.x;
	playerJump.y = player.y + 25;
	playerJump.overlaps(allSprites);
	jJump = new GlueJoint(player, playerJump);
	playerJump.rotation = 0;
	playerJump.w = 15;
	playerJump.h = 10;
	playerJump.opacity = 0;
	

//-------------ground-------------
	ground = new Group();
	ground.width = 49;
	ground.height = 49;
	ground.physics = STATIC;
	ground.image = groundImg;
	groundImg.resize(100,100);
	ground.tile = "x";
	ground.layer = 1

//-------------rock---------------
	rock = new Group();
	rock.width = 50;
	rock.height = 50;
	rock.physics = NONE
	rock.physics = STATIC;
	rock.overlaps(player);
	rock.image = rockImg;
	rockImg.resize(100,100);
	rock.tile = "r";
	rock.opacity = .4;
	rock.layer = 1
//-------------corner1---------------
	corner1 = new Group();
	corner1.width = 49;
	corner1.height = 49;
	corner1.physics = STATIC;
	corner1.image = corner1Img;
	corner1Img.resize(100,100);
	corner1.tile = "1";
	corner1.layer = 1

//-------------corner2---------------
	corner2 = new Group();
	corner2.width = 49;
	corner2.height = 49;
	corner2.physics = STATIC;;
	corner2.image = corner2Img;
	corner2Img.resize(100,100);
	corner2.tile = "2";
	corner2.layer = 1
//-------------corner3---------------
	corner3 = new Group();
	corner3.width = 49;
	corner3.height = 49;
	corner3.physics = STATIC;
	corner3.image = corner3Img;
	corner3Img.resize(100,100);
	corner3.tile = "3";
	corner3.layer = 1
//-------------corner4---------------
	corner4 = new Group();
	corner4.width = 49;
	corner4.height = 49;
	corner4.physics = STATIC;
	corner4.image = corner4Img;
	corner4Img.resize(100,100);
	corner4.tile = "4";
	corner4.layer = 1
//-------------side1---------------
	side1 = new Group();
	side1.width = 49;
	side1.height = 49;
	side1.physics = STATIC;
	side1.image = side1Img;
	side1Img.resize(100,100);
	side1.tile = "h";

//-------------side2---------------
	side2 = new Group();
	side2.width = 49;
	side2.height = 49;
	side2.physics = STATIC;
	side2.image = side2Img;
	side2Img.resize(100,100);
	side2.tile = "j";

//-------------button1---------------
	button1 = new Group();
	button1.width = 49;
	button1.height = 49;
	button1.physics = STATIC;
	button1.image = button1Img;
	button1Img.resize(100,100);
	button1.tile = "5";
	button1.layer = 1;
	
//-------------button2---------------
	button2 = new Group();
	button2.width = 49;
	button2.height = 49;
	button2.physics = STATIC;
	button2.image = button2Img;
	button2Img.resize(100,100);
	button2.tile = "6";
	button2.layer = 1;

//-------------button3---------------
	button3 = new Group();
	button3.width = 49;
	button3.height = 49;
	button3.physics = STATIC;
	button3.image = button3Img;
	button3Img.resize(100,100);
	button3.tile = "7";
	button3.layer = 1;

//-------------click1---------------
	click1 = new Sprite();
	click1.x = 6525;
	click1.y = 150;
	click1.physics = STATIC;
	click1.overlaps(allSprites);
	click1.w = 50;
	click1.h = 50;
	click1.layer=2;
	click1.textSize = 45;
	click1.image = button2Img;

//-------------click2---------------
	click2 = new Sprite();
	click2.x = 6525;
	click2.y = 400;
	click2.physics = STATIC;
	click2.overlaps(allSprites);
	click2.w = 200;
	click2.h = 50;;
	click2.layer=2;
	click2.textSize = 30;
	click2.color = NONE;
	click2.image = button2Img;

//-------------win---------------
	win = new Group();
	win.width = 49;
	win.height = 49;
	win.physics = STATIC;
	win.color = (0);
	win.opacity = (.5)
	win.tile = "w";
	win.layer = 1;

//-------------lava---------------
	lava = new Group();
	lava.width = 50;
	lava.height = 50;
	lava.physics = NONE;
	lava.physics = STATIC;
	lava.overlaps(player);
	lava.ani= lavaAni;
	lava.tile = "l";
	animation(lavaAni);
	lava.layer = 1;


//-------------layout---------------
	tilesGroup1 = new Tiles(
		[
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrr2xxxxxx1rrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrxxxxxxxxrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrxx5667xxrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrxxxxxxxxrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrxxxxxxxxrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx3rrrrrrrrrrrrrr4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrxxxxxxxxrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxx3rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx3rrrrrrrrrrrrrrr4xxxxxxxxxxxxxxxxxxrrrrrrrrrrrrxxxxxxxxrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxx3rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr4xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx3rrrrrrrrrrrrrrrrrrxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrxx5667xxrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxx3rrrrrrrrrrrjhrr2xxxxxxx1rrrrrrrrrrrrrrrrrrrrrr4xxxxxxxxxxxxxxxxxxxxxxxx3rrrrrrrrrrrrrjxxxxxx1rrrrr4xxxxxxxxxxxxxxxxxrrrrrrrrrrrrxxxxxxxxrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrr4xxxxxxxxxx1rrrrrrrrrrrrrrrrrrrrr4xxxxxxxxxxxxxxxxx3rrrrrrrrrrrrrrrrrrrrr4xxxxxhrrrrr4xxxxxxxxxxxxxxxrrrrrrrrrrrr4xxxxxx3rrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxrrrrrrrrrjhrrrrrrr4xxxxxxxxxrrrrrrrrrrrrrjhrrrrrrrrr4xxxxxxxxxxxx3rrrrrrrrrrrrrrrjhrrrrrrrrrrrrrrrrrrrrwwwwwxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrxxxxxxxxxxx1rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrwwwwwxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxrrrrrjxhrrrrrrrrrrrxxxxxxxxxxx3rrrrrrrjhrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrjxhrrrrrrrrrrrrrrwwwwwxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxx1rrrrrrrrrrrrrrrr2xxxxxxxxxx3rrrrrjhrrrrrrrrrrjxhrrr2xxxxxxx1rrrrrrrrrrrrrrrjhrrrrrrrrrrrrr2xxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxx1rrrrrrrrrrrr2xxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrxxxxxxxxx1rrrrrrrjxhrrrrrrrrrrrrrrrrrrrxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrxxxxxxxxxxxx1rrrrrrrrrrrrrrrrrrrrrrrrr2xxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxllllllllllllllllllllllllxxxxxxxxxxxxxx1rrrrrrrrrrrrrrrrrrrrr2xxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxllllllllllllllllllllllllxxxxxxxxxxxxxxxxxllllllllllllllllllxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxllllllllllllllllllllllllxxxxxxxxxxxxxxxxxxllllllllllllllxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxllllllllllllllllllllllllxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxllllllllllllllllllllllllxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxllllllllllllllllllllllllxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
			'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
		],
		-1150,
		-50,
		50,
		50,)
	
	
	}


function uiEnter(){
	camPos = false;
	camera.x = 6530;
	camera.y = 300;
	move = false;
	click1.text = "𝗣𝗮𝘂𝘀𝗲𝗱"
	click2.text = "𝗽𝗹𝗮𝘆";
	
}

function uiExit(){
	camPos = true;
	camera.x =player.x;
	camera.y =player.y;
	move = true;}

function death(){
	click1.text = "𝗬𝗼𝘂 𝗗𝗶𝗲𝗱!";
	click2.text = "𝗿𝗲𝘀𝘁𝗮𝗿𝘁"
	camPos = false;
	camera.x = 6530;
	camera.y = 300;
	if(click2.mouse.pressing()){
		player.x = 0
		player.y = 500
	}}
function winGame(){
	click1.text = "𝗬𝗼𝘂 𝗪𝗶𝗻!";
	click2.text = "𝗿𝗲𝗽𝗹𝗮𝘆"
	camPos = false;
	camera.x = 6530;
	camera.y = 300;
	if(click2.mouse.pressing()){
		player.x = 0
		player.y = 500}}

function update() {
	clear();
	background(5);
	
//-------------jump---------------
	if (kb.pressing('up')) {
		if (playerJump.overlapping(ground)||playerJump.overlapping(corner1)||playerJump.overlapping(corner2)||playerJump.overlapping(side1)||playerJump.overlapping(side2)){
			player.vel.y = -9.5;
		}}
//-------------movement---------------
	if (kb.pressing("right")){
	player.vel.x = 4}
	else if(kb.pressing("left")){
		player.vel.x = -4}
	else{
		player.vel.x = 0
	}

	if(kb.pressed("escape")){
		uiEnter()}

	if(click2.mouse.pressing()){
		uiExit()}

	if(move == true){
		world.gravity.y = 17}

	else{world.gravity.y = 0
		player.vel.x = 0
		player.vel.y = 0}

	if(player.colliding(lava)){
		death()}
	if(player.colliding(win)){winGame()

	}

}

function drawFrame() {
	player.rotation = -4;
	if (camPos == true){
		camera.x = player.x;
		camera.y = player.y;}
	camera.zoom= 1.3}