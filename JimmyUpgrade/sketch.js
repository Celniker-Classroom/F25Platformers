//initalizing variables
new Q5();
let tilesGroup;
let jimmy;
let monster;
let spike;
let coin;
let groundPiece;
let otherGP;
let bgColor = color(100, 100, 120);
let ground, jImage, mImage, sImage, oGround, cImage, uTop, bImage, uTImage, uBImage, Bimage;
let groundP;
let GroundD;
let hi = false;
let mon;
let c;
let uX = 3000; let uY = 200;
let button;
let mons;
let boot;
let alarm;
let currentC, currentS, currentJ;
let ufoTop;
let ufoBottom;
let ufoBeam;
let stomp = false;
let coins = 0, speedU, speed = 2, jumpP = 2.5, jumpU, timing, time = 3, cUpgradeC = 1, sUpgradeC = 3, jUpgradeC = 2;
let upgrading = false;

function preload() {
	
	//initalizing sprites and groups
	jimmy = new Sprite(50, -540, 20, 35, STA);



	groundPiece = new Group;
	groundPiece.physics = STATIC
	groundPiece.bounciness = 0;
	spike = new Group();
	spike.physics = STATIC;
	ufoBeam = new Sprite(uX, uY + 70, 10, 75 / 6, STA);
	ufoBottom = new Sprite(uX, uY + 30, 45, 30, STA);
	ufoTop = new Sprite(uX, uY, 32.5, 25, STA);


	spike = new Group();
	spike.physics = STATIC;
	spike = new Group();
	spike.physics = STATIC;
	coin = new Group();
	coin.physics = STATIC;
	boot = new Group();
	boot.physics = STATIC;
	otherGP = new Group();
	otherGP.bounciness = 0;
	otherGP.physics = STATIC;


	monster = new Group();

	monster.physics = STATIC;
	ground = loadImage('Images/bestGroun.png');
	bImage = loadImage('Images/boot.png');
	mon = loadImage('Images/monster.png');
	oGround = loadImage('Images/bestGround.png');
	sImage = loadImage('Images/spike.png');
	uTop = loadImage('Images/ufoTop.png');
	cImage = loadImage('Images/coin.png');
	uTImage = loadImage('Images/ufoTop.png');
	uBImage = loadImage('Images/ufoBottom.png');
	Bimage = loadImage('Images/beam.png');
	world.gravity.y = 10;
}
function setup() {
	//setting variables and sprites values
	alarm = time * 60;

	groundPiece.image = ground;
	groundPiece.scale = 2;
	jimmy.physics = DYN;
	otherGP.image = oGround;
	otherGP.scale = 2;
	otherGP.bounciness = 0;
	jimmy.bounciness = 0;
	groundPiece.bounciness = 0;
	spike.image = sImage;
	spike.physics = STATIC;
	spike.scale = 4;
	spike.tile = 's';
	boot.physics = STATIC;
	boot.image = bImage;
	boot.scale = 2;
	boot.tile = 'b';
	ufoBeam.image = Bimage;
	ufoBeam.scale = 6;
	ufoBottom.image = uBImage;
	ufoBottom.scale = 2;
	ufoTop.image = uTImage;
	ufoTop.scale = 2.25;

	coin.image = cImage;
	coin.layer = 2;
	coin.physics = STATIC;
	coin.scale = 2;
	coin.tile = 'c';
	monster.image = mon;
	monster.scale = 2;
	groundPiece.physics = STA;
	groundPiece.tile = '=';
	otherGP.tile = 'w';
	

	world.gravity.y = 10;
	otherGP.fricion = 0.1;
	new Canvas(800, 600);
	jimmy.friction = 0.1;
	// creation of canvas and the bg and calling of screen1 function

}


	text('COINS:' + coins, 250, 250);
	background(bgColor);
	groundPiece.image = ground;
	otherGP.image = oGround;
	//monster.image = mon;
	screen1();
	otherGP.fricion = 0;
	button = new Sprite(500, 50, 50, 25, STA);
	spike.image = sImage;

	mons = new monster.Sprite();
	mons.phyiscs = DYN;
	mons.x = 840;
	mons.y = 340;
	mons.friction = 0;
	mons.vel.x = 2;
	mons.rotationLock = true;

	//setting of buttons
	timing = new Sprite(-5000, 150, 150, 100, STA);
	jumpU = new Sprite(-4700, 150, 150, 100, STA);
	speedU = new Sprite(-5300, 150, 150, 100, STA);
	jumpU.text = 'jump upgrade for: ' + jUpgradeC + ' coins ' + '\n' +
		'\n' + 'jump height: ' + jumpP + ' ---> ' + (jumpP + 0.5);
	speedU.text = 'speed upgrade for: ' + sUpgradeC + ' coins ' + '\n' +
		'\n' + 'speed: ' + speed + ' ---> ' + (speed + .5);
	timing.visible = false;
	boot.layer = 2;


	// jumpU = new Sprite(-500000, 150, 150, 100, STA);
	// speedU = new Sprite(-499700, 150, 150, 100, STA);
}
function update() {
	clear();
	//main game loop consisting of function calling, if statements, movement, and text
	background(bgColor);
	jimmy.overlaps(coin, coinRemove);
	jimmy.overlaps(boot, bootRemove);

	if (button.mouse.presses()) {
		upgrade();

	}
	if (jimmy.x < 2600 && upgrading == false) {
		camera.x = jimmy.x;
	} else {
		camera.x = 3000;
		bossScene();
	}

	otherGP.friction = 0;
	if (jimmy.colliding(spike)) {
		jimmy.x = 100;
		jimmy.y = 500;
		alarm = time * 60;
	}
	hi = false;

	//movement and jumping
	otherGP.bounciness = 0;
	let p = jimmy.y % 40;
	if (jimmy.y % 40 < 22 && jimmy.y % 40 > 21 && jimmy.colliding(otherGP)) {
		otherGP.friction = 0.1;
		hi = true;
		if (kb.presses('w')) {
			jump();
		}

	} else {
		otherGP.fricion = 0;

	}
	if (jimmy.colliding(otherGP)) {
		otherGP.friction = 0;
	}

	let collidedWall = jimmy.colliding(otherGP);



	if (kb.pressing('d')) {
		if (jimmy.colliding(otherGP)) {
			if (hi == true) {

			}
		}
		jimmy.vel.x = speed;
	} else if (kb.pressing('a')) {
		jimmy.vel.x = -speed;
	} else {
		jimmy.vel.x = 0; // Apply friction when no horizontal keys are pressed
	}

	// timing.draw();
	timing.x = -5000;

	jimmy.rotationLock = true;

	//upgrade functionalities on mouse press
	if (timing.mouse.presses()) {
		console.log("prssed upgrade");
		if (coins >= cUpgradeC) {
			coins -= cUpgradeC;
			time *= 1.5;
			cUpgradeC++;
			timing.text = 'Upgrade time for: ' + cUpgradeC + ' coins ' + '\n' +
				'\n' + time + ' ---> ' + time * 1.5;
		}
	} else if (jumpU.mouse.presses()) {
		if (coins >= jUpgradeC) {
			coins -= jUpgradeC;
			jumpP += 0.5;
			jUpgradeC++;
			jumpU.text = 'jump upgrade for: ' + jUpgradeC + ' coins ' + '\n' +
				'\n' + 'jump height: ' + jumpP + ' ---> ' + (jumpP + 0.5);

		}
	} else if (speedU.mouse.presses()) {
		if (coins >= sUpgradeC) {
			coins -= sUpgradeC;
			speed += 0.5;
			sUpgradeC += 2;
			speedU.text = 'speed upgrade for: ' + sUpgradeC + ' coins ' + '\n' +
				'\n' + 'speed: ' + jumpP + ' ---> ' + (jumpP + 0.5);
		}

	}
	//the goal text in the upgrade screen that tells you the origin, story, and goal
	let goal = new Sprite(-5000, 500, 1000, 100, STA);
	goal.color = bgColor;
	goal.strokeWeight = 0;
	goal.text = 'Jimmy, always a weak rectangle,wanted to prove himself to the rectangle tribe by taking down the ' + '\n' + 'malevolent ufo but in order for weak Jimmy to destroy the UFO, he needs to upgrade his weak self to jump' + '\n' + ' higher, learn to stomp enemies, and go faster, and its up to you to make him win!';


	//jimmy.rotateSpeed = 0;
	if (kb.presses('w') && (jimmy.colliding(groundPiece))) {
		jump();
		//checks if stomp powerup is collected
		if (stomp) {
			boot.visible = false;
		} else {
			boot.visible = true;
		}

	}
	if (frameCount % 80 == 0) {
		mons.vel.x *= -1
	}
	if (mons.vel.x != 3 || -3) {
		if (mons.vel.x < 0) {
			mons.vel.x = -3;
		} else {
			mons.vel.x = 3;
		}
		if (jimmy.collides(mons)) {
			jimmy.x = 150;
			alarm = time * 60;
		}
	}
	frameCount = 60;
	background(bgColor);


	button.color = 'red'
	button.x = camera.x + 300;
	button.text = 'upgrades'
	text('Time: ' + Math.floor(alarm / 60 + 1), 250, 50);
		text('Coins: ' + coins, 25, 25);

}
function screen1() {
	animate();
	//animation of the game and tiles
	jimmy.y = 500;
	jimmy.x = 100;





let end = new Sprite(2700, 500, 100, 50, STATIC);
end.text = 'This is the end' + '\n' + 'for now... come back in a few days for the boss fight!'
	monster.physics = DYN;
	monster.x = 800;



	tilesGroup = new Tiles(
		//tile initialization and code
		[
			'......................................ccc.......s',
			'......................................ccc......s',
			'................................c.....www....ws',
			'................................w...........w',
			'...........................................w',
			'........................b.................w',
			'........................w.....c.....c....w',
			'...........................c..w.....w.c',
			'...................w.......w..........w.ccccc',
			'...........cs...wwwwwww............wcscsc.s.',
			'.......cwsc.cs....w.cccccccc............wwwwwwssssww..........w........................w',
			'......cw..scc.s....wwwwwwwww..................wwww.w.....w....w........................w',
			'ccccccw....sc.cs.............w....................w...........w.....w...............w..w',
			'cccccw..........cccccccccc..w.w.cscscscscccc......wsssssssssssw....www.....www.....www.w.',
			'========================================================================================='
		],
		0,
		20,
		40,
		40,

	);

}
function animate() {
	timer();
	requestAnimationFrame(animate);
	console.log('animating');

}
function timer() {
	//timer function that controls the game time and respawn
	alarm--;
	console.log(alarm);

	if (alarm <= 0) {
		if (jimmy.x > -1000) {
			jimmy.y = 500;
			jimmy.x = 100;
			alarm = time * 60;
		}
	}


}
function jump() {
	//jump function multi-purposed to jumping and boosting off the boss
	jimmy.y--;
	jimmy.vel.x = 0;
	jimmy.vel.y = -jumpP;
}
function wallBoost() {
	//might use at some point but not currently
	for (i = 0; i < 5; i++) {
		jimmy.vel.y = -5 / i
	}
}
let i = 0;
function upgrade() {
	//upgrade screen function that sets the upgrade screen and buttons
	alarm = 0;
	timing.x = -5000;
	console.log("upgrading");
	jimmy.y = -1000;
	timing.layer = 1;
	timing.visible = true;
	//timing.draw();



	button.x = 50;
	
	if (jimmy.x < -1000) {
		jimmy.x = 100;
		jimmy.y = 250;
		alarm = time * 60;

	} else {
		reset();
	}





}
//coin remove and boot remove
function coinRemove(jimmy, coinCollected) {
	coins++;
	coinCollected.remove();
}
function bootRemove(jimmy, bootCollected) {
	bootCollected.remove();
	stomp = true;
}

function reset() {
	//resets jimmys position
	jimmy.x = -5000;
	jimmy.y = 0;

}
function bossScene() {
	//still needs work but technically finished
}