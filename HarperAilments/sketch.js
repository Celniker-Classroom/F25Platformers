new Q5();
let gameState = 'setting1'//sets gamestate variable
let mainCharacter, mage, stones, floor, cauldron, bookShelf, books, moss, healingFlower, healingWater, healingButterfly
let grass, water, soil, trunk
let itemsCollected = 0
let floorImg, bookShelfImg, healingFlowerImg, healingButterflyImg, healingWaterImg, mossImg, grassImg, soilImg, cauldronImg, waterImg, trunkImg
let mageAni, idleAni, runLeftAni, runRightAni,mageSpriteSheet
let dialougeState = 0
let scene1Text = ''


function preload(){
	floorImg = loadImage('assets/floor.png')
	bookShelfImg = loadImage('assets/bookshelf.png')
	healingFlowerImg = loadImage('assets/flower.png')
	healingButterflyImg = loadImage('assets/butterfly.png')
	healingWaterImg = loadImage('assets/water.png')
	mossImg = loadImage('assets/moss.png')
	grassImg = loadImage('assets/grass.png')
	waterImg = loadImage('assets/river.png')
	soilImg = loadImage('assets/soil.png')
	cauldronImg = loadImage('assets/cauldron.png')
	trunkImg = loadImage('assets/tree.png')
	
}


function setup() {
	new Canvas();
	world.gravity.y = 20;

	//this block makes new character
	//mainCharacter is the same thing as player for the purpose of this code
	mainCharacter = new Sprite();
	mainCharacter.color = 'lightblue'
	mainCharacter.rotationLock = true
	mainCharacter.x = 50
	mainCharacter.y = 500
	scene1();

	let scene1Text = ''

	//all of this creates the tiles for scene 2
	grass = new Group();
	grass.w = 40
	grass.h = 40
	grass.image = grassImg
	grassImg.resize(80,80)
	grass.tile = '='
	grass.physics = STATIC

	soil = new Group();
	soil.w = 40
	soil.h = 40
	soil.image = soilImg
	soilImg.resize(80,80)
	soil.tile = '@'
	soil.physics = STATIC

	water = new Group();
	water.w = 40
	water.h = 40
	water.image = waterImg
	waterImg.resize(80,80)
	water.physics = STATIC
	water.tile = '~'

	trunk = new Group();
	trunk.h = 800
	trunk.w = 40
	trunk.image = trunkImg
	trunkImg.resize(80,80)
	trunk.physics = NONE
	trunk.tile = '#'

	moss = new Group();
	moss.w = 90
	moss.h = 40
	moss.image = mossImg
	mossImg.resize(180,80)
	moss.physics = KIN
	moss.tile = '^'

	winText = ''
let winDialouge = [
		'Ah, you got the ingredients!',
		'Good work young one',
		'As promised, I will get to work on your potion'
	]
	let startDialouge = [
		"",
		"Hello young one, what is ailing you?",
		"You don't know? Well, I suppose I could make you an all healing potion...",
		"Unfortunately, I don't have all of the ingredients right now... could you get them?",
		"I have enough potion to make you feel slightly better, so don't worry about that",
		"Press G to go to the forest"
	];
	let currentDialogueIndex = 0
	
	const dialogueOptions={
		starting: startDialouge,
		winnerwinner: winDialouge
	}

}

function update() {


	if (gameState === 'setting1') {
		cameraCentered();
		background('lightgrey')
		playerMovement();
		playerSize();
		sceneText();
		if (kb.presses('G')) {
			bookShelf.delete();
			cauldron.delete();
			floor.delete();
			mage.delete();
			gameState = 'setting2'
			scene2();
		}
	} else if (gameState === 'setting2') {
		background('blue')
		cameraFollowsPlayer();
		playerMovement();
		playerSize();
		colliders();
		winState();
	}
	if (kb.presses('R')) {
		gameState = 'setting1'
		grass.delete();
		soil.delete();
		water.delete();
		trunk.delete();
		mainCharacter.x = 50
		mainCharacter.y = 500
		scene1();

	}
}





function scene1() { //this creates the setting for scene 1


	floor = new Sprite(400, 800, 900, 300);
	floor.image = floorImg
	floorImg.resize(1200,1300)
	floor.physics = STATIC;

	
	bookShelf = new Sprite(650, 400, 290, 500);
	bookShelf.image = bookShelfImg
	bookShelfImg.resize (500,900)

	bookShelf.physics = NONE;


	cauldron = new Sprite(500, 600, 120);
	cauldron.image = cauldronImg
	cauldronImg.resize (400,400)
	cauldron.physics = STATIC;

	mage = new Sprite(400, 580, 80);
	mage.color = 'purple'
	mage.physics = STATIC;

	
	}






function scene2() {
	//this block makes the flower
	healingFlower = new Sprite();
	healingFlower.d = 20
	healingFlower.x = 290
	healingFlower.y = 600
	healingFlower.image = healingFlowerImg

	//this block makes the butterfly
	healingButterfly = new Sprite();
	healingButterfly.d = 20
	healingButterfly.x = 3000
	healingButterfly.y = 400
	healingButterfly.image = healingButterflyImg

	//this block makes the healing water
	healingWater = new Sprite();
	healingWater.d = 20
	healingWater.x = 5000
	healingWater.y = 600
	healingWater.image = healingWaterImg

	//this block sets overlap of all the potion items 
	mainCharacter.overlaps(healingFlower, healingItemsCollected)
	mainCharacter.overlaps(healingButterfly, healingItemsCollected)
	mainCharacter.overlaps(healingWater, healingItemsCollected)

	

	
//this creates the map for the second scene
	tileGroup = new Tiles(
		[
			'######.................................................................................===========================',
			'######..................................................^.....====================================================================',
			'######........#######....##.............==========~~==.',
			'######........#######....##........===================',
			'@@@@@@@@@@@@@~~~~~@@@@@@@@@@..........................',
			'============~~~~~~~=========~~~^',
			'@@@@@@@@@@@@@~~~~~@@@@@@@@@@~~~~~~~~~~~~~~~~~~~~~~~~~...................................................................................===...........................',
			'@@@@@@@@@@@@@@@~~@@@@@@@@@@@@@@~~~~~~~~~~~~~~~~~~~..........................................................................................................................===============================',
			'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..................................................................................................................======',
			'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@......................................................................................@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
			'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
			'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
		],
		0,
		610,
		grass.w,
		grass.h,

		grass.visible = true,
		soil.visible = true,
		water.visible = true

	)


}

function playerMovement() {
	if (kb.pressing('up')) {
		mainCharacter.velocity.y = 37
	} else if (kb.pressing('left')) {
		mainCharacter.velocity.x = -8
	} else if (kb.pressing('right')) {
		mainCharacter.velocity.x = 8
	}
}

function playerSize() {//sets character size for each game state
	if (gameState === 'setting1') {
		mainCharacter.scale = 1.5
	} else if (gameState === 'setting2')
		mainCharacter.scale = 1

}

function cameraFollowsPlayer() {
	camera.x = mainCharacter.x
	camera.y = mainCharacter.y



}

function cameraCentered() {
	camera.x = canvas.hw
	camera.y = canvas.hh
}




function healingItemsCollected(mainCharacter, healingButterfly, healingFlower, healingWater) {
	if (mainCharacter.overlaps(healingButterfly)) {
		healingButterfly.remove();
		itemsCollected++
	}

	if (mainCharacter.overlaps(healingFlower)) {
		healingFlower.remove();
		itemsCollected++
	}

	if (mainCharacter.overlaps(healingWater)) {
		healingWater.remove();
		itemsCollected++
	}
}
// function talkToMage(){
// if(kb.presses('e')){
// 	if(itemsCollected = 3)
// }
// }




function colliders() {//sets colliders for water and moss
	if (mainCharacter.overlapping(water)) {
		if (kb.pressing('left'))
			mainCharacter.velocity.x = -2
		if (kb.pressing('right'))
			mainCharacter.velocity.x = 2
	}

	if (mainCharacter.colliding(moss)) {
		mainCharacter.velocity.y =-20
	}
}


function winState() {//happens when all the healing potion ingredients have been collected
	textSize(30)
	text(winText, 10, 400)

	if (itemsCollected == 3){
		
		winText = 'You got all the ingredients! press R to go back'
	               

}

}
function sceneText(){
textSize(20)
	text(scene1Text,0,450)
	if(itemsCollected < 3){
		scene1Text = 'Please get the potion ingredients for the potion (press g to go to the forest) '
	}else if(itemsCollected = 3){
		scene1Text = 'Good job young one, I will make your potion now'
	}
}