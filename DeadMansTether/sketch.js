new Q5();

let ball, claw, groundA, LevelTiles, j,c, triggered,djoint, checkpoint, checkPoints, dirt,vert, orb1, orb2, orb3, left2, left3;
function stick(claw, platform){
	
	c = new DistanceJoint(platform, ball);
	   c.springiness = 0.3;
	   c.offsetA.x=claw.x-platform.x;
	   c.offsetA.y=claw.y-platform.y;
	   djoint = true;
	

}
function clawReset(boolean){
	if (!mouse.pressing()||boolean==true) {
		
	claw.x = ball.x + 10;
	claw.y = ball.y;
	clawImg.offset.y=0;
	
	claw.rotateTowards(mouse, 0.1, 90);
	if(ball.joints.length>1){
	for(let i=0; i<ball.joints.length; i++){
		if(ball.joints[i].type=='distance'){ball.joints[i].remove();}
	}
}
	if (!triggered) {
		
		claw.rotation = 90;
		j = new HingeJoint(ball, claw);
		j.maxPower = 0.1;
		triggered = true;
		
		
		
	}
	
	
}
}
function clawLaunch(){
		if (mouse.pressing()) {
		j.remove();
		clawImg.offset.y=50;
		if (triggered) {
			
			claw.moveTowards(mouse.x, mouse.y, 0.1);
			triggered = false;
		}
		if (!dJoint) {
			if ((claw.overlaps(LevelTiles, stick)|| claw.overlaps(orb1,stick))||(claw.overlaps(orb2,stick)||claw.overlaps(orb3,stick))) {
				claw.velocity.x = 0;
				claw.velocity.y = 0;
				claw.rotationSpeed=0;
				
			}
			
		}
	}
}
function preload(){
    clawImg = loadImage('images/claw.png');
	ballImg= loadImage('images/crab.png');
	sandImg= loadImage('images/sand.png');
	vertImg = loadImage('images/sandvert.png');
	iceImg = loadImage('images/ice.png');
	iceAImg = loadImage('images/iceA.png');
	iceDImg = loadImage('images/iceB.png');
	iceCImg=loadImage('images/iceC.png');
	orbImg=loadImage('images/ball.png');
	bgImg=loadImage('images/bg.png');
}
function setup(){

orbImg.resize(160,160);

new Canvas(1300,700);
world.gravity.y = 10;

ball = new Sprite();
ball.x = 190;
ball.y = 390;
ball.diameter = 50;
ball.layer = 2;
ball.physics = DYN;
ballImg.resize(128,128);
ball.img=ballImg;


groundA = new Sprite();
groundA.x = 250;
groundA.width = 700;
groundA.y=420;
groundA.physics = STATIC;

groundA.img=iceAImg;


groundB= new Sprite();
groundB.x=8350;
groundB.y=-50;
groundB.w=100;
groundB.physics=STA;
iceImg.resize(200,100);
groundB.img=iceImg;

orb1= new Sprite();
orb1.x=8350;
orb1.y= 665;
orb1.radius=40;
orb1.physics= DYN;
o1=new DistanceJoint(orb1, groundB);
orb1.velocity.x=10;
orb1.img=orbImg;


orb2= new Sprite();
orb2.x=4900;
orb2.y= 2400;
orb2.radius=40;
orb2.physics= STATIC;
orb2.img=orbImg;

orb3= new Sprite();
orb3.x=2900;
orb3.y= 2300;
orb3.radius=40;
orb3.physics= STATIC;
orb3.img=orbImg;

// orb2.velocity.x=-10;
groundC= new Sprite();
groundC.x=10500;
groundC.y=700;
groundC.w=1200;
groundC.rotation=90;
groundC.physics=STA;
iceCImg.resize(2400,100);
groundC.img=iceCImg;

groundD= new Sprite();
groundD.x=10200;
groundD.y=710;
groundD.w=500;
groundD.rotation=65;
groundD.physics=STA;
iceDImg.resize(1000,100);
groundD.img=iceDImg;

LevelTiles= new Group();
LevelTiles.w=200;
LevelTiles.h=50;
LevelTiles.tile='=';
LevelTiles.physics=STATIC;
LevelTiles.img=sandImg;

checkPoints= new Group();
checkPoints.w=200;
checkPoints.h=50;
checkPoints.tile='c';
checkPoints.physics=STATIC;
checkPoints.color='green'
checkPoints.textColor='white';
checkPoints.textSize=30;
checkPoints.text='CheckPoint!';

dirt= new Group();
dirt.w=200;
dirt.h=50;
dirt.tile='d';
dirt.physics=KIN;
dirt.color='brown';

vert= new Group();
vert.w=50;
vert.h=350;
vert.tile='v';
vert.physics=STATIC;
vert.color='yellow';
vertImg.resize(100,700);
vert.img=vertImg;

LevelTiles=new Tiles([
	'....=.......=...........=...c............',
	'..........=.............v..................',
	'..........v....=',
	'........=......v........=.......=..................=',
	'...............=',
	'...............v.......................................=',
	'...............=...==...=............=..............c',
	'...................................................v',
	'...................................................v',
	'....................................................=',
	'...................................................v',
	'..................................................=.=',
	'...............................................=.....',
	'.........................................=...........',
	'..v......................=====......=................',
	'.c.=...=v..................vvv.......................',
	'..v.....v..................vvv.......................',
	'.........................=====.......................'],20, 10, LevelTiles.w, LevelTiles.h+100
)

claw = new Sprite();
claw.x = 200;
claw.y = 390;
claw.width = 10;
claw.h = 10
claw.physics = NORMAL;
claw.rotation = 90;
claw.mass = 100;
clawImg.resize(128,128);
//clawImg.rotation=90;
claw.img=clawImg;








 
j = new HingeJoint(ball, claw);
j.maxPower = 0.1;
checkpoint=0;
 
 triggered = true;
 dJoint = false;
left2=true;
left3=false;
timer=0;
}
function update() {
	background(bgImg);
	ball.rotation=0;
	textAlign(CENTER);
	textSize(20);
	
	strokeWeight(2);
	text('click to grapple! A/D to move, S to stop momentum', halfWidth, halfHeight - 200);
	text('Watch out for the Ice, you cant grapple on it!', halfWidth, halfHeight - 175);
	//player movement
	if (kb.pressing('right')&& ball.velocity.x<=5){
		ball.velocity.x++;
	}
	if (kb.pressing('left')&& ball.velocity.x>=-5){
		ball.velocity.x--;
	}
	if (kb.pressing('down')){
		ball.velocity.x=0;
	}
	//death and respawn
	if(ball.y>1800){
		
		if(checkpoint==0){
			ball.velocity.x=0;
		ball.velocity.y=0;
			ball.x = 190;
			ball.y = 390;
			clawReset(true);
		}
		else if (checkpoint==1){
			ball.velocity.x=0;
		ball.velocity.y=0;
			ball.x=5540;
			ball.y=-50;
			clawReset(true);
		}
		else if (checkpoint==2&& ball.y>4000){
			ball.velocity.x=0;
		ball.velocity.y=0;
			ball.x=10454;
			ball.y=859;
			clawReset(true);
		}
	}
	if (ball.x>5530&&ball.y<-50){
		checkpoint=1;
	}
	else if ((ball.x>10300&&ball.x<10450)&&(ball.y<900&&ball.y>800)){
		checkpoint=2;
		text('Tip!, you can also phase through', halfWidth-400, halfHeight);
		text('blocks if you are tethered to them!', halfWidth-400, halfHeight+50);
	}
	if ((ball.x>130&&ball.x<330)&&(ball.y>2200&&ball.y<2300)){
		text('You Win!', 650,250);
		text('push w to restart', 650,300);
		if(kb.pressing('up')){
			checkpoint=0;
			timer=0;
		}
	}
	else{
		timer++;
	}
//claw reset
clawReset(false);
//claw launch 

clawLaunch();


	//orb movement
	if (orb2.x>=4900){
		left2=true;
	}
	if (orb2.x<=2900){
		left2=false;
	}
	if(left2){
		orb2.x-=10;
	}
	else{
		orb2.x+=10;
	}
	if (orb3.x>=4900){
		left3=true;
	}
	if (orb3.x<=2900){
		left3=false;
	}
	if(left3){
		orb3.x-=10;
	}
	else{
		orb3.x+=10;
	}
	
//camera and timer
	camera.x = ball.x;
	camera.y = ball.y;
	camera.zoom=0.75;
	text('time: ' +timer/100, 300, 100);
	// text(ball.x, 100, 150);
	// text(checkpoint, 100, 200);
	// text(left2+' '+ orb2.x, 100, 300);
}