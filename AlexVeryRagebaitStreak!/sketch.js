//variables + sprite variables
let floor, boulder, lasers, laserImg, spikes, spikeImg, boulderImg, floorImg, wall, downspikes, downSpikeImg, leftspikes, leftSpikeImg, rightspikes, rightSpikeImg, finish, finishImg, checkpoint, checkpointImg;
let time, jump;
let timerisDone = false;
let startTime = 30;
let respawnx = 50;
let respawny = 600;
let lives = 20
let win = false;

//image loader
function preload(){
	laserImg = loadImage('Images/laser.png');
	spikeImg = loadImage('Images/spike.png');
	downSpikeImg = loadImage('Images/downspike.png');
	leftSpikeImg = loadImage('Images/leftspike.png');
	rightSpikeImg = loadImage('Images/rightspike.png');
	boulderImg = loadImage('Images/boulder.png');
	floorImg = loadImage('Images/floor.png');
	finishImg = loadImage('Images/finish.png');
	checkpointImg = loadImage('Images/checkpoint.png');

}

//sprite maker, and tile/image loader/maker
function setup(){
	new Canvas(2000, 2000);
	frameRate(60);
	world.gravity.y = 10;
	
	// floor platform creator
	floor = new Group();
	floor.w = 32;
	floor.h = 36;
	floor.img = floorImg;
	floorImg.resize(110, 110);
	floor.tile = 'f';
	floor.physics = STATIC;
	
	//barrier
	wall = new Sprite();
	wall.x = -1;
	wall.y = 350;
	wall.h = 800;
	wall.w = 2;
	wall.physics = STATIC;
	wall.color = 'black';

	//collideable lasers
	lasers = new Group();
	lasers.w = 16;
	lasers.h = 16;
	lasers.img = laserImg;
	laserImg.resize(100, 100);
	lasers.overlaps(allSprites);
	
	// collideable spikes
	spikes = new Group();
	spikes.w = 16;
	spikes.h = 16;
	spikes.img = spikeImg;
	spikeImg.resize(100, 100);
	spikes.tile = 's';
	spikes.physics = STATIC;
	

	downspikes = new Group();
	downspikes.w = 16;
	downspikes.h = 16;
	downspikes.img = downSpikeImg;
	downSpikeImg.resize(100, 100);
	downspikes.tile = 'd'
	downspikes.physics = STATIC;

	rightspikes = new Group();
	rightspikes.w = 16;
	rightspikes.h = 16;
	rightspikes.img = rightSpikeImg;
	rightSpikeImg.resize(100, 100);
	rightspikes.tile = 'r';
	rightspikes.physics = STATIC;

	leftspikes = new Group();
	leftspikes.w = 16;
	leftspikes.h = 16;
	leftspikes.img = leftSpikeImg;
	leftSpikeImg.resize(100, 100);
	leftspikes.tile = 'l';
	leftspikes.physics = STATIC;

	finish = new Group();
	finish.w = 0.1;
	finish.h = 0.1;
	finish.img = finishImg;
	finishImg.resize(200, 200);
	finish.tile = 'F';
	finish.physics = STATIC;
	finish.debug = true;

	checkpoint = new Group();
	checkpoint.w = 1;
	checkpoint.h = 1;
	checkpoint.img = checkpointImg;
	checkpointImg.resize(200, 200);
	checkpoint.tile = 'c';
	checkpoint.physics = STATIC;

	//character user
	boulder = new Sprite();
	boulder.x = 50;
	boulder.y = 600;
	boulder.w = 50;
	boulder.h = 50;
	boulder.rotation = 0;
	boulder.img = boulderImg
	boulderImg.resize(100, 100);
	boulder.overlaps(checkpoint);
	boulder.overlaps(finish);
	
	
// tile loader
	tilesGroup = new Tiles(
		[
			'...............................................................f......................f',
			'.',
			'...............................................................f......................f',
			'.',
			'...............................................................f......................f',
			'.',
			'...............................................................f......................f',
			'.',
			'...............................................................f......................f',
			'.',
			'...............................................................f......................f',
			'.',
			'...............................................................f......................f',
			'.........................................................................................................................................................f..l',
			'...............................................................f......................f',
			'.........................................................................................................................................................f',
			'...............................................................f......................f.....................................................................l',
			'.........................................................................................................................................................f',
			'...............................................................f......................f',
			'.........................................................................................................................................................f.............f..f..f..f..f..f..f',
			'...............................................................f......................f',
			'.........................................................................................................................................................f................f',
			'...............................................................f......................f',
			'.........................................................................................................................................................f..f.............f',
			'......................................................................................f',
			'...............................................................d.........................................................................................f................f',
			'......................................................................................f',
			'.........................................................................................................................................................f.............f..f...........s..s..s..s..s..s..s..s..s..s........s..s..s',
			'......................................................................................f',
			'.........................................................................................................................................................f................f',
			'......................................................................................f...............................................................................................f..f..f..f..f..f..f..f..f..f........f..f..f',
			'........................................................................s................................................................................f..f.............f',
			'......................................................................................f',
			'..........................................................................................................................................................................f',
			'.....................................................r..f..f............f..l..........f',
			'...............................f..ff....................f..f..............................................f..f..f..f..f................................................f..f',
			'........................................................f..f............f.............................................................................................................s..s..s..s..s..s..s..s..s......s..s..s..s..s',
			'.....................................................r.....................l..........d...................................................................................f',
			'............................f..f..ff....................f..f............f.................................d..d..d..d..d',
			'.........................................................................................................................................................f................f...........f..f..f..f..f..f..f..f..f......f..f..f..f..f',
			'.....................................................r..................f..l',
			'.............s..s........f..f..f..ff....................f..f.........................................................................f',
			'........................................................................f',
			'.....................................................r.....................l..................c................................................................................................................',
			'f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.ff....................f..f............f',
			'...........................................................................................................f....f.....f',
			'f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.ff.................r..f..f............f..l............f.f.f..f..f..f',
			'..............................................................................................................................................................................................................f..f..f..f..f..f..f..f............................F',
			'f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.ff....................f..f............f..............................................................................................................................................................................',
			'.....................................................r.....................l..............f',
			'f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.ff....................f..f............f..................................................................................................................................................................................f..f..f..f',
			'..........................................................................................f............................................................................................................................................................',
			'f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.ff.................r..f..f............f',
			'......................................s..s..s..s..s..s........s..s..ss.....s..s..s..s..s..f..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s..s',
			'f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.f.ff....................f..f............f',
			
		],
		25,
		25,
		spikes.w + 1,
		spikes.h + 1,
		leftspikes.w + 1,
		leftspikes.h + 1,
		rightspikes.w + 1,
		rightspikes.h + 1,
		floor.w + 1,
		floor.h + 1,
		finish.w + 1,
		finish.h + 1
	)
	

}

//code logic


function update(){
	background('white');
	camera.x = boulder.x + 500
	if(kb.presses('space') && boulder.colliding(floor)) {
		boulder.vel.y = -5;
		jump = true;
	}

	if(kb.presses('w') && boulder.colliding(floor)) {
		boulder.vel.y = -5;
		jump = true;
	}


	if(kb.pressing('d')){
		if(kb.pressing('shift')){
			boulder.x += 5;
		} else{
			boulder.x += 2.5;
		}
		
	}
	
	if(kb.pressing('a')){
		if(kb.pressing('shift')){
			boulder.x -= 5;
		} else{
			boulder.x -= 2.5;
		}
	}

	// falling lasers code
	if(frameCount%22 == 0){
		laser = new lasers.Sprite();
		laser.x = 200;
		laser.y = 100;
		laser.life = 25;
		laser.velocity.y = 35;
	}

	if(frameCount%30 == 0){
		laser1 = new lasers.Sprite();
		laser1.x = 560;
		laser1.y = 100;
		laser1.life = 25;
		laser1.velocity.y = 35;
	}

	if(frameCount%40 == 0){
		laser2 = new lasers.Sprite();
		laser2.x = 2770;
		laser2.y = 100;
		laser2.life = 25;
		laser2.velocity.y = 35;
	}

	//user character resets from collision code
	if(boulder.collides(spikes)){
			boulder.delete();
			lives = lives - 1;
			boulder = new Sprite();
			boulder.x = respawnx;
			boulder.y = respawny;
			boulder.w = 50;
			boulder.h = 50;
			boulder.rotation = 0;
			boulder.img = boulderImg
			boulderImg.resize(100, 100);
			
	}

	if(boulder.collides(leftspikes)){
		boulder.delete();
		lives = lives - 1;
		boulder = new Sprite();
		boulder.x = respawnx;
		boulder.y = respawny;
		boulder.w = 50;
		boulder.h = 50;
		boulder.rotation = 0;
		boulder.img = boulderImg
		boulderImg.resize(100, 100);
	}

	if(boulder.collides(rightspikes)){
		boulder.delete();
		lives = lives - 1;
		boulder = new Sprite();
		boulder.x = respawnx;
		boulder.y = respawny;
		boulder.w = 50;
		boulder.h = 50;
		boulder.rotation = 0;
		boulder.img = boulderImg
		boulderImg.resize(100, 100);
	}

	if(boulder.collides(downspikes)){
		boulder.delete();
		lives = lives - 1;
		boulder = new Sprite();
		boulder.x = respawnx;
		boulder.y = respawny;
		boulder.w = 50;
		boulder.h = 50;
		boulder.rotation = 0;
		boulder.img = boulderImg
		boulderImg.resize(100, 100);
	}

	if(boulder.collides(laser1)){
		boulder.delete();
		lives = lives - 1;
		boulder = new Sprite();
		boulder.x = 50;
		boulder.y = 600;
		boulder.w = 50;
		boulder.h = 50;
		boulder.rotation = 0;
		boulder.img = boulderImg
		boulderImg.resize(100, 100);
	}

	if(boulder.collides(laser2)){
		boulder.delete();
		lives = lives - 1;
		boulder = new Sprite();
		boulder.x = respawnx;
		boulder.y = respawny;
		boulder.w = 50;
		boulder.h = 50;
		boulder.rotation = 0;
		boulder.img = boulderImg
		boulderImg.resize(100, 100);
	}

	if(boulder.collides(lasers)){
		boulder.delete();
		lives = lives - 1;
		boulder = new Sprite();
		boulder.x = 50;
		boulder.y = 600;
		boulder.w = 50;
		boulder.h = 50;
		boulder.rotation = 0;
		boulder.img = boulderImg
		boulderImg.resize(100, 100);
	}

	// checkpoint, lives, and finish code logic
	if(lives === 0){
		boulder.delete();
		textSize(32);
		text("YOU LOST!?, skill issue.", 300, 500)
		camera.x = STATIC;
		keyboard.presses('a', 'shift' && 'd') = false;
	}

	if(boulder.overlapping(checkpoint)){
		respawnx = 1600;
		respawny = 600;
	}

	if(boulder.overlapping(finish)){
		textSize(32);
		text("YOU WIN! CONGRATULATIONS", 300, 500);
		win = true;
	}

	
	// direction code and prevents boulder from rotating
	boulder.rotation = 0;
	textSize(12);
	text("A to move left, D to move right, hold SHIFT with A or D to move fast, SPACE or W to jump, lives: " + lives, camera.x * 0.1, 200);
}


