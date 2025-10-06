let player, Grass, GrassImg, Dirt, DirtImg, Snakebody, SnakebodyImg, Snakehead, SnakeheadImg, SnakeheadDown, SnakeheadDownImg, JumpPad, JumpPadImg, Brick, BrickImg, Gold, GoldImg, text1, Coin, CoinImg, coinCollect = 0, lives = 5;
function preload(){
	GrassImg = loadImage('Images/Grass.png');
	DirtImg = loadImage('Images/Dirt.png');
	SnakebodyImg = loadImage('Images/Snakebody.png');
	SnakeheadImg = loadImage('Images/Snakehead.png');
	JumpPadImg = loadImage('Images/JumpPad.png');
	SnakeheadDownImg = loadImage('Images/SnakeheadDown.png');
	BrickImg = loadImage('Images/Brick.png');
	GoldImg = loadImage('Images/Gold.png');
	CoinImg = loadImage('Images/Coin.png');
}

function setup(){
	new Canvas(2000, 600);
	world.gravity.y = 5;
	frameRate(60);
	//player
	player = new Sprite();
	player.physics = DYNAMIC;
	player.x = 50
	player.d = 20
	player.rotationLock = true;
	player.bounciness = 0;

	//World Blocks
	Dirt = new Group();
	Dirt.physics = STATIC;
    Dirt.w = 49;
    Dirt.h = 49;
    Dirt.img = DirtImg;
    DirtImg.resize(100, 100);
    Dirt.tile = 'd';

    Grass = new Group();
	Grass.physics = STATIC;
	Grass.img = GrassImg;
	GrassImg.resize(100, 100);
    Grass.tile = 'g';
	Grass.bounciness = 0;

	Brick = new Group();
	Brick.physics = STATIC;
	Brick.img = BrickImg;
	BrickImg.resize(100, 100);
	Brick.tile = 'r';
	Brick.bounciness = 0;

	Gold = new Group();
	Gold.physics = STATIC;
	Gold.img = GoldImg;
	GoldImg.resize(100, 100);
	Gold.tile = 'e';
	Gold.bounciness = 0;

	Coin = new Group();
	Coin.physics = STATIC;
	Coin.img = CoinImg;
	CoinImg.resize(100,100);
	Coin.tile = 'c';

	//Snake
	Snakebody = new Group();
	Snakebody.physics = STATIC;
	Snakebody.img = SnakebodyImg;
	SnakebodyImg.resize(100, 100);
    Snakebody.tile = 'b';

	Snakehead = new Group();
	Snakehead.physics = STATIC;
	Snakehead.d = 38
	Snakehead.img = SnakeheadImg;
	SnakeheadImg.resize(100, 100);
    Snakehead.tile = 'h';

	SnakeheadDown = new Group();
	SnakeheadDown.physics = STATIC;
	SnakeheadDown.d = 38
	SnakeheadDown.img = SnakeheadDownImg;
	SnakeheadDownImg.resize(100, 100);
    SnakeheadDown.tile = 'u';

	//JumpPad
	JumpPad = new Group();
	JumpPad.physics = STATIC;
    JumpPad.w = 50;
    JumpPad.h = 15;
	JumpPadImg.resize(100, 100);
	JumpPad.img = JumpPadImg;
    JumpPad.tile = 'j';

	//World Layout
	tilesGroup = new Tiles(
        [
			'.............b.b.b....b......b.b.b.b..............',
			'.............b.b.b....b......b.b.b.b..............',
			'.............b.b.b....b......b.b.b.b..............',
			'.............ucucu....u......u.u.u.u............g',
			'..............................c...c.....h........d',
			'...........e.jhjhjhhhhjhhhhhjh.h.h.h...crc.......d',
			'...........gggggggggggggggggggggggggg...u.....c..d',
			'.....c..............b.ddddddddddddddd.....dgggg..d',
			'....c.c........cc...u..d.............cc.h......g.d',
			'...............hh......r.d.....g..h....cr.h......d',
			'...g...g.......bb......d.r....gdhcrc...hhhg......d',
			'..gdhhhd.....gjbb...j....d...gddbhdhhhhbbbdg...gjd',
			'ggddbbbdgggggggggggggggggggggggggggggggggggggggggg',
		],	
        0,
        0,
        Dirt.w + 1,
        Dirt.h + 1,
    );

	//text
	text1 = new Sprite();
	text1.physics = KIN;
	text1.color =  color(142, 185, 250);
	text1.x = 10;
	text1.y = 100;
	text1.w = 650;
	text1.text = "1. You can wall jump on bricks(and grass). 2. You also hold on to any block. 3. You can only jump on grass(and bricks)"
}

function update(){
	background(168, 247, 242);
	//movement
	if(kb.presses('up')&&player.colliding(Grass)){
		player.vel.y = -4;
	}

	if(kb.presses('up')&&player.colliding(Brick)){
		player.vel.y = -4;
	}

	if (kb.pressing('left')) player.vel.x = -3;
	else if (kb.pressing('right')) player.vel.x = 3;
	else player.vel.x = 0;

	//Jump Pad
	if (player.collides(JumpPad)){
		player.vel.y = -6;
	}
	//Snake Death
	if (player.colliding(Snakebody)||player.colliding(Snakehead)||player.colliding(SnakeheadDown)){
		player.x = 50;
		player.y = 400;
		player.vel.x = 0;
		player.vel.y = 0;
		lives -= 1;
	}
	//coin collect
	textSize(18);
	text ("Coins = " + coinCollect, 100, 100);
	player.overlaps(Coin, removeCoin);
	
	//lives
	text("Lives = " + lives, 100, 150);
}

//camera
function drawFrame(){
	camera.x = player.x;
}

//coin collect
function removeCoin(player, CoinCollected){
	CoinCollected.remove();
	coinCollect += 1;
}