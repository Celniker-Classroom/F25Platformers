new Q5();
function preload(){
BrickImg = loadImage('Images/Brick.png');
PathImg = loadImage('Images/Path.png');
BuildImg = loadImage('Images/Build.png');
CeilingImg = loadImage('Images/Ceiling.png');
CeilingUImg = loadImage('Images/CeilingU.png');
BackImg = loadImage('Images/Back.png');
PFPImg = loadImage('Images/PFP.png');
BoxImg = loadImage('Images/Boxo.png');
BladeImg = loadImage('Images/Blade.png');
DoorImg = loadImage('Images/Door.png');
Deco1Img = loadImage('Images/Deco1.png');
Deco2Img = loadImage('Images/Deco2.png');
Deco3Img = loadImage('Images/Deco3.png');
Deco4Img = loadImage('Images/Deco4.png');
MidiImg = loadImage('Images/Midip.png');
TreeImg = loadImage('Images/Tree.png');
BCeilImg = loadImage('Images/BCeil.png');
BUCeilImg = loadImage('Images/BUCeil.png');
LighterImg = loadImage('Images/Lighter.png');
PillarImg = loadImage('Images/Pillar.png');
TorchImg = loadImage('Images/Torch.png');
megapImg = loadImage('Images/megap.png');
endImg = loadImage('Images/End.png');
titleImg = loadImage('Images/Title.png');
StinkyImg = loadImage('Images/Stinky.png');
DScreenImg = loadImage('Images/DS.png');
}
function setup(){
new Canvas(1000,5000);
world.gravity.y = 10;








//floor
ground = new Sprite(0,873,6300,50, 'STATIC');
ground.color = ('black');


//ceiling
topsie = new Sprite(0, 90, 5000, 10, 'STATIC');
topsie.color = ("black");

//bigdoor collision
doorc = new Sprite(2130,225,60,450,"STATIC");
doorb = new Sprite(2070,440,60,100,'STATIC');

//tree collision
tree = new Sprite(3200,600,200,1000, 'STATIC');
tree2 = new Sprite(3100,750, 300,100, 'STATIC');
tree2.rotation = -47;


//background tiling
Brick = new Group();
Brick.w = 16;
Brick.h = 16;
Brick.img = BrickImg;
BrickImg.resize(200,100 );
Brick.tile = '=';
Brick.physics = NONE;

Build = new Group();
Build.w = 16;
Build.h = 16;
Build.img = BuildImg;
BuildImg.resize(200,100 );
Build.tile = 'W';
Build.physics = NONE;


Ceiling = new Group();
Ceiling.w = 16;
Ceiling.h = 16;
Ceiling.img = CeilingImg;
CeilingImg.resize(200,100 );
Ceiling.tile = 'C';
Ceiling.physics = NONE;

CeilingU = new Group();
CeilingU.w = 16;
CeilingU.h = 16;
CeilingU.img = CeilingUImg;
CeilingUImg.resize(200,100 );
CeilingU.tile = 'U';
CeilingU.physics = NONE;

Path = new Group();
Path.w = 16;
Path.h = 16;
Path.img = PathImg;
PathImg.resize(200,100 );
Path.tile = '-';
Path.physics = NONE;

Deco1 = new Group();
Deco1.w = 16;
Deco1.h = 16;
Deco1.img = Deco1Img;
Deco1Img.resize(200,100 );
Deco1.tile = '1';
Deco1.physics = NONE;

Deco2 = new Group();
Deco2.w = 16;
Deco2.h = 16;
Deco2.img = Deco2Img;
Deco2Img.resize(200,100 );
Deco2.tile = '2';
Deco2.physics = NONE;

Deco3 = new Group();
Deco3.w = 16;
Deco3.h = 16;
Deco3.img = Deco3Img;
Deco3Img.resize(200,100 );
Deco3.tile = '3';
Deco3.physics = NONE;

Deco4 = new Group();
Deco4.w = 16;
Deco4.h = 16;
Deco4.img = Deco4Img;
Deco4Img.resize(200,100 );
Deco4.tile = '4';
Deco4.physics = NONE;

BCeil= new Group();
BCeil.w = 16;
BCeil.h = 16;
BCeil.img = BCeilImg;
BCeilImg.resize(200,100 );
BCeil.tile = 'B';
BCeil.physics = NONE;

BUCeil= new Group();
BUCeil.w = 16;
BUCeil.h = 16;
BUCeil.img = BUCeilImg;
BUCeilImg.resize(200,100 );
BUCeil.tile = 'Q';
BUCeil.physics = NONE;

tilesGroup = new Tiles([
	'UUUUUUUUUUUUUUUUUUUUUUUUUUUUUQWWWWW',
	'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCBWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WW12WWWW12WWWWW12WWWWWWWWWWWWWWWWWW',
	'WW34WWWW34WWWWW34WWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
	'-----------------------------------',
	'===================================',
	'==================================='
],
	-230,20,
	Brick.w + 84,
	Brick.h + 34,
);



//instructions
text1= new Sprite(100,230,0,0, 'NONE');
text1.text = '* Use arrow keys to move';
text1.textColor = 'red';
text1.textSize = 20;
text2= new Sprite(100,260,0,0, 'NONE');
text2.text = 'Hold Up Arrow or Spacebar to jump';
text2.textColor = 'red';
text2.textSize = 20;
text3= new Sprite(100,290,0,0, 'NONE');
text3.text = 'Hold Down Arrow + left or right to slide';
text3.textColor = 'red';
text3.textSize = 20;
text4= new Sprite(100,320,0,0, 'NONE');
text4.text = 'No Hit IS Possible... Just Very Hard';
text4.textColor = 'red';
text4.textSize = 20;




//player sprite
player = new Sprite(20,800,60,60);
player.rotationLock = true;
//player animations
player.addAni('push','Images/Push1.png','Images/Push2.png','Images/Push3.png','Images/Push4.png',);
Jumper =player.addAni('Jumper','Images/Jump1.png','Images/Jump2.png','Images/Jump3.png','Images/Jump4.png', 'Images/Jump5.png','Images/Jump6.png','Images/Jump7.png','Images/Jump8.png','Images/Jump9.png','Images/Jump10.png',);
player.addAni('Run', 'Images/Run1.png','Images/Run2.png','Images/Run3.png', 'Images/Run4.png','Images/Run5.png','Images/Run6.png','Images/Run7.png','Images/Run8.png','Images/Run9.png',);
player.addAni('idle','Images/Idle1.png','Images/Idle2.png','Images/Idle3.png','Images/Idle4.png','Images/Idle5.png','Images/Idle6.png','Images/Idle7.png','Images/Idle8.png','Images/Idle9.png','Images/Idle10.png');
player.addAni('Slide','Images/Slide1.png','Images/Slide2.png','Images/Slide3.png','Images/Slide4.png','Images/Slide3.png','Images/Slide4.png','Images/Slide5.png','Images/Slide6.png','Images/Slide7.png',);
player.scale = 5;
player.friction = 1;
player.h = 150;
player.w = 70;



//short pillars
pillars = new Group();
pillars.physics = 'STATIC';
pillars.h = 170;
pillars.y = 760;
pillars.w =100;
pillars.img = PillarImg;
PillarImg.resize(205,340);

while( pillars.length < 1) {
	let pillar = new pillars.Sprite();
	pillar.x = pillars.length *8*80 -120 ;
	}
//platform before mega pillar
pform = new Sprite(900, 520, 100, 10, 'STATIC');
pform.img = TorchImg;



//tallest pillar
megap = new Sprite(1160, 585, 100, 520, 'STATIC');
megap.img = megapImg;
megapImg.resize(250,1050);

//box
box = new Sprite(1400,780,110,135,);
box.rotationLock = true;
box.img = BoxImg;
BoxImg.resize(268,268);

//smaller big pillar
midip = new Sprite(1800,700,100,300, 'STATIC');
midip.img =MidiImg;
MidiImg.resize(200,600);


//spinning blade
spinner = new Sprite(1450,450,250,10, 'KINETIC');
spinner.rotationSpeed = 5;
spinner.img = BladeImg;
BladeImg.resize(500,100);

//AINAVOLAGEM fireball 1
AgemGlob = new Sprite(1000, 600, 60, 60, 'NONE');
AgemGlob.addAni('Blobble','Images/Blurble1.png','Images/Blurble2.png','Images/Blurble3.png','Images/Blurble4.png','Images/Blurble5.png','Images/Blurble6.png','Images/Blurble7.png','Images/Blurble8.png','Images/Blurble9.png','Images/Blurble10.png',);
AgemGlob.scale = 2.5;
AgemGlob.h = 50;
AgemGlob.w = 50;
//AINAVOLAGEM fireball 2
AgemGlob2 = new Sprite(1500, 300, 60, 60, 'NONE');
AgemGlob2.addAni('Blobble','Images/Blurble1.png','Images/Blurble2.png','Images/Blurble3.png','Images/Blurble4.png','Images/Blurble5.png','Images/Blurble6.png','Images/Blurble7.png','Images/Blurble8.png','Images/Blurble9.png','Images/Blurble10.png',);
AgemGlob2.scale = 2.5;
AgemGlob2.h = 50;
AgemGlob2.w = 50;
//AINAVOLAGEM fireball 2
AgemGlob3 = new Sprite(2000, 600, 60, 60, 'NONE');
AgemGlob3.addAni('Blobble','Images/Blurble1.png','Images/Blurble2.png','Images/Blurble3.png','Images/Blurble4.png','Images/Blurble5.png','Images/Blurble6.png','Images/Blurble7.png','Images/Blurble8.png','Images/Blurble9.png','Images/Blurble10.png',);
AgemGlob3.scale = 2.5;
AgemGlob3.h = 50;
AgemGlob3.w = 50;


//the big door
BigDoor = new Sprite(2150,425, 70,5000, 'NONE');
BigDoor.color = 'black';
BigDoor.img=DoorImg;
DoorImg.resize(600,1700);

//Tree
LifeTree = new Sprite(3000,345,500,1000, 'None');
LifeTree.img = TreeImg;
TreeImg.resize(900,2000);



//light in final room
Light = new Sprite(2800,0,500,1000, 'NONE');
Light.img = LighterImg;
LighterImg.resize(2000,3400);
Light.opacity =0.1;

//the thing that hides the tile despawning
Back = new Sprite(-450,100,700,1350, 'STATIC');
Back.color = 'black';
Back.strokeWeight = 0;
Back2 = new Sprite(-450,300,700,2000, 'NONE');
Back2.color = 'black';
Back2.strokeWeight = 0;
Back3 = new Sprite(3570,300, 700, 2000, 'NONE');
Back3.color = 'black';
Back3.strokeWeight = 0;

//death screen
Death = new Sprite(-1000,-1000,1000,1000, 'NONE');
Death.img = DScreenImg;
DScreenImg.resize(1900,1900);
Death.opacity = 0;


//back
BackBoard = new Sprite(3320,100,200,1350, 'STATIC');
BackBoard.color = 'black';



//prize
TheSupremeCatOfPureAmazingnessAndJoy = new Sprite(2950,600,40,40, 'NONE');
TheSupremeCatOfPureAmazingnessAndJoy.addAni('yes', 'Images/Banan1.png','Images/Banan2.png','Images/Banan3.png','Images/Banan2.png','Images/Banan1.png','Images/Banan4.png','Images/Banan5.png','Images/Banan4.png',);
TheSupremeCatOfPureAmazingnessAndJoy.scale = 0.5;
TheSupremeCatOfPureAmazingnessAndJoy.h = 80;
TheSupremeCatOfPureAmazingnessAndJoy.w = 80;
TheSupremeCatOfPureAmazingnessAndJoy.ani.frameDelay = 24;
TheSupremeCatOfPureAmazingnessAndJoy.vel.y = 1;
// button = new Sprite(1100,700,30,60, 'NONE')

//container for player when they win
endb = new Sprite(350,-500,100,10, 'STATIC');
endb2 = new Sprite(350,-700,100,10, 'STATIC');
endb3 = new Sprite(320,-600,10,200, 'STATIC');
endb3 = new Sprite(380,-600,10,200, 'STATIC');

//life variable
Life = 3;
//heart animations + profile
pfp = new Sprite(0,150,80,80,'NONE');
pfp.img = PFPImg;

Life1 = new Sprite(0,150,60,60, 'NONE');
Life2 = new Sprite(50,150,60,60, 'NONE');
Life3 = new Sprite(150,150,60,60, 'NONE');
Life1.addAni('Life1', 'Images/Heart1.png', 'Images/Heart2.png', 'Images/Heart3.png', 'Images/Heart4.png');
Life2.addAni('Life2', 'Images/Heart2.png', 'Images/Heart3.png', 'Images/Heart4.png', 'Images/Heart1.png');
Life3.addAni('Life3', 'Images/Heart4.png', 'Images/Heart3.png', 'Images/Heart1.png', 'Images/Heart2.png');
break1 =Life1.addAni('Break','Images/Broke1.png','Images/Broke2.png','Images/Broke3.png','Images/Broke4.png','Images/Broke5.png','Images/Broke6.png','Images/Broke7.png','Images/Broke8.png','Images/Broke9.png','Images/Broke10.png','Images/Broke11.png','Images/Broke12.png','Images/Broke13.png','Images/Broke14.png','Images/Broke15.png','Images/Broke16.png','Images/Broke15.png');
break2 =Life2.addAni('Break','Images/Broke1.png','Images/Broke2.png','Images/Broke3.png','Images/Broke4.png','Images/Broke5.png','Images/Broke6.png','Images/Broke7.png','Images/Broke8.png','Images/Broke9.png','Images/Broke10.png','Images/Broke11.png','Images/Broke12.png','Images/Broke13.png','Images/Broke14.png','Images/Broke15.png','Images/Broke16.png','Images/Broke15.png');
break3 =Life3.addAni('Break','Images/Broke1.png','Images/Broke2.png','Images/Broke3.png','Images/Broke4.png','Images/Broke5.png','Images/Broke6.png','Images/Broke7.png','Images/Broke8.png','Images/Broke9.png','Images/Broke10.png','Images/Broke11.png','Images/Broke12.png','Images/Broke13.png','Images/Broke14.png','Images/Broke15.png','Images/Broke16.png','Images/Broke15.png');
Life1.addAni('Del','Images/Dead.png');
break1.looping = false;
break2.looping = false;
break3.looping = false;


//win
WinScreen = new Sprite(3000,-600,1000,1000, 'NONE');
WinScreen.img = endImg;
endImg.resize(2100,1900);

//freeze game
titlescreen = true;

//titlescreen
title = new Sprite(0,490,100,100, 'NONE');
title.img = titleImg;
titleImg.resize(2000,2000);



//stinky man
ThumbsDown = new Sprite(-1500,700,50,50);
ThumbsDown.img = StinkyImg;
ThumbsDown.scale = 3;
ThumbsDown.h = 180;
ThumbsDown.w = 70;
StinkyImg.resize(200,300);
ThumbsDown.rotationLock = true;






}
function update() {
	background('black');
if(titlescreen == true){
	
	title.x = camera.x;
	
		//Keep banana from moving off screen during title
if(TheSupremeCatOfPureAmazingnessAndJoy.y >=605){TheSupremeCatOfPureAmazingnessAndJoy.vel.y = -0.1;} 
else if(TheSupremeCatOfPureAmazingnessAndJoy.y <= 595){TheSupremeCatOfPureAmazingnessAndJoy.vel.y = 0.1;}
	
	//keep heart animations from playing in the title screen
	if(Life == 3){
		Life1.changeAni('Life1');
		Life1.ani.frameDelay = 12;
		Life1.scale = 1.5;
		Life2.changeAni('Life2');
		Life2.ani.frameDelay = 14;
		Life2.scale = 1.5;
		Life3.changeAni('Life3');
		Life3.ani.frameDelay = 16;
		Life3.scale = 1.5;
		
		}
		if(Life == 2){
			Life1.changeAni('Break');
			Life1.ani.frameDelay = 12;
			Life1.scale = 1.5;
		
			Life2.changeAni('Life2');
			Life2.ani.frameDelay = 14;
			Life2.scale = 1.5;
			Life3.changeAni('Life3');
			Life3.ani.frameDelay = 16;
			Life3.scale = 1.5;
		} 
		if(Life == 1){
			Life2.changeAni('Break');
			Life2.ani.frameDelay = 12;
			Life2.scale = 1.5;
			Life3.changeAni('Life3');
			Life3.ani.frameDelay = 16;
			Life3.scale = 1.5;
		} 
		if(Life <= 0){
			Death.y = 500;
			camera.x = Death.x;
			Life3.x = camera.x;
			Life3.y = 500;
			Life3.changeAni('Break');
		}

}
//start main game
if(kb.presses('enter')){
	titlescreen = false;
	title.y = -1000;
}
//maingame
if(titlescreen == false){
	game();
}
	

}





//function area




//health die
function Ouch() {
	Life--;
}

//win
function Win() {
	WinScreen.y = 470;
	WinScreen.x = 650;
	player.x = 350;
	player.y = -600;
}


//moving left or right
function move(){
	if(kb.pressing('left') && kb.pressing('down')==false){
		player.vel.x = -4;
		player.scale.x = -5;
	}
if(kb.pressing('right')&& kb.pressing('down')==false){
		player.vel.x = 4;
		player.scale.x = 5;
	}}


//the entire game
function game(){
	//things that follow player
	camera.x = player.x + 300;
	pfp.x = player.x -40;
	Life1.x = player.x +60;
	Life2.x = player.x +130;
	Life3.x = player.x + 200;
	//keep box on ground
	box.y = 780;


	//York musnt move up or down
	ThumbsDown.y = 630;
	ThumbsDown.vel.y = 0;
	

	//movement of TheSupremeCatOfPureAmazingnessAndJoy
if(TheSupremeCatOfPureAmazingnessAndJoy.y >=605){TheSupremeCatOfPureAmazingnessAndJoy.vel.y = -0.1;} 
else if(TheSupremeCatOfPureAmazingnessAndJoy.y <= 595){TheSupremeCatOfPureAmazingnessAndJoy.vel.y = 0.1;}
	
	
	//AINAVOLAGEM fireball movement
	AgemGlob.moveTo(player,1);
	AgemGlob2.moveTo(player,1);
	AgemGlob3.moveTo(player,1);

	//idle animation trigger
	if(player.vel.y == 0 && player.colliding(ground) || player.vel.y ==0 && player.colliding(pillars)|| player.vel.y ==0 && player.colliding(pform)||player.vel.y ==0 && player.colliding(megap)||player.colliding(box)&& player.vel.y <= 1||player.vel.y == 0 && player.colliding(midip)||player.vel.y == 0 && player.colliding(doorb)){
	  player.changeAni('idle');
		player.ani.frameDelay = 12;
	player.h = 150;
	player.w = 70;}

//sliding right
if(kb.pressing('right')&&kb.pressing('down')&& player.vel.y ==0 && player.colliding(allSprites)){
	player.changeAni('Slide');
	player.ani.frameDelay = 12;
	player.h = 60;
	player.w = 160;
	player.scale.x=5;
	player.vel.x =6;
	player.y = player.y +20;
	jump = 0;
}
//sliding left
if(kb.pressing('left')&&kb.pressing('down')&& player.vel.y ==0 && player.colliding(allSprites)){
	player.changeAni('Slide');
	player.ani.frameDelay = 12;
	player.h = 60;
	player.w = 160;
	player.scale.x = -5;
	player.vel.x =-6;
	player.y = player.y +20;
	jump = 0;
}
	

	//moving left or right in the air
	move()
	//trigger run animation right
	if(kb.pressing('right')&& player.colliding(ground) && kb.pressing('down') == false|| kb.pressing('right')&&player.colliding(pillars)&& kb.pressing('down') == false|| kb.pressing('right')&&player.colliding(pform)&& kb.pressing('down') == false|| kb.pressing('right')&&player.colliding(megap)&& kb.pressing('down') == false||kb.pressing('right')&& player.colliding(box)&& kb.pressing('down') == false||kb.pressing('right')&& player.colliding(midip)&& kb.pressing('down') == false){
		player.vel.x = 4;
		player.scale = 5;
		player.changeAni('Run');
		player.ani.frameDelay = 7;
		player.h = 150;
		player.w = 70;
	} 
	//trigger run animation left
	if(kb.pressing('left') && player.colliding(ground)&& kb.pressing('down') == false|| kb.pressing('left')&&player.colliding(pillars)&& kb.pressing('down') == false||kb.pressing('left')&&player.colliding(pform)&& kb.pressing('down') == false|| kb.pressing('left')&&player.colliding(megap)&& kb.pressing('down') == false||kb.pressing('left')&& player.colliding(box)&& kb.pressing('down') == false||kb.pressing('left')&& player.colliding(midip)&& kb.pressing('down') == false){
		player.vel.x = -4;
		player.scale.x = -5;
		player.changeAni('Run');
		player.ani.frameDelay = 7;
		player.h = 150;
		player.w = 70;
	} 
	//trigger jump animation
	if(kb.pressing('up')||kb.pressing('space')||kb.pressing('up')&&kb.pressing('right')||kb.pressing('up')&&kb.pressing('left')||kb.pressing('space')&&kb.pressing('right')||kb.pressing('space')&&kb.pressing('left')){
		player.changeAni('Jumper');
		player.ani.frameDelay = 12;
		
		
	}
	//trigger jump
	if(kb.pressing('up') && jump ==1|| kb.pressing('space') && jump == 1 ){
	
		player.vel.y = -8;
		jump = 0;
		
	}



	//getting damaged and dying animations
	 
	if(Life == 3){
	Life1.changeAni('Life1');
	Life1.ani.frameDelay = 12;
	Life1.scale = 1.5;
	Life2.changeAni('Life2');
	Life2.ani.frameDelay = 14;
	Life2.scale = 1.5;
	Life3.changeAni('Life3');
	Life3.ani.frameDelay = 16;
	Life3.scale = 1.5;
	
	}
	if(Life == 2){
		Life1.changeAni('Break');
		Life1.ani.frameDelay = 12;
		Life1.scale = 1.5;
	
		Life2.changeAni('Life2');
		Life2.ani.frameDelay = 14;
		Life2.scale = 1.5;
		Life3.changeAni('Life3');
		Life3.ani.frameDelay = 16;
		Life3.scale = 1.5;
	} 
	if(Life == 1){
		Life2.changeAni('Break');
		Life2.ani.frameDelay = 12;
		Life2.scale = 1.5;
		Life3.changeAni('Life3');
		Life3.ani.frameDelay = 16;
		Life3.scale = 1.5;
	} 
	if(Life <= 0){
		Death.y = 500;
		camera.x = Death.x;
		ThumbsDown.x = -5000;
		Life3.x = camera.x;
		Life3.y = 500;
		Life3.changeAni('Break');
		//make the death screen fade in after heart shatter animation
		if(Death.opacity < 1){Death.opacity = Death.opacity + 0.002;}
	}


	//things that can hit player(damage system)
	if(player.collides(spinner)){
		Ouch();
	}
	if(player.overlaps(AgemGlob)){
		Ouch();
		AgemGlob.delete();
	}else if(player.overlaps(AgemGlob2)){
		Ouch();
		AgemGlob2.delete();
	} else if(player.overlaps(AgemGlob3)){
		Ouch();
		AgemGlob3.delete();
	}
	
	//get rid of threats in final room
	if(player.overlaps(BigDoor)){AgemGlob.delete();
		AgemGlob2.delete();
	AgemGlob3.delete();
	}
	
//jump reset collision
	if(player.colliding(ground) ||player.collides(pillars)&&player.y < 610 || player.collides(pform)|| player.collides(megap)&& player.y < 260||player.collides(box)&&player.y < 870 ||player.collides(midip)&&player.y < 500) 
		{jump = 1;}


	//reload game
	if(kb.presses('r')){
		location.reload();
	}
	// win condition
	if(TheSupremeCatOfPureAmazingnessAndJoy.overlaps(player)){
	Win();
}
}