let Astronaut, AstronautImg, vortex, vortexImg, vortex2 ;
let StarGrounds, StarGroundImg, groundSensor, groundSensorImg;
let StarRamps, StarRampImg, tilesGroup;
let timer=0;

function preload() {
	AstronautImg=loadImage('assets/Astronaut.png');
	Black_holeImg=loadImage('assets/Black_Hole.png');
	StarGroundImg=loadImage('assets/StarGround.png');
	StarRampImg=loadImage('assets/StarRamp.png');
	vortexImg=loadImage('assets/Black_Hole.png');
	groundImg=loadImage('assets/groundSensor.png');
}

function setup() {
new Canvas(1000,1000);
world.gravity.y = 10;
fill(255);
frameRate(60);
//map material
StarGrounds=new Group();
StarGrounds.w=64;
StarGrounds.h=64;
StarGrounds.image=StarGroundImg;
StarGroundImg.resize(128,128);
StarGrounds.tile='=';
StarGrounds.friction=0;
StarGrounds.physics='STATIC';
//StarGrounds.debug = true;	

//Vortex Sprites
vortex=new Sprite();
vortex.w=30;
vortex.h=30;
vortex.image=vortexImg;
vortexImg.resize(256,256);

vortex2=new Sprite();
vortex2.w=30;
vortex2.h=30;
vortex2.image=vortexImg;
vortexImg.resize(256,256);
vortex2.x=25;
vortex2.y=-70;
//vortex2.physics=STATIC;
vortex2.gravity=0;
//vortex2.debug=true;

//Player Sprite
Astronaut=new Sprite();
Astronaut.w=32;
Astronaut.h=60;
Astronaut.r=32;
Astronaut.image=AstronautImg;
AstronautImg.resize(128,128);
Astronaut.x=150;
Astronaut.y=1300;
//Astronaut.debug = true;
Astronaut.mass=2.8;
//Ground Sensor
groundSensor=new Sprite(150,1330,32,5);
groundSensor.visible=false;
groundSensor.mass=0.01;
groundSensor.image=groundImg;
groundSensor.overlaps(allSprites);

let j= new GlueJoint(Astronaut,groundSensor);

tilesGroup=new Tiles(
[
	//map
	'=...............=.....................=.................===.....................=',
	'=...............=...............................................................=',
	'=...............=...............................................................=',
	'=...............=..............................................................==',
	'=...............=.........=.....................................................=',
	'=...............=.........=.....................................................=',
	'=.............===.........=..............=...........=====.......................',
	'=.........................=..............=..........===========..................',
	'===.......................=.........................=====================........',
	'=..==...........=.........=.........................=............................',
	'=....======================......................................................',
	'=..............................................................=====.............',
	'=.........................................................=....=.........=.......',
	'=.......................................................===....=.................',
	'=...=======================....................===========.....=.................',
	'=.........................=..........................=.........=.................',
	'=.........................=.........................=..........=.................',
	'=.........................=........................=...........=...=.............',
	'======================....=....................====............=.................',
	'=.........................=....................................=.................',
	'=.........................=....................................=................=',
	'=.........................=....................................=................=',
	'=================================================================================',
],
30,20,
StarGrounds.w,
StarGrounds.h,
)
}

function update() {
	clear();
	background('darkblue');
	textSize(20);
	text("WAD or Arrows to move, Left click to spawn vortex, r to reset",10,900);
	//Movement
	fill(255);
	text(timer,800,900);
	textSize(20);
	if(frameCount%60==0){
		timer++;
	}
	//Astronaut movement
	Astronaut.rotationLock=true;
	vortex.overlaps(Astronaut);

if (kb.pressing('left')) {
	Astronaut.vel.x = -5;
	Astronaut.rotation=330;
	groundSensor.rotation=90;
} else if (kb.pressing('right')) {
	Astronaut.vel.x = 5;
	Astronaut.rotation=30;
	groundSensor.rotaion=330;
} else {
	Astronaut.vel.x = 0;
	Astronaut.drag.x=10;
	Astronaut.rotation=0;
}


if(groundSensor.overlapping(StarGrounds)) {
	if (kb.presses('up')) {
		Astronaut.vel.y = -5;
}
}
//camera follow player
camera.x=Astronaut.x;
camera.y=Astronaut.y;
//vortex cosmetics
vortex.rotate(5,2);
vortex.overlaps(allSprites);
vortex2.rotate(5,2);
vortex2.vel.x=0;
vortex2.vel.y=0;
vortex2.x=25;
vortex2.y=-70;
//vortex movement
if(mouse.pressing()){
	Astronaut.attractTo(vortex, 11);
	Astronaut.drag.y=0;
	Astronaut.drag.x=0;
	groundSensor.attractTo(vortex, 11);
	groundSensor.drag.y=0;
	groundSensor.drag.x=0;
	vortex.x=mouse.x;
	vortex.y=mouse.y;
	vortex.vel.y=0;
	Astronaut.overlap(vortex);
} else {
	vortex.x=25;
	vortex.y=-70;
	vortex.vel.y=0;
}
//Astronaut direction
if (kb.presses('right')) { 
	Astronaut.scale.x=1;
	groundSensor.scale.x=1;
} else if (kb.presses('left')){
	Astronaut.scale.x=-1;
	groundSensor.scale.x=-1;
}
//Win conditions
if(vortex2.overlapping(Astronaut)){
	console.log("end");
	Astronaut.vel.y=0;
	Astronaut.vel.x=0;
	if(frameCount%60==0){
		timer--;
	}
	textSize(50);
	if(timer<34){
	text("NEW RECORD!",350, 250);
} else if(33<=timer && timer<=60){
	text("You Win!", 400, 250);
} else if(60<timer && timer<=100){
	text("(Record: 33 seconds)",300,350);
	textSize(30);
	text("meh, you win I guess. I could've done better", 200, 250);
} else if(timer>100) {
	text("Too Slow. Run it Back (r to reset)",150,250);
}
}
//Dev tool
// if(kb.pressed('~')){
// 	Astronaut.x=0;
// 	Astronaut.y=-50;
// }

//Reset
if(kb.presses('r')){
	Astronaut.x=150;
	Astronaut.y=1300;
	timer=0;
}
}
//ADDITIONS:
//Distance joint between vortex and astronaut