new Q5();
new Canvas();
world.gravity.y = 15;
createCanvas(500, 500);
frameRate = 32;

let block, lives, block2, prize, lava, tilesGroup, speed, rate, score, player; //defines variables

function preload(){
	blockMaterial = loadImage('images/Stone.png'); //images for the sprite textures
	lavaMaterial = loadImage('images/hotLava.png');
	prizeMaterial = loadImage('images/prize.png');
}
function setup(){

	speed = 1.5; //defines the values of variables
	rate = 1.5;
	score = 0;
	lives = 3;

	block = new Group(); //the non-moving blocks
	block.w = 64;
	block.h = 64;
	block.img = blockMaterial;
	blockMaterial.resize(130, 130);
	block.tile = 'w';
	block.physics = STATIC;

	block2 = new Group(); //the moving blocks
	block2.w = 64;
	block2.h = 64;
	block2.img = blockMaterial;
	blockMaterial.resize(130, 130);
	block2.tile = '-';
	block2.physics = STA;
	block2.y = 300;

	prize = new Group(); //the prize labeled "+1"
	prize.w = 64;
	prize.h = 64;
	prize.img = prizeMaterial;
	prizeMaterial.resize(130, 130);
	prize.tile = 'p';
	prize.physics = STA;
	
	player = new Sprite(); //the red ball which is the player
	player.diameter = 20;
	player.x = 90;
	player.y = 270;
	player.color = 'red';

	lava = new Group(); //the lava at the bottom
	lava.w = 64;
	lava.h = 64;
	lava.img = lavaMaterial;
	lavaMaterial.resize(130, 130);
	lava.tile = 'o';
	lava.physics = STATIC;
	
	
	tilesGroup =  new Tiles( //designs the map
		[
			'w.......w',
			'wp......w',
			'wwwwww..w',
			'w.......w',
			'w.......w',
			'www.....w',
			'w.....--w',
			'w.......w',
			'wooooooow' 

		],
		-11,
        -6,
        block.w + 1,
        block.h + 1

	);

player.collides(prize, win); //makes the win function run if the player hits the prize

player.collides(lava, hitLava); //makes the hitLava function run if the player touches lava





}
function update() {
	background('skyblue');

	block2.y += speed; //makes the moving block move down

	if(block2.y > 470){
		speed = -(rate); //makes the block move down when it reaches the top
	}

	if(block2.y < 30){ //makes the block move up when it reaches the bottom
		speed = rate; 
	}
	
	if(kb.holds('up')){ //makes the player move up when the up arrow is pressed
		player.velocity.y = -3;
	}

	if(kb.holds('left')){ //makes the player move left when the left arrow is pressed
		player.velocity.x = -3;
	}

	if(kb.holds('down')){ //makes the player move down when the left arrow is pressed
		player.velocity.y = 3;
		
	}

	if(kb.holds('right')){ //makes the player move right when the right arrow is pressed
		player.velocity.x = 3;
	}

	textSize(30); //makes the title text
	textAlign("center");
	text('Platform Jump', 250, 35);

	textSize(20); //makes the score text
	textAlign("center");
	text('score =', 220, 60);
	textSize(20);
	textAlign("center");
	text(score, 280, 60);

	textSize(20); //makes the number of lives text
	textAlign("center");
	text('lives =', 60, 180);
	textSize(20);
	textAlign("center");
	text(lives, 120, 180);

	if(player.collides(prize)){ //makes the platform speed up
		rate += 1;
		speed = rate;
	}

	if (lives == 0) { //makes the game end when you run out of lives
		lose();
	}
} 

function win(player){ //makes the player teleport back to star and gain lvies and score when they win
	player.y = 270;
	player.x = 90;
	player.velocity.x = 0;
	player.velocity.y = 0;
	score += 1;
	lives ++;
}

function hitLava(player){ //makes the player lose a life when they hit lava
	player.y = 270;
	player.x = 90;
	player.velocity.x = 0;
	player.velocity.y = 0;
	lives --;
}

function lose(){ //makes the game end when the player loses
	textSize(30);
	textAlign("center");
	text('Game Over', 105, 275);
	player.x = 1000;
	speed = rate;
	rate = 0;
}
