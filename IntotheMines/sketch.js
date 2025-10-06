//This code is the setup and the variable creation
new Q5();
let rockImg, dirtImg, stoneImg, stone2Img, playerImg;
let rockCount=0;
let started=false;

//this function loads all of the images for the game
function preload(){
    rockImg = loadImage('Images/Rock.png');
	dirtImg = loadImage('Images/Dirt.png');
	stoneImg = loadImage('Images/Stone.png');
	stone2Img = loadImage('Images/Stone2.png');
	playerImg = loadImage('Images/Player.png');
	
}

function setup(){
createCanvas(1200, 800);
world.gravity.y=5;
tileParts();	
}

function update(){
	background(43, 43, 43);
	textSize(32);
	//this code makes the camera follow the player
	camera.x = player.x;
	camera.y = player.y;
	//this code lets the other functions run
	playerMovement();
	inventory();
	//this code makes the start screen appear and disapper when the player presses the mouse button
	if(mouse.presses()){
		started=true;
		
	} if(!started){
		startScreen();
	}
	player.rotation=0;
	//this code removes the ores when the player runs over them
	player.overlaps(rock, removeRock);
	//this code lets the endscreen show when the charater reaches the end
	player.overlapping(end, endScreen);
}

//this function lets the player move
function playerMovement(){
	if(kb.pressing('w')){
		player.y-=5;
	}
	if(kb.pressing('s')){
		player.y+=5;
	}
	if(kb.pressing('a')){
		player.x-=5;
	}
	if(kb.pressing('d')){
		player.x+=5;
	}
	if(kb.pressing('tab')){
		if(mouse.pressing()){
			player.moveTowards(mouse.x, mouse.y, 0.045);
		}
	}

}

//this function creates the blocks and has the tile
function tileParts(){
dirt=new Group();
dirt.h=50;
dirt.w=50;
dirtImg.resize(110, 110);
dirt.img=dirtImg;
dirt.tile='d'
dirt.physics=STATIC;

rock= new Group();
rock.h=50;
rock.w=50;
rockImg.resize(100, 100);
rock.img=rockImg;
rock.tile='R'
rock.physics=STATIC;

stone=new Group();
stone.h=50;
stone.w=50;
stoneImg.resize(110, 110);
stone.img=stoneImg;
stone.tile='s'
stone.physics=STATIC;

stone2=new Group();
stone2.h=50;
stone2.w=50;
stone2Img.resize(110, 110);
stone2.img=stone2Img;
stone2.tile='S'
stone2.physics=STATIC;

//this code creates the player
player= new Sprite();
player.h=50;
playerImg.resize(110, 110);
player.img=playerImg;
player.tile='c'

end=new Group();
end.visible=false
end.tile='|'

//this code makes the map that appears on screen
tilesGroup = new Tiles(
	[	
		'SSSsssssssssSSSsssssssssssssssssssSSSSSSSssssssssssssssSSSSSSSSsssssssssSSSssSSsssSsssSs',
		'S......................................................................................s',
		'S..........................................................sssSsssSSSSsssssSSsssSSssssRsssssssssssSSSSsssssSs',
		's...........................................sssS...........sSSSsss...............ssSss.ssssss..............sS',
		'S.R........................................................SSsssss.ssSsssSssssss.ssSss.ssssss.ssssSSsssSSs.Ss',
		'SSss..................................ss...................SSSSSsS.sSsssSSSsssss.sssSs.ssssss.ssssssssSsss.Ss',
		'S........................................................ssSSssSsS........SSSsss.ssSss.ssssss.ssSSsSSsssss.ss',
		's.................................s.............Ss........SSSssSSs.ssSSSs.SsSsss.sSS.....ssss.sSsssssssSSs.Ss',
		'S..S.............................ss........................ssssR.....ssSS.SsSsss.................s.........Ss',
		's.......................................ss.................SSss.ssSs.ssSs.ssSSSSSSSs.....ssSSsss.S.SSssSsSSsS',
		's...........................................................sss.sSSs.sSSs.sssSSsssss.ssS.ssSsSss.S.s........S',
		'S..s.........................Ss.............................sSs.sSss.sSsS............sSs.ssssSss.s.s.ssSSSs.s',
		's...........................................................sss.sSss.sSsS.sssSSSSSssssSs.SsSsSss.s.s.ssSssS.s',
		'S............................................................sS.ssSs.ssSs.sSSSsssSSsssSS.SsSssss.S.S.sSssSS.S',
		'SSss......................ss.................................ss.ssSs.SssS.sSssssssSssSsS.sSsssss.sSS.sSsSsS.S',
		's.......sS....ss....sS.......................................sS.sSss.SssS.SSssSSsSSsSsss.SSsssss.....sSsSss.s',
		's.............................................................s.sSss.ssSs.sssssssSssssSS.SsssSssSSssSsssSss.s',
		'S..s.........................................................Rs.sSss.....................ssssSssSS....RsSss.s',
		's.............................................................s.sSSssSS.SSsSssssSSssSSSs.SsSSssSsS.sSsSsSSs.S',
		'S.............................................................s.ssSSSSs.sSSssSSsssSSsSsS.sSSssSsSs.sSsSSsSs.S',
		'S..s..s.......................................................s....................................ssSsSsSs.S',
		'sSsSSss.........................sSSsssSSsssSSssssSssssssSSSsssSsssssSssssSSSSsssSsssssSSssssSssSsssssSSssss.s',
		's...............................sSs............................RsSSsssSsssssssSsssSssSsssSSsssssSssSSsssSss.s',
		's............ss.................ssS..........................SsSsSs.........................................S',
		's.............sss...............ssS...........................sSsss.sSssSssSSssSsssSsSssSsssssSsss.ssSs.sSs.S',
		's...............................sSs.......................ss..sSSss.SssS........................sS.sSSs.sSs.s',
		's......................sssss.............................sS...sSsss.SsSs.sssssSsSssSssSSsSssSsS.SS.sSSS.Sss.s',
		's.............Ssssssssssssssssssssss..........................ssSss.ssss.sssRsssSsSssSsSsssSssS.Ss.SsSs.sSs.S',
		's.sssSsssSsSsSssssssssssssssssss..............................ssSss.Ssss.sss...........ssSssSss.Ss.Ssss.ssS.S',
		'sRsSSS.........ssssSssssssSSssss.......ssS........sSSsss......ssSss.ssSs.sssSssSSsSsss.sSssssSS.SS..R...ssS.s',
		'SSS.............ssssSssssssssss...............................ssSss.Ssss.SSSssSsssssSS.sSsSSsSS.SssSsSSssSs.s',
		'ss................ssssSSssssSss...SSs....R....................sSsss.sssS.SssSSssSSSsss.sssSsSsS.SssSsSsSssS.s',
		's.................ssssssSssssss.........ssSs..................sSsSs.sssS.sSss..........ssSSsSsS.ss..........S',
		's......sssSs.......ssssSssssSss...............................ssSss.ssSs.sSsS.SSssssssSsSsssssS.SS.sSsSsSSS.s........sSssSSssS',
		's..................ssssssssssss...ss...................R......ssSss.sSss.sSSs.sssSSssSsssSsSsSs.sS.SsssSSsS.S........s.......S',
		'S..................ssssSsssssSs.......................sss.....SSSSs.sSsS.SsSS.SsSsSssSsSS.......Ss.SsSsSsSs.s........S.......s',
		'SS................sssssssssssssss............ssss.............SSsss...........RssSsSssSsS.sSsSssSs..........s........s.......s',
		'Ss............................................................SSsSsSSssSssSssSssSssSsSsSs.SSssSsSsSssssSSssssSsssSssSs.......S',
		'SSs.c.....................R...........sss.....................SsSSsR..................................................|||R|||S',
		'ssssSSssSSssssSssssssssssSSsssssSSssssssssssssssssssSSssssssS.ssSsS.s.S.S.s.s.S.s.s.s.s.SsS.S.s.s.s.S.s.S.s.SsssSSssssSssSssSs',
		'............................................................................................................sSSsssSsssSSsssSsS',
	],
	0,
    0,
    dirt.w + 1,
    dirt.h + 1,
)
}

//this function removes the rock when the player collects it
function removeRock (player, rockCollected){
	rockCollected.remove();
	rockCount+=1;
}
//this code makes the inventory
function inventory(){
	if(kb.pressing('e')){
		rect(485, 300, 225, 100);
		text('your score:', 510, 350);
		text(rockCount, 670, 350);	
	}
}

//this code makes the start screen
function startScreen(){
	rect(400, 500, 760, 150);
	text('Welcome to Into the Mines!', 410, 530);
	text('The goal is to collect as many rocks as you can. ', 410, 565);
	text('Use W, A, S, D to move and hold E to see your score', 410, 600);
	text('Press on this screen to remove it, Good Luck!', 410, 635);
}
//this code makes the end screen
function endScreen(){
	fill(255);
	text('Congratulations,', 400, 260);
	text('You completed the mine,', 400, 290);
	text('Check your score, the max score is 15.', 400, 320);
	text('How close did you get?', 400, 350);
}