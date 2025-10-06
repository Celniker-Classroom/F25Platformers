new Q5();
//platformer game
let floor, block, ball, oneball, block2, hi, blue, orange, block4, block5, block6;
let block3, platform, moves, basketball2, little, student
let flipper, flipper2
let hard, obstcale
let floor2, invisblebarrier, invisblebarrier2
let m = 1
let t

function preload() {
	selma = loadImage('assets/selma.png');
	green = loadImage('assets/green.png');
	basketball2 = loadImage('assets/basketball2.png');
	little = loadImage('assets/little.png');
	obstcale = loadImage('assets/obstcale.png');

}

function setup() {
	new Canvas;
	background('lightblue')
	world.gravity.y = 10;
	//				({vertex0,vertex1,vertex2,...})
	floor = new Sprite(800 + m, 60, 200, 200)
	floor.physics = NONE;
	floor.image = basketball2
	basketball2.resize(500, 500)
	//                   ([vertex0,vertex1,vertex2,...])
	floor2 = new Sprite([[20, 80], [100, 140], [200, 180]]);
	floor2.physics = STATIC
	ball = new Sprite(50, 10, 30);
	ball = new Sprite()

	world.gravity.y = 20;
	ball = new Group();
	ball.color = 'purple'
	ball.y = 40;
	ball.diameter = 30;
	while (ball.length < 20) {

		ballclone = new ball.Sprite();
		ballclone.x = ball.length * 5;
		oneball = new Sprite();
		oneball.color = 'blue'
		oneball.y = 40;
		world.gravity = 0
		oneball.diameter = 25;
	}
	flipper = new Sprite(200, 100, 250, 50, KIN);
	flipper.debug = true;
	flipper.rotationSpeed = 3;
	flipper.offset.x = 325;
	flipper2 = new Sprite(1500, 150, 200, 75, KIN)
	flipper2.debug = true;
	flipper2.rotationSpeed = 5;
	flipper2.offset.x = 150;

	block2 = new Sprite();
	block2.x = 100

	block3 = new Sprite(50, 50);
	world.gravity.y = 20;

	// block = new Sprite();
	// block.physics = STATIC
	// block.x = 100
	// block.y = 450
	// block.h = 50
	// block.w = 100

	block4 = new Sprite();
	block4.physics = STATIC
	block4.x = 1800
	block4.y = 600
	block4.h = 100
	block4.w = 50



	block5 = new Sprite();
	block5.physics = STATIC
	block5.x = 1850
	block5.y = 150
	block5.h = 100
	block5.w = 80


	block6 = new Sprite();
	block6.physics = STATIC
	block6.x = 1100
	block6.y = 200
	block6.h = 150
	block6.w = 80



	invisblebarrier = new Sprite();
	invisblebarrier.physics = STATIC
	invisblebarrier.x = 0
	invisblebarrier.y = 200
	invisblebarrier.h = 50
	invisblebarrier.w = 2000
	invisblebarrier.visible = false

	invisiblebarrier2 = new Sprite();
	invisiblebarrier2.x = 100
	invisiblebarrier2.y = 900
	invisiblebarrier2.h = 50
	invisiblebarrier2.w = 2000
	invisiblebarrier2.visible = false
	invisiblebarrier2.physics = NONE


	







	hi = new Group();
	hi.w = 100
	hi.h = 20
	hi.color = 'blue'
	hi.tile = 's'
	hi.physics = STATIC
	//blues
	blue = new Group();
	blue.w = 75
	blue.h = 20
	blue.color = 'green'
	blue.tile = 'g'
	blue.physics = STATIC
	//green
	student = new Sprite();
	student.x = 480
	student.w = 150
	student.h = 50
	student.image = little
	little.resize(250, 250)
	student.overlaps(floor)
	//character
	// hard = new Group();
	// hard.w = 200
	// hard.h = 60
	// hard.image = obstcale
	// hard.tile = 'b'
	// hard.physics = STATIC
invisiblebarrier2.overlaps(allSprites)

	//green

	tilesGroup = new Tiles(

		[


			'sss',
			'     s     s',
			'      g                      g             g                                g',
			'                                                    g',
			'                                             g',
			'                                  g',




		],

		moves, 600, 100, 20
	);

	t = ''
}



function update() {
	clear();
	background('lightblue')
	createCanvas(2000, 2000)

	fill ('white')
	textSize(17,17)
	text('Move the character that it passed through every obstcale and made it to the basketball hoop', 100,850)

	fill('white')
	textSize(100, 100)
	text(t, 400, 400)

	if (mouse.pressing()) {
		oneball.x = mouse.x
		oneball.y = mouse.y
	}
	if (mouse.released()) {
		oneball.speed = 30
		oneball.direction = 'upright'
	}
	if (kb.pressing('right')) {
		student.vel.x = 5
	}
	if (kb.pressing('left')) {
		student.vel.x = -5
	}
	if (kb.pressing('up')) {
		student.vel.y = -5
	}
	if (mouse.presses()) new Sprite(mouse.x, mouse.y, 10);
	if (mouse.presses()) new Sprite(mouse.x, mouse.y, 20);
	if (student.overlapping(floor)) {
		student.remove();
		t = 'Winner'
		if (mouse.presses()) new Sprite(mouse.x, mouse.y, 20);
		if (mouse.presses()) new Sprite(mouse.x, mouse.y, 30);
	}
	if (student.overlapping(invisiblebarrier2)) {
		student.remove();
		t = 'Fail'

	}
}

