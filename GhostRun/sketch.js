let hollowknightImg, score = 1, fireballs,  gameOver = false, standImg, knight, leftknightImg, ground, groundImg, ghost, ghostImg, tilesgroup, platform, platformImg;
let cooldown = 0;
//variables
function preload() {
	hollowknightImg = loadImage('Images/knight.png');
	leftknightImg = loadImage('Images/leftknight.png');
	platformImg = loadImage('Images/platform.png');
	ghostImg = loadImage('Images/ghost.png');
	fireballImg = loadImage('Images/ball.png');
	//images preloaded
}

function setup() {
	new Canvas(1000, 2000);
	knight = new Sprite();
	world.gravity.y = 15;
	knight.x = 375;
	knight.y = 650;
	knight.w = 45;
	knight.rotationLock = true;
	knight.physics = DYN;
	knight.h = 130 ;
	knight.img = hollowknightImg;
	hollowknightImg.resize(450, 425);
	//player properties
	platform = new Group();
	platform.w = 150;
	platform.h = 35;
	platform.tile = '=';
	platformImg.resize(320, 320);
	platform.img = platformImg;
	platform.img.offset.y = -55;
	platform.physics = STA;
	platform.x = 150;
	//pink platform properties





	ground = new Sprite();
	ground.x = 700;
	ground.y = 925;
	ground.w = 2200;
	ground.physics = STA;
	//floor properties
	
	ground2 = new Sprite();
	ground2.x = 1835;
	ground2.y = 925;
	ground2.h = 2200;
	ground2.w = 70;
	ground2.physics = STA;
	//right wall properties
	ground3 = new Sprite();
	ground3.x = -400;
	ground3.y = 925;
	ground3.h = 2200;
	ground3.w = 70;
	ground3.physics = STA;
	//left wall properties
	ground4 = new Sprite();
	ground4.x = 700;
	ground4.y = -180;
	ground4.w = 2200
	ground4.h = 100 
	ground4.physics = STA;
	//roof properties

	//floor
	tilesgroup = new Tiles(
		[
			'= = = = = = ',


		],
		100,
		120,
		platform.x,
		platform.y,


	)
	tilesgroup = new Tiles(
		[
			'=  =  =  =',


		],
		100,
		325,
		platform.x,
		platform.y,



	)
	tilesgroup = new Tiles(
		[
			'=    =   =',


		],
		100,
		700,
		platform.x,
		platform.y,
		//second platform
	)
	tilesgroup = new Tiles(
		[
			'  =    =  =',


		],
		100,
		850,
		platform.x,
		platform.y,
		//bottom platform

	)

	tilesgroup = new Tiles(
		[
			'  =    = ',


		],
		100,
		525,
		platform.x,
		platform.y,
	)
// each layer of tiles for player to jump on

	ghost = new Sprite();
	ghost.x = -100;
	ghost.y = 700;
	ghost.img = ghostImg;
	ghost.h = 120;
	ghost.w = 60;
	ghostImg.resize(325, 325);
	ghost.rotationLock = true;
	//ghost chasing player

	fireballs = new Group();
	fireballs.r = 50;
	fireballs.physics = KIN;
	fireballs.overlaps(platform);
	fireballs.overlaps(ground);
	fireballs.overlaps(knight);
	fireballs.image = fireballImg;
	fireballImg.resize(300,300);
	//fireball properties
	
}













function update() {

	playermovement();
	clear();
	background('lightblue');
	textSize (20)
	Playerscore();
	ghostfollow();
	
	text('Survive the Ghost using AD Jump and click to shoot', 250, 250);
	//game instructions

	camera.x = knight.x;
	
	if (score > 30){
		ghost.speed = 6
	}
	if (score > 45 ){
		ghost.speed = 8
	}

	if (ghost.overlapping(knight)) {
		death();
	}
	//death sequence
	if (score > 60){
		win();
	}
	//win sequence
	if (score > 59){
		fast();
	}
	//2x speed sequence
	
		
	
	
	if (mouse.presses()&& cooldown <=0) {
		let fireball = new fireballs.Sprite()
		fireball.x = knight.x;
		fireball.y = knight.y;
		fireball.mass = 1;
		fireball.life = 30;
		fireball.direction = fireball.angleTo(ghost);
		fireball.speed = 15;
		cooldown = 200;
	
		

	}
cooldown--;
//fireball shooting sequence
}



function playermovement() {
	if (kb.presses('space')) {
		knight.velocity.y = -9;

	} else if (kb.pressing('left')) {
		knight.velocity.x = -4;
		knight.img = leftknightImg;
		
	leftknightImg.resize(450, 425)
	} else if (kb.pressing('right')) {
		knight.velocity.x = 4;
		knight.img = hollowknightImg;
	} else if (kb.pressing('left')) {
		knight.img = leftknightImg;

	}
	//player movement


}
function ghostfollow() {

	ghost.direction = ghost.angleTo(knight);
	ghost.speed = 4;
	ghost.overlaps(platform);
	ghost.overlaps(ground);
	ghost.overlaps(ground2);
	ghost.overlaps(ground3);
	ghost.overlaps(ground4);
}
//ghost following player and overlaping

function death() {
	background('black');
	fill('red');
	textSize(100);
	textAlign(CENTER, CENTER);
	text("Game Over", 400, 400);
	knight.visible = false;
	ghost.speed = 0;
	knight.speed = 0;
	world.gravity.y = 0;
	ghost.draw;
	score = -100000;
	cooldown = 1000000;



}
//death sequence properties

function win(){
	background('black');
	fill('green');
	textSize(100);
	textAlign(CENTER, CENTER);
	text("YOU WIN!", 400, 400);
	knight.visible = false;
	ghost.x = 10000000000
	world.gravity.y = 0;
	ghost.draw;
	cooldown = 1000000;
}
//win sequence properties


function Playerscore() {
	textSize(20);
	fill(0);
	text('Score: ', 40, 50);
	text(score, 100, 50);
	if (frameCount % 60 == 0) {
		score++;
	}

}
//player score properties
function fast(){
	ghost.speed = 10;
	
}
//2x speed properties



