let wood, squirrel, treats, homeTile, textX, textY, groundSensor;
let points = '0';
let plusMinus = '';
let instructions = 'Get your treats back!';
let direction = 'Use arrow keys or WASD to move';
let done = '';
let squirrelImg, berryImg, fly;
let tree, final;

function preload(){
	squirrelImg = loadImage('imgs/squirrel.png');
	berryImg = loadImage('imgs/berry.png');
	tree = loadImage('imgs/lalala.png');
	final = loadImage('imgs/glory.png');
	fly = loadImage('imgs/flying.png'); //tried to do animation but it didn't work 
	//and i don't have time so this is just here
}

function setup(){
	createCanvas(1000,800);
	world.gravity.y = 6;
	
	//tiles
	wood = new Group();
	wood.w = 100;
	wood.h = 25;
	wood.color = '#712C04'
	wood.tile = 'w';
	wood.physics = STATIC;

	homeTile = new Group();
	homeTile.w = 100;
	homeTile.h = 25;
	homeTile.color = '#712C04'
	homeTile.tile = 'h';
	homeTile.physics = STATIC;

	tilesGroup = new Tiles(
		[
			'..w......',
			'........w.',
			'.w.....w..',
			'....hw....',
			'..w.......',
			'.w....w...',
			'.........w',
			'..ww...w.',
			'.w....w...',
			'.....w...w',
		],
		0,100,
		wood.w+1,wood.h+50
	);

	treats = new Group(); //sprite to collect
	treats.w = 30;
	treats.h = 30;
	treats.image = berryImg;
	berryImg.resize(60,60);
	new treats.Sprite(200,50);
	new treats.Sprite(800,120);
	new treats.Sprite(100,420);
	new treats.Sprite(290,570);
	new treats.Sprite(890,470);
	new treats.Sprite(600,630);
	new treats.Sprite(900,700);
	
	squirrel = new Sprite(400,288); //our main character
	squirrel.h = 48
	squirrel.image = squirrelImg;
	squirrelImg.resize(100,100); 
	squirrel.overlaps(treats,collect);

	groundSensor = new Sprite(400,296,44,48,'n'); //for better jumping!
	groundSensor.visible = false;
	groundSensor.mass = 0.01;
	let j = new GlueJoint(squirrel, groundSensor);
	j.visible = false;
}

function update(){
	background(tree);
	//buncha text setup idk what's happening im tired
	textSize(26);
	text(instructions,600,80,30);
	textSize(24);
	text('Score:',600,120);
	text(points,675,120);
	textSize(22);
	text(plusMinus,textX,textY);
	textSize(20);
	text(direction,200,190,10);
	
	movement();
	restart();
	if(treats.length==0){
		end();
	}
	squirrel.rotation = 0;
}

//FUNCTIONS
function movement(){ //jump, left, right
	if(groundSensor.overlapping(wood)||groundSensor.overlapping(homeTile)){
		if(kb.pressing('up')){
			squirrel.vel.y = -5.5;
			direction = '';
		}
	}
	if(kb.pressing('left')){
		squirrel.x -= 2;
		direction = '';
	}
	if(kb.pressing('right')){
		squirrel.x += 2;
		direction = '';
	}
}

function restart(){ //so you don't have to restart if you fall
	if (treats.length>=1){
		if(squirrel.y>1000){
			squirrel.y = 288;
			squirrel.x = 400;
				if(points>=1){
				points --;
				plusMinus = 'Oops! -1';
				textX = 250;
				textY = 270;
			}
		}	
	}
	
}

function collect(squirrel,treat){
	treat.delete();
	points ++;
	plusMinus = '+1';
	textX = treat.x;
	textY = treat.y - 20;
}


function end(){
	instructions = 'Now bring the treats back home';
	plusMinus = '';
	if(squirrel.y>1000 && squirrel.x<270){ //silly regeneration because it can't respawn you at home
		squirrel.x = 110;
		squirrel.y = 615;
	} else if(squirrel.y>1000 && squirrel.x >690){
		squirrel.x = 920;
		squirrel.y = 700;
	} else if(squirrel.y>1000 && squirrel.x<690){
		squirrel.x = 490;
		squirrel.y = 700;
	}	
	if(squirrel.colliding(homeTile)){
		done='true'; //triggers final phase of the game- you've succeeded
	}
	if(done == 'true'){
		instructions = 'Yay peace has been restored congratulations!!';
		direction = 'You can fly around now ;)'; //silly ending stuff
		background(final);
		textSize(26);  
		text(instructions,600,80,30);
		textSize(20);
		text(direction,200,190,10);
		world.gravity.y = 3;
		if (kb.pressing('up')){
			squirrel.vel.y = -3;
		}
	}	
}
