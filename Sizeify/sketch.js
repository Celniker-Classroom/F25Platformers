let player, playerImg, time, youWin = false, startTime = 0, bigGroundSensorSwitch, groundSensorSwitch, normalSize = true, grow = false, shrink = false, groundSensor, grass, grassImg, dirt, dirtImg, stonePlatform, stonePlatformImg, door, doorImg, hidingBush, hidingBushImg, hidden = true, tilesGroup;
function preload() {
    grassImg = loadImage('images/grassTile.png');
    dirtImg = loadImage('images/dirtTile.png');
    // stonePlatformImg = loadImage('images/TileStonePlatform.png');
    hidingBushImg = loadImage('images/hidingBushTile.png');
    hidingPollImg = loadImage('images/hidingPollTile.png');
}
function setup() {
    new Canvas(1920, 1080);
    world.gravity.y = 13;

    player = new Sprite();
    player.x = 500;
    player.y = 899;
    player.w = 32;
    player.h = 32;
    player.physics = DYN;
    player.rotationLock = true;
    player.color = color('red');
    player.bounciness = 0;
    player.friction = 0;

    groundSensor = new Sprite(500, 909, 29, 12, NONE);
    groundSensor.visible = false;
    groundSensor.mass = 0.01;

    let j = new GlueJoint(player, groundSensor);
    j.visible = false;

    bigGroundSensor = new Sprite(500, 935, 24, 12, NONE);
    bigGroundSensor.visible = false;
    bigGroundSensor.mass = 0.01;

    let i = new GlueJoint(player, bigGroundSensor);
    j.visible = false;

    grass = new Group();
    grass.w = 64;
    grass.h = 64;
    grass.stroke = 'green';
    grass.img = grassImg;
    grassImg.resize(128, 129);
    grass.tile = '=';
    grass.physics = STA;
    grass.color = color('green');
    grass.bounciness = 0;

    dirt = new Group();
    dirt.w = 64;
    dirt.h = 64;
    dirt.stroke = 'brown';
    dirt.color = color('brown');
    dirt.img = dirtImg;
    dirt.tile = 'd';
    dirt.physics = STA;
    dirt.bounciness = 0;


    stonePlatform = new Group();
    stonePlatform.w = 64;
    stonePlatform.h = 64;
    stonePlatform.stroke = 'grey';
    stonePlatform.color = color('grey');
    // stonePlatform.img = stonePlatformImg;
    // stonePlatformImg.resize(32, 32);
    stonePlatform.tile = 's';
    stonePlatform.physics = STA;
    stonePlatform.bounciness = 0;

    exit = new Group();
    exit.w = 40;
    exit.h = 64;
    exit.stroke = 'grey';
    exit.color = color('grey');
    // stonePlatform.img = stonePlatformImg;
    // stonePlatformImg.resize(32, 32);
    exit.tile = 'e';
    exit.physics = STA;
    exit.bounciness = 0;

    hidingBush = new Group();
    hidingBush.w = 64;
    hidingBush.h = 28;
    hidingBush.stroke = color(14, 54, 19);
    hidingBush.img = hidingBushImg;
    hidingBush.tile = 'b';
    hidingBush.physics = DYN;
    hidingBush.color = color(14, 54, 19);
    hidingBush.bounciness = 0;

    hidingPoll = new Group();
    hidingPoll.w = 30;
    hidingPoll.h = 88;
    hidingPoll.img = hidingPollImg;
    hidingPoll.tile = 'p';
    hidingPoll.physics = DYN;
    hidingPoll.bounciness = 0;

    invisibleWall = new Group();
    invisibleWall.w = 64;
    invisibleWall.h = 64;
    invisibleWall.visible = false;
    invisibleWall.tile = 'i';
    invisibleWall.physics = STA;
    invisibleWall.bounciness = 0;

    hidingBush.overlaps(player);
    hidingPoll.overlaps(player);
    exit.overlaps(player);

    tilesGroup = new Tiles(
        [
            '.......i..........................................................',
            '.......i..........................................................',
            '.......i..........................................................',
            '.......i..........................................................',
            '.......i..........................................................',
            '.......i...............b..........................p.......b......e',
            '.......i......b......==========..........=======..================',
            '=====================dddddddddd..........ddddddd=.dddddddddddddddd',
            'ddddddddddddddddddddddddddddddd..........ddddddd..dddddddddddddddd',
            'ddddddddddddddddddddddddddddddd.......p..........=dddddddddddddddd',
            'ddddddddddddddddddddddddddddddd==================ddddddddddddddddd',
            'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
            'dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
        ],
        0,
        500,
        grass.w,
        grass.h
    );
}


function update() {
    clear();
    background('skyblue');

    camera.zoom = 2;
    camera.y = player.y - 50;
    camera.x += (player.x - camera.x) / 5;

    movement();


    if (groundSensorSwitch) {
        jump();
    }

    size();

    if (bigGroundSensorSwitch) {
        bigJump();
    }



    if (hidden) {
        timer();
        text(time, 100, 100);
    }

    if (!hidden) {
        if (youWin == true) {
            textAlign(CENTER)
            textSize(100);
            text('You Win!', 960, 540);
        }
        else {
            allSprites.remove();
            textAlign(CENTER)
            textSize(100);
            text('You Were Found!', 960, 540);
        }
        // if (kb.presses ('r')) {
        //     startTime = millis();
        //     normalSize = true;
        //     grow = false;
        //     shrink = false;
        //     hidden = true;
        //     setup();
        // }
    }

    if (exit.overlaps(player)) {
        let youWin = true;
    }
}

function movement() {
    if (kb.pressing('left')) {

        player.vel.x = -5;
    }
    else if (kb.pressing('right')) {
        player.vel.x = 5;
    } else {
        player.vel.x = 0;
    }

}

function bigJump() {
    if ((bigGroundSensor.overlapping(grass) ||
        bigGroundSensor.overlapping(stonePlatform)) && kb.presses('up')) {

        player.vel.y = -8;
    }
}
function jump() {
    if ((groundSensor.overlapping(grass) ||
        groundSensor.overlapping(stonePlatform)) && kb.presses('up')) {
        player.vel.y = -8;
    }
}

function size() {
    if (kb.presses('e')) {
        if (grow == false) {
            grow = true;
            shrink = false;

        } else {
            grow = false;
        }
    }

    if (kb.presses('q')) {
        if (shrink == false) {
            shrink = true;
            grow = false;

        } else {
            shrink = false;
        }
    }

    if (normalSize) {
        player.w = 32;
        player.h = 32;
        groundSensorSwitch = true;
        bigGroundSensorSwitch = false;
    }

    if (grow == true) {
        player.w = 28;
        player.h = 74;
        bigGroundSensorSwitch = true;
        groundSensorSwitch = false;
    }

    if (shrink == true) {
        player.w = 32;
        player.h = 11;
        groundSensorSwitch = true;
        bigGroundSensorSwitch = false;
    }
}

function timer() {
    time = int((millis() - startTime) / 1000);
    if (time > 5) {
        hideCheck();
        startTime += 6000;
    }
    return time;
}

function hideCheck() {
    if (shrink) {
        if (hidingBush.overlapping(player)) {
            hidden = true;
        }
        else {
            hidden = false;
        }
    }
    else if (grow) {
        if (hidingPoll.overlapping(player)) {
            hidden = true;
        }
        else {
            hidden = false;
        }
    }
    else {
        hidden = false;
    }
}