new Q5();
let life = 3;
let tilesGroup, playerImg, player, rock, rockImg, alien, alienImg, deaths, world, worldImg
function preload(){
playerImg = loadImage('image/astronaut.png');
rockImg = loadImage('image/moon.png')
alienImg = loadImage('image/alien2.png')
worldImg = loadImage('image/world.png')
}
function setup(){
new Canvas(1000,1000);
worldgravity=5;

player = new Sprite();
player.x = 40;
player.y =  745;
player.w = 40;
player.h= 40;
player.img= playerImg;
playerImg.resize(100,100)
player.physics = DYN;

rock = new Group();
rock.w = 50;
rock.h= 50;
rock.img= rockImg;
rock.physics = STATIC;
rockImg.resize(100,100)
rock.tile = 's';

world= new Sprite();
world.y=850
world.x=875
world.d=100
world.img= worldImg;
world.physics = STATIC;
worldImg.resize(200,200)

alien = new Group();
alien.w = 50;
alien.h= 50;
alien.img= alienImg;
alien.physics = STATIC;
alienImg.resize(100,100)
alien.tile = 'a';

tilesGroup = new Tiles(
	[
	'ssssss     sssaaa',
	's    s    s      s',
	's    s   s       s',
	's    s  a        s',
	's    s s    s  a s',
	's    as    s   a s',
	's         s      s',
	's        s       s',
	's     aas        s',
	's    ass      a  s',
	's    s       aaa s',
	's    s           s',
	's    s  aa       s',
	's    s           s',
	's    s   aaaaaaaas',
	'ssssss           ',
	'ssssss           ',
	'ssssss      a    ',
	'ssssssssssssssssss',
	],
	-25,
	30,
	rock.h + 1,
	rock.w + 1,

	//custom functions
	player.overlaps(alien, die)
	//player.overlaps(world,win)
);

}
function update() {
	clear();
	background('skyblue');
    textSize(30);
	text('life left = ' + life,35, 200)

	if (kb.presses('up')){
		player.vel.y = 5
	}

	if (kb.presses('left')){
		player.vel.x = 5
	}

	if (kb.presses('right')){
		player.vel.x = -5
	}

	if (kb.presses('down')){
		player.vel.y = -5
	}

    if (deaths >= 3) {
		textSize(50)
		text('Game over', 40, 300);
		noLoop();
	}

	
}

function die(player, alien){
	deaths++;
	life--;
	player.x=40;
	player.y=745;
	player.vel.set(0, 0);
}

function win(player, world){

}