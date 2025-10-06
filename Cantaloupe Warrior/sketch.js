let bricks, soil, platform, ice, hole, wall, dash, goal, tilesGroup, player;
function preload(){
}
function setup() {
    new Canvas(1000, 600); 
	world.gravity.y = 20;  

	//cantaloupe
	player = new Sprite(); 
	player.x = 600;
	player.y = 600; 
	player.diameter = 60; 
    player.layer = 3;  
	player.img = loadImage ('images/ball.png'); 

	//dirt
    bricks = new Group();
    bricks.w = 60;
    bricks.h = 60;
    bricks.color = 'green'
    bricks.tile = '=';
	bricks.physics = STA; 
	bricks.img = loadImage ('images/grass.png'); 

	//grass
    soil = new Group();
    soil.w = 60;
    soil.h = 60;
    soil.color = 'brown';
    soil.tile = 's';
   	soil.physics = STA;
    soil.img = loadImage ('images/dirt.png'); 
	
	//bouncy platforms
	   platform = new Group();
	   platform.w = 60;
	   platform.h = 60;
	   platform.color = 'orange';
	   platform.tile = 'p';
		platform.physics = STA; 
		platform.img = loadImage ('images/platform.png'); 

	//waterfall
		ice = new Group();
		ice.w = 60;
		ice.h = 60;
		ice.color = 'blue';
		ice.tile = 'i';
	    ice.physics = NONE; 
        ice.layer = 2; 
		ice.img = loadImage ('images/water.png'); 

		//hole dirt texture
        hole = new Group();
		hole.w = 60;
		hole.h = 60;
		hole.color = 'black';
		hole.tile = 'h';
	    hole.physics = NONE;
        hole.layer = 1;  
		hole.img = loadImage ('images/hole.png'); 

		//spike wall
        wall = new Group();
	   wall.w = 60;
	   wall.h = 60;
	   wall.color = 'red';
	   wall.tile = 'w';
		wall.physics = STA; 
		wall.img = loadImage ('images/wall.png'); 

		//jumping bean
		dash = new Sprite();
		dash.x = 400;
	    dash.y = 600; 
		dash.diameter = 30;
		dash.color = 'blue';
		dash.bounciness = 1.025; 
		 dash.img = loadImage ('images/grape.png'); 
 
		 //finish
        goal = new Group();
	   goal.w = 10;
	   goal.h = 60;
	   goal.color = 'lime';
	   goal.tile = 'g';
		goal.physics = STA; 
		goal.img = loadImage ('images/goal.png'); 
 
    tilesGroup = new Tiles(
        [
            '................................................................................www................................',
            '................................................................................www................................',
            '................................................................................www................................',
            '................................................................i======.........www..........=========.............',
            '...............................................................iii.ssss=........www........==sssssss...............',
            '...........................========............................iii.sssss=.......www......==sssssss.................',
			'..........................=sssssss.............................iii.ssssss=......www.....=ssssssss..................',
			'.........................=ssssssss.............................iii.sssssss==h==========hssssssss...................',
            '........................=sssssssss....pp.......................iii..sssssssshsssssssssshssssssss...................',
            '.....===================ssssssssss............p................iii..sssssssshsssssssssshssssssss...................',
            '......sssssssssssssssssssssssssss..................=======.....iii..sssssssshsssssssssshsssssss..............gg....',
            '.......ssssssssssssssssssssssssss...................sssss......iii...ssssssshsssssssssshsssssss............======..',
            '.......sssssssssssssssssssssssss.....................sss.......iii... sssssshhhhhhhhhhhhsssssss.............ssss...',
            '........sssssssssssssssssssssss................................iii.....sssssssssssssssssssssss...............ss....',
        ],
        -500,
        200,
        bricks.w + 1,
        bricks.h + 1
    );
}

function draw() {
    clear();
    background('lightblue');
	//jump
	if (kb.pressing('up')&& player.colliding(allSprites)) {
		player.vel.y = -10 
	}
	//movement
	if (kb.pressing('left')) {
		player.vel.x = -7
	player.rotationSpeed = -8; 
	}
	else if (kb.pressing('right')) {
	player.vel.x = 7;
player.rotationSpeed = 8; 
	}
	else player.vel.x = 0;
//camera
if (kb.pressing('r')) {
	camera.x = dash.x;
	camera.y = dash.y; 	
	camera.rotation = dash.rotation; 
}
else camera.x = player.x, camera.y = player.y;  
//bouncy platforms
if (player.collides(platform)) {
	player.vel.y = -10;
}
//water
if (player.overlapping(ice)) {
	player.vel.y = -2;
}
//spike wall
if (player.collides(wall)) {
	player.vel.y = 50;
}
//finish
if (dash.collides(goal)) {
	setup();
}
//Slow jumping bean
if (kb.pressing('space')) {
dash.moveTowards (player, 0.01); 
}
//Kick physics
if (dash.collides(player)) {
	dash.vel.y = -12;
}
//water
if (dash.overlapping(ice)) {
	dash.vel.y = -2;
	dash.vel.x = 0; 
}
}
