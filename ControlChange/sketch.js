new Q5();

//object vars
let player;
let floor;
let changefloor;
let airfloor;
let invisible;
let startportal;
let endportal;

//img vars
let endportalimg;
let floorimg;
let startportalimg;

//state vars
let kbup;
let kbright;
let kbleft;
let rand;
let kbchange = false;
let onfloor;


//tile vars
let floortiles;
let endportaltile;
let startportaltile;
let playertiles;
let floorgroup;
let floorgroup2;
let menutile;

//stage stats
let stage1complete = false;
let stage2complete = false;
let stagenumber = 0;

//menu vars
let firstbutton;
let secondbutton;
let intro;

function preload(){
	startportalimg = loadImage('images/portal.png');
	endportalimg = loadImage('images/portal2.png');
	floorimg = loadImage('images/floor.png');
}


function setup(){
	new Canvas(1000,1000);
	world.gravity.y = 15;



	//intro
	intro = new Group();
	intro.tile = 'i';
	intro.w = 380;
	intro.h = 100;
	intro.physics = STA;
	intro.text = 'Control Change!';
	intro.textSize = 50;
	intro.color = ('yellow');

	//first stage button
	firstbutton = new Group();
	firstbutton.tile = '1';
	firstbutton.w = 300;
	firstbutton.h = 50;
	firstbutton.physics = STA;
	firstbutton.text = 'Stage 1';
	firstbutton.textSize = 30;
	firstbutton.color = ('white');

	//second stage button
	secondbutton = new Group();
	secondbutton.tile = '2';
	secondbutton.w = 300;
	secondbutton.physics = STA;
	secondbutton.h = 50;
	secondbutton.text = 'Stage 2';
	secondbutton.textSize = 30;
	secondbutton.color = ('white');





	
	//floor
	floor = new Group();
	floor.physics = STA;
	floor.color = ('green');
	floor.tile = 'f';
	floor.h = 20;
	floor.w = 1000;

	//airfloor
	airfloor = new Group();
	airfloor.physics = STA;
	airfloor.tile = 'o';
	airfloor.h = 15;
	airfloor.w = 100;
	airfloor.img = floorimg;
	airfloor.scale = 2;

	//invisible floor
	invisible = new Group();
	invisible.physics = STA;
	invisible.visible = false;
	invisible.tile = '0';
	invisible.h = 34;
	invisible.w = 202;

	//control change floor
	changefloor = new Group();
	changefloor.physics = STA;
	changefloor.color = ('gray');
	changefloor.tile = 'c';
	changefloor.h = 30;
	changefloor.w = 200;

	
	//start portal
	startportal = new Group ();
	startportal.tile = 's';
	startportal.h = 16;
	startportal.w = 13;
	startportal.scale = 6;
	startportal.physics = STA;
	startportal.img = startportalimg;

	//end portal
	endportal = new Group();
	endportal.tile = 'e';
	endportal.physics = STA;
	endportal.h = 16;
	endportal.w = 13;
	endportal.img = endportalimg;
	endportal.scale = 6;
	menustage();
}


function update(){
	background('skyblue');

	//first stage
	if (stagenumber == 1 || stagenumber == 2){

		//control explanation
		textSize(30);
		text("up = "+ kbup,100,70);
		text("right = "+ kbright,100,100);
		text("left = "+ kbleft,100,130);
	

		//playermovement
		if (player.colliding(floor)||player.colliding(changefloor)||player.colliding(airfloor)){
			player.velocity.y = 0;
		}
		//left and right
		if (kb.pressing(kbleft)) {
			player.vel.x = -5;
		}
		else if (kb.pressing(kbright)) {
			player.vel.x = 5;
			}	
		else {
			player.vel.x = 0;
		}

		//player out of the map
		if (player.x <= -50||player.x >= 1050){
			player.x = 800;
			player.y = 900;
		}
		//on floor
		if (player.colliding(floor)||player.colliding(changefloor)||player.colliding(airfloor)){
			onfloor = true;
		}
		else{
			onfloor = false;
		}
		
		//up
		if (kb.pressing(kbup) && onfloor == true) {
			player.vel.y = -10;
		}


		//change keys
		if ((player.overlaps(invisible))){
			kbchange = true;
			rand = Math.floor(random(0,4));
		}
		if (kbchange == true && (rand==0)) {
			kbup = 'up';
			kbright = 'left';
			kbleft = 'right';
		}
		else if (kbchange == true && (rand==1)){
			kbup = 'right';
			kbright = 'down';
			kbleft = 'up';
		}
		else if (kbchange == true && (rand==2)){
			kbup = 'down';
			kbright = 'up';
			kbleft = 'left';
		}
		else if(kbchange == true && (rand==3)){
			kbup = 'left';
			kbright = 'down';
			kbleft = 'right';
		}
		else {
			kbup = 'up';
			kbright = 'right';
			kbleft = 'left';
		}

	}
	//stage 1 portal
	if (stagenumber == 1){
		text('STAGE 1',800,70);

		//start portal
		if (player.overlaps(startportal)){
			stagenumber = 0;
			menustage();
		}

		//end portal
		if (player.overlaps(endportal)){
			stage1complete = true;
			stagenumber = 0;
			menustage();
		}
	}

	//stage 2 portal
	if (stagenumber == 2){
		text('STAGE 2',800,70);

		//start portal
		if (player.overlaps(startportal)){
			stagenumber = 0;
			menustage();
		}

		//end portal
		if (player.overlaps(endportal)){
			stage2complete = true;
			stagenumber = 0;
			menustage();
		}
	}

	//menu stage
	if(stagenumber == 0){
		if (firstbutton.mouse.presses()){
			stagenumber = 1;
			first();
		}

		if (secondbutton.mouse.presses()){
			console.log('the mouse pressing works');
			stagenumber = 2;
			second();
			console.log('second again');
		}


		//complete stage
		if (stage1complete == true){
			firstbutton.color = ('gray')
		}
		if (stage2complete == true){
			secondbutton.color = ('gray')
		}
	}

}


//menu
function menustage(){
	allSprites.remove();

	menutile = new Tiles(
		[
			'i',
			'.',
			'1',
			'2',
			'.'
		]
		,500,200,0,100
	);


}

//1st stage
function first(){
	allSprites.remove();
	
	
	//player
	player = new Sprite(800,900);
	player.bounciness = -10;
	player.rotationLock =true;


	//floor tiles
	floortiles = new Tiles(
		[
			'f'
		]
		, 500, 940
	);

	//floor group
	floorgroup = new Tiles(
		[
			'.o..',
			'...c',
			'.o..',
			'..o.',
			'c...'
		]
		, 200, 150, changefloor.w, changefloor.h + 130
	);


	floorgroup2 = new Tiles(
		[
			'....',
			'...0',
			'....',
			'....',
			'0...'
		]
		,200, 150, changefloor.w, changefloor.h + 130
	);

	endportaltile = new Tiles(
		[
			'.e..',
			'....',
			'....',
			'....',
			'....'

		]
		,150, 85, changefloor.w, changefloor.h + 130
	);

	startportaltile = new Tiles(
		[
			's'
		]
		,950,880, 0, 0
	);


}

//2nd stage
function second(){
	allSprites.remove();
	console.log('second() function called!');
	
	//floor tiles
	floortiles2A = new Tiles(
		[
			'f'
		]
		, 500, 940
	);

	//floor group
	floorgroup2B = new Tiles(
		[
			'.o..',
			'...c',
			'.o..',
			'..o.',
			'c...'
		]
		, 200, 150, changefloor.w, changefloor.h + 130
	);


	floorgroup2C = new Tiles(
		[
			'....',
			'...0',
			'....',
			'....',
			'0...'
		]
		,200, 150, changefloor.w, changefloor.h + 130
	);

	endportaltile2D = new Tiles(
		[
			'.e..',
			'....',
			'....',
			'....',
			'....'

		]
		,150, 85, changefloor.w, changefloor.h + 130
	);

	startportaltile2E = new Tiles(
		[
			's'
		]
		,950,880, 10, 10
	);

}