new Q5();
let floor, fly,p, fImg,bp,spikes1, spImg, ssImg, ss1, ss2, sw, swImg, b, bImg,sI1, sI2
let  v,e,eImg, c, pImg,fpImg,vImg,wImg,w,g, gImg
let gameOver, s
let t = ''
function preload(){
fImg = loadImage('images/Caves.png')
bp = loadImage('images/bpikes.png')
spImg = loadImage('images/Spikes.png')
swImg = loadImage('images/Sword.png')
bImg = loadImage('images/Boulder.png')
sI1 = loadImage('images/Spikes-1.png')
sI2 = loadImage('images/Spikes-2.png')
pImg = loadImage('images/Alaskan-1.png')
fpImg = loadImage('images/Alaskan-2.png')
vImg = loadImage('images/Victim.png')
eImg = loadImage('images/Exit.png')
wImg = loadImage('images/warns.png')
gImg = loadImage('images/Garm.png')
}

function setup(){
	
	new Canvas();
	background('darkgrey')
	world.gravity.y = 20
	gameOver = false
//garm
g = new Sprite();
g.y = 300
g.w = 100
g.h = 100
g.img = gImg
gImg.resize(500,500)
g.physics = NONE
//floor
	floor = new Group();
	floor.w = 30
	floor.h = 30
	floor.image = fImg
	fImg.resize(100,100)
	floor.tile = 'f'
	floor.physics = STATIC
//flying
fly = new Group();
fly.w = 30
fly.h = 30
fly.image= bp
bp.resize(100,100)
fly.tile = 's'
fly.physics = STATIC
	//player
	p = new Sprite(200,645,30,100);
	p.mass = 0
	p.image = fpImg
	fpImg.resize(200,200)
	
//ceiling spikes
spikes1 = new Group();
	spikes1.y = 100
	spikes1.h = 15
	spikes1.w = 15
	spikes1.image = spImg
	spImg.resize(75,75)
	spikes1.physics = NONE

	//side spikes
ss1 = new Group();
ss1.y = 644
ss1.w = 30
ss1.h = 80
ss1.x = 750
ss1.img = sI1
sI1.resize(150,200)
//ss1.vel.x = -5
ss1.physics = NONE
ss2 = new Group();
ss2.y = 644
ss2.w = 30
ss2.h = 80
ss2.x = 750
ss2.img = sI2
sI2.resize(150,200)
//ss2.vel.x = 5
ss2.physics = NONE
//sword
sw = new Group();
sw.physics = NONE
//sw.rotateTo(-180,-5)
//sw.offset.x = 25
sw.w = 25
sw.h = 450
sw.y = 600
sw.image = swImg
swImg.resize(700,950)
	//boulder
	b = new Group();
	b.img = bImg
	bImg.resize(75,60)
	b.tile = 'b'
	b.physics = STA
c = new Sprite(0,35,5000,300, STA)
c.visible = false
//victim
v = new Sprite(1900,500,50,60,NONE)
v.image = vImg
vImg.resize(500,500)
//exit
e = new Sprite(100,645,100,100,STA)
e.img = eImg
eImg.resize(250,250)
//warn
w = new Group()
w.x = 500
w.image = wImg
wImg.resize(100,100)
w.physics = NONE


//attacking player
if (gameOver == false){
	setInterval(newSpikes1,1000)
	setInterval(sideSpikes,8000)
	setInterval(spin,7000)
	setInterval(spin2,7000)
}

	//tiles
	tilesGroup = new Tiles([
	'b                             b                      b              b',
	'b                             b                      b              b',
	'b                             b                      b              b',
	'b                             b                      b              b',	
	'b ssss       ssss     sssss   b    ssss      sssss   b   sssss      b',
	'b                             b                      b              b',
	'b                             b                      b              b',
	'b                             b                      b              b',
	'b                             b                      b              b',
	'b                             b                      b              b',
	'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
	],
	15,
	425,
	30,
	30,

)

}
function draw(){
	clear();
	background('black')

	camera.x = p.x
	g.x = p.x
	s = p.x
	//player control
	if (kb.pressing('right')){
		p.vel.x = 5
		p.image = fpImg
		fpImg.resize(200,200)
	}
	else if(kb.pressing('left')){
		p.vel.x = -5
		p.image = pImg
		pImg.resize(200,200)
	}
	else if(kb.presses('up')){
		p.vel.y = -13
	}
	else(p.vel.x = 0)

	//victim
	if(kb.presses('e')){
		//v.attractTo(p,100)
		new GlueJoint(p,v)

	}


	//text
	fill('white')
	textAlign(CENTER)
	textSize(100,100)
	text(t,400,400)
	textSize(30,30)
	text('e to pick up victim,',s, 100)

//how to win
if(v.overlaps(e)){
	gameOver == true
	allSprites.remove();
	t = 'YOU WIN!'
}
//how to lose
if(spikes1.overlaps(p)){
	gameOver == true
	allSprites.remove();
	t = 'YOU LOSE'
}
 
if(ss1.overlaps(p)){
	gameOver == true
	allSprites.remove();
	t = 'YOU LOSE'
}

if(ss2.overlaps(p)){
	gameOver == true
	allSprites.remove();
	t = 'YOU LOSE'
}

if(sw.overlaps(p)){
	gameOver == true
	allSprites.remove();
	t = 'YOU LOSE'
}
else{
}


//restart
	if (kb.presses('f')){
		allSprites.remove();
		t = ''
		gameOver = true
		setup();
	}
}

//callout
async function newSpikes1(){
	spike = new spikes1.Sprite();
	spike.x = p.x
	await delay(500)
	spike.vel.y = 17.5
}

async function sideSpikes(){
	side1 = new ss1.Sprite();
	side1.x = camera.x + 350
	side2 = new ss2.Sprite();
	side2.x = camera.x - 350
	await delay(2000)
	side1.vel.x = -50
	side2.vel.x = 50
}
//sword
async function spin(){
wn = new w.Sprite();
wn.x = p.x
await delay(1000)
wn.delete();
sws = new sw.Sprite();
sws.x = p.x + 200
sws.rotateTo(-180,-6)
sws.offset.x = 25
await delay(690)
sws.delete();
}
//sword 2nd
async function spin2(){
await delay(3500)
wn = new w.Sprite();
wn.x = p.x
await delay(1000)
wn.delete();
sws = new sw.Sprite();
sws.x = p.x - 200
sws.rotateTo(180,6)
sws.offset.x = 25
await delay(690)
sws.delete();
}
