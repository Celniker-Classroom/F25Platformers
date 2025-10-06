
let lives = 3, anitimer = 0, gunani, watergun1, watergun2, waterbullet, watergun, soil, supervel = 0, jump, timer = 30, Bunny, floor, DEAGLE, ammo, mouser, circle, floorrecoil = 0.5, dir = 0, radius = 50, speed = 40; recoil = 10;
let gunrecoil = 0;
let guntimer = 0;
let textimer = 3000

function preload() {
	watergun = loadImage('image/watergun1.png');
	waterbullet = loadImage('image/waterbullet1.png');
	watergun1 = loadImage('image/watergun2.png')
	watergun2 = loadImage('image/watergun3.png')
	normalbun = loadImage('image/RABBIT-1.png')
	gunani = loadAni('shoot', 'image/watergun1.png', 'image/watergun2.png', 'image/watergun3.png', 'image/watergun1.png')
	idleani = loadAni('idle', 'image/watergun1.png')
}
function setup() {
	new Canvas(2000, 2000);
	// floor = new Sprite(250, 800, 10000, 10, STA);
	Barrel = new Sprite
	Bunny = new Sprite
	circle = new Sprite
	jump = new Sprite
	jump.x = Bunny.x
	jump.y = Bunny.y + 55
	jump.w = 50
	jump.h = 20
	jump.physics = NORMAL
	new GlueJoint(Bunny, jump)
	jump.overlap(allSprites)
	Bunny.x = 50
	Bunny.y = 300
	DEAGLE = new Sprite
	DEAGLE.x = 200
	DEAGLE.y = 600
	DEAGLE.physics = STA;
	DEAGLE.image = watergun2
	DEAGLE.image.resize(150, 150)
	DEAGLE.image = watergun1
	DEAGLE.image.resize(150, 150)
	DEAGLE.image = watergun
	DEAGLE.image.resize(150, 150)
	ammo = new Group
	ammo.x = 500
	ammo.y = 200
	ammo.d = 0.1
	ammo.img = waterbullet
	ammo.img.resize(200, 200)
	Bunny.image = normalbun
	Bunny.img.resize(200, 200)
	world.gravity.y = 10;
	Bunny.physics = DYN
	DEAGLE.overlaps(allSprites)
	// bricks = new Group();
	// bricks.w = 16;
	// bricks.h = 16;
	// //bricks.color = 'blue'
	// bricks.img = brickImg;
	// brickImg.resize(16, 16);
	// bricks.tile = '=';

	soil = new Group();
	soil.w = 20;
	soil.h = 20;
	soil.color = 'brown';
	soil.tile = 's';
	soil.physics = STA
	wall = new Group
	wall.w = 20
	wall.h = 20
	wall.color = 'blue'
	wall.tile = 'w'
	wall.physics = STA
	jump.opacity = 0


	tilesGroup = new Tiles(

		['................................................................................................................................................',
			'................................................................................................................................................',
			'................................................................................................................................................',
			'................................................................................................................................................',
			'................................................................................................................................................',
			'................................................................................................................................................',
			'................................................................................................................................................',
			'.............................................................................................................................................................................w.',
			'.............................................................................................................................................................................w.',
			'.............................................................................................................................................................................w.',
			'.............................................................................................................................................................................w.',
			'.............................................................................................................................................................................w.',
			'............................................................................................................ssssssssssssss...................................................w.',
			'.............................................................................................................................................................................w.',
			'.............................................................................................................................................................................w.',
			'.............................................................................................................................................................................w...............................ssssssssssssss',
			'sssssssssssss................................................................................................................................................................w.',
			'..............................................................................................................................................ssssssssssssss.................w',
			'.................................................................................ssssssssssssss..............................................................................w.',
			'.............................................................................................................................................................................w.',
			'.............................................................................................................................................................................w.',
			'................................................................',
			'................................................................',
			'................................................................',
			'..............................................ssssssssssssss........................................................................',
			'................................................................',
			'................................................................',
			'................................................................',
			'.................................................................',
			'.',
			'.',
			'........................................',
			'........................................',
			'........................................',
			'........................................',
			'.'
		],
		0,
		0,
		soil.w + 1,
		soil.h + 1,

	)

}

function update() {

	anitimer--
	ammo.img = waterbullet
	camera.x = Bunny.x + 500
	timer--
	jump.overlaps(soil)
	ammo.overlaps(allSprites)
	// DEAGLE.rotation = mouse.y/2
	dir = atan((mouse.y - Bunny.y) / (mouse.x - Bunny.x));
	if (mouse.x < Bunny.x) {
		dir += 180;
	}
	DEAGLE.rotation = dir

	// DEAGLE.rotateTowards(mouser, 1, 0);
	DEAGLE.overlaps(Bunny)
	// DEAGLE.y = Bunny.ys
	DEAGLE.ani
	background('skyblue');
	background(1000, 1000)
	if (Bunny.x >= 2250) {
		textimer--
	}
	if (mouse.presses() && timer <= 0 && Bunny.x >= 2250 && Bunny.x <= 5000) {
		// DEAGLE = new Sprite
		ammo = new Sprite
		ammo.img = waterbullet
		ammo.rotation = dir
		ammo.x = DEAGLE.x - 10
		ammo.y = DEAGLE.y - 10
		ammo.vel.x = speed * cos(dir);
		ammo.vel.y = speed * sin(dir);
		Bunny.vel.x += -recoil * cos(dir);
		Bunny.vel.y = -recoil * sin(dir);
		supervel = 0
		timer = 30
		guntimer = 30;


	}
	if (mouse.presses() && timer <= 0) {
		DEAGLE.changeAni('shoot');
		anitimer = 16.67
		timer = 30
	}
	else if (anitimer <= 0 && timer >= 0) {
		DEAGLE.changeAni('idle')
	}


	// if ( mouse.presses() && Bunny.colliding(floor) && mouser.y <= 800 && timer <= 0){
	// 	Bunny.vel.y = 0
	// 	Bunny.vel.x = -floorrecoil * cos(dir);
	// 	timer = 30
	// 
	// if (kb.presses(' ')) {
	// 	Bunny.vel.y = -5;
	// }
	if (kb.presses('w') && jump.overlapping(soil)) {
		Bunny.vel.y = -7;
	}
	if (kb.pressing('a') && jump.overlapping(soil) && !kb.pressing('s')) {
		Bunny.vel.x = -7;

	}

	// if (kb.pressing('a') && !jump.overlapping(floor) && Bunny.vel.y<=-7) {
	// 	// DEAGLE.x += -5
	// }
	// if (kb.pressing('d') && !jump.overlapping(floor) && Bunny.vel.y<=5.1) {
	// 	Bunny.vel.x = 0.05 >= 3;
	// 	// DEAGLE.x += -5
	// }
	if (kb.pressing('s')) {
		Bunny.h = 25;
	}
	else {
		Bunny.h = 100
	}
	if (kb.pressing('s')) {
		Bunny.h = 50;
	}
	if (kb.presses('s')) {
		Bunny.y += 25;
	}
	if (kb.pressing('d') && jump.overlapping(soil) && !kb.pressing('s')) {
		Bunny.vel.x = 7;
		//DEAGLE.x += 5
	}


	if (Bunny.x >= 6000 && Bunny.y >= 1000) {
		delete (allSprites)
		textSize(32)
		text('DEAGLE RABBIT horribly unfinished', 500, 500)
	}
	if (kb.pressing('a') && !jump.overlapping(soil)) {
		if (supervel <= 8) {
			Bunny.vel.x -= 0.2
			supervel += 0.2
		}
	} else if (kb.pressing('d') && !jump.overlapping(soil)) {
		if (supervel <= 8) {
			Bunny.vel.x += 0.2
			supervel += 0.2
		}
	}
	else {
		supervel = 0
	}
	if (kb.pressing('a') && kb.pressing('d')) {
		supervel = 0
	}
	if (lives <= 2) {
		text('wow already? You really suck huh.', 1300 - camera.x, 200);
	}

	// if (kb.pressing(' ') ) {ddddd
	// 	supervel += 0.2
	// }
	// else{
	// 	supervel -= 0.2 
	// }
	// if(supervel >= 7){
	// 	supervel = 7
	// }
	// if(supervel <= -7){
	// 	supervel = -7
	// }
	//DEAGLE.x += 5

	if (Bunny.colliding(soil) && !kb.pressing('a') && !kb.pressing('d') && !kb.pressing('s')) {
		Bunny.vel.x = 0
	}
	if (!mouse.pressed()) {
		DEAGLE.x = Bunny.x + (radius - 1.5 * gunrecoil) * cos(dir);
		DEAGLE.y = Bunny.y + (radius - 1.5 * gunrecoil) * sin(dir);
	}
	// if()
	// if (mouse.pressing() && gunrecoil < 20 && timer <= 0){
	// 	gunrecoil += 10 
	// }
	if (guntimer > 15) {
		gunrecoil = 2 * (30 - guntimer)
	} else {
		gunrecoil = guntimer;
	}
	if (guntimer > 0) {
		guntimer--;

	}
	if (Bunny.y >= 1000) {
		Bunny.x = 200
		Bunny.y = 200
		lives--
	}

	textAlign(CENTER);
	textSize(20);
	fill(0);

	text('WASD to move. Holding a or d midair greatly increases velocity. This will feel pretty weird. Get used to it', 1300 - camera.x, 550);
	text('You cant jump past this wall? Figure it out. Maybe use that watergun', 4200 - camera.x, 400);
	if (textimer <= 0) {
		text('Still here dummy? Try jumping and shootig at your feet.', 4200 - camera.x, 450);
	}
	text('Goooooood boyyyyyyyy/girlllllll/nonbinary', 6000 - camera.x, 450);
	text('Anyways, those are the basics. Figure out the rest. Dont forget to get revenge on mankind', 6000 - camera.x, 550)
	text('There be a platform up ahead. go shoot to it.', 6000 - camera.x, 600)
	text('Tricked ya ;)', 7000 - camera.x, 450)
	Bunny.rotation = 0
	if (Bunny.vel.x >= 30) {
		Bunny.vel.x--
	}
	if (Bunny.vel.x <= -30) {
		Bunny.vel.x++
	}
	
	// DONT FORGET THAT WE TRYNA MAKE IT MOVE RIGHT OR LEFT BY ADDING GRADUALLY MIDAIR. IT"S VELOCITY WHEN DOING THAT SHOULD CAP OUT AT 5, 
	// MAYBE JUST MAKE IT ADD TO THE VELOCITY, LIKE bunny.vel.x += (var) Maybe, make the changing nummber a variable.
}
