new Q5;
let life = 10;
let portal, playerFacing = 1, portalImg, isGrounded = false, grass, deaths = 0, grassImg, chest, chestImg, soil, soilImg, tilesGroup, score = 0;
const playerSpeed = 4;
const jumpForce = 4.4;
const gravity = 0.2;
function preload() {
    grassImg = loadImage('Image/Grass.png');
    soilImg = loadImage('Image/Soil2.png');
    chestImg = loadImage('Image/chest.png');
    portalImg = loadImage('Image/portal.png');
    spikeImg = loadImage('Image/Spike.png');
    spike2Img = loadImage('Image/Spike2.png');
    jailImg = loadImage('Image/jail.png');
    brickImg = loadImage('Image/bricks.png');
    jail2Img = loadImage('Image/jail2.png');

}
function setup() {
    new Canvas(1070, 700);
    //player
    player = new Sprite(100, 240, 20); // Create a new sprite
    player.color = '';
    player.friction = 0; // Set friction to 0 to prevent sliding after stopping
    player.bounciness = 0;

    //portal
    portal = new Sprite();
    portal.w = 0;
    portal.h = 0;
    portal.img = portalImg;
    portalImg.resize(82, 85);
    portal.tile = '=';
    portal.physics = STATIC;

    //grass
    grass = new Group();
    grass.w = 20;
    grass.h = 15;
    grass.img = grassImg;
    grassImg.resize(42, 50);
    grass.tile = '-';
    grass.physics = STATIC;


    //soil
    soil = new Group();
    soil.w = 20;
    soil.h = 15;
    soil.img = soilImg;
    soilImg.resize(42, 50);
    soil.tile = 's';
    soil.physics = STATIC;


    //chest
    chest = new Group();
    chest.w = 20;
    chest.h = 15;
    chest.img = chestImg;
    chestImg.resize(64, 70);
    chest.tile = 'c';
    chest.physics = STATIC;

    //spike
    spike = new Group();
    spike.w = 20;
    spike.h = 15;
    spike.img = spikeImg;
    spikeImg.resize(60, 66);
    spike.tile = '^';
    spike.physics = STATIC;

    //spike2
    spike2 = new Group();
    spike2.w = 20;
    spike2.h = 15;
    spike2.img = spike2Img;
    spike2Img.resize(64, 70);
    spike2.tile = 'Y';
    spike2.physics = STATIC;

    //jail
    jail = new Group();
    jail.w = 40;
    jail.h = 60;
    jail.img = jailImg;
    jailImg.resize(120, 100);
    jail.tile = 'j';
    jail.physics = STATIC;

    //broken jail
    jail2 = new Group();
    jail2.w = 20;
    jail2.h = 15;
    jail2.img = jail2Img;
    jail2Img.resize(120, 160);
    jail2.tile = '2';
    jail2.physics = STATIC;

    //brick
    brick = new Group();
    brick.w = 20;
    brick.h = 15;
    brick.img = brickImg;
    brickImg.resize(42, 35);
    brick.tile = 'b';
    brick.physics = STATIC;

    //airwall
    airwall = new Group();
    airwall.w = 20;
    airwall.h = 15000;
    airwall.tile = 'a';
    airwall.color = 'grey'
    airwall.physics = STATIC;

    // Create a new group for the projectiles
    projectiles = new Group();
    projectiles.color = 'yellow';
    projectiles.diameter = 10;
    // A projectile's life property determines how many frames it will exist for.
    projectiles.life = 60;


    //map
    tilesGroup = new Tiles(
        [

            ' a....................c                           a',
            'ss..c................----                         s',
            'ss..------^         -                  -------    s',
            'ss...sssss--                             Y        s',
            'ss             ^^^                                s',
            'ss............------                              s',
            'ss.............sssss-                   ^  ^      s',
            'ss                                     --------   s',
            'ss                                                s',
            'ss.....              --                          ^s',
            'ss.....................................    ..-----s',
            'ss--.................................... ..--ssssss',
            'ssss--..................----.............--ssssssss',
            'ssssss.............................  ^^--ssssssssss',
            'ssssss--.---^^.....................----ssssssssssss',
            'ssssssss.sss--^^^....^^--------.---ssssssssssssssss',
            'ssssssss.sssss---------ssssssss.sssssssssssssssssss.',
            'bbbbbbbb.bbbbbbbbbbbbbbbbbbbbbb.bbbbbbbbbbbbbbbbbbb',
            'b. j.j ................b................          b',
            'b......................b.................... .....b',
            'b                      b                     2    b',
            'b  j j                 b                          b',
            'b         ^^    ^c  ^  b     ^   ^  ^  ^         cb',
            'bbbbbbbbbbbbbb.bbbbbbbbb.bbbbbbbbbbbbbbbbbbbbbbbbbb',
            'b     Y  Y                   Y  Y         Y       b',
            'b                                                 b',
            'b                 2   bbb                    2    b',
            'b                                                 b',
            'b c ^^    ^^                        ^   ^    ^ c  b',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb..bbbbbbbbbbbbbbbb',
            'b                                               bbb',
            'b                                                 b',
            'bbbbbb                                            b',
            'b                                               = b',
            'b             b   b   b   bbb    bbbb   bbbbb     b',
            'b                                              ^  b',
            'b  c      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^bbbb',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
        ],
        10, 92,
        grass.w + 1, grass.h + 1


    );
    //custom function
    player.overlaps(spike, die);
    player.overlaps(spike2, die);
    player.collides(chest, scores);
    player.overlaps(portal, check);


}
function update() {
    //in game text
    clear();
    background('skyblue');
    fill(102, 98, 85);
    rect(0, height / 2, width, height / 2);
    textSize(20);
    text('Collect all 7 chests and get to the portal', 60, 60);
    text('Life left: ' + life, 90, 30);
    text('HINT: press w before pressing a & d', 700, 30)
    text('Chest collected: ' + score, 90, 90);
    player.vel.y += gravity;
    //Jump
    if (player.colliding(grass) || player.colliding(brick)) {
        isGrounded = true;
    } else {
        isGrounded = false;
    }

    if (kb.presses('up'||'w') && isGrounded) {
        player.vel.y = -4.4;
    }

    // Horizontal movement
    if (kb.pressing('left'||'a')) {
        player.vel.x = -playerSpeed;
    }
    else if (kb.pressing('right'||'d')) {
        player.vel.x = playerSpeed;
    }
    else {
        // Stop horizontal movement when keys are not pressed
        player.vel.x = 0;
    }
    //Game over
    if (deaths >= 10) {
        text('GAME OVER', 535, 150);
        noLoop();
    }
    //reset
    if (kb.presses('r')) {
        // Check if the player sprite still exists before trying to remove it.
        player.vel.set(0, 0);
        if (player) {// Removes the sprite from the sketch.
            player.x = 100;
            player.y = 240;
            player.vel.set(0, 0);
            deaths = 0;
            score = 0;
            life = 10;
        }
    }
    // Draw all sprites, including the player and any active projectiles
    allSprites.draw();
}

//step on spike
function die(player, spike) {
    deaths++;
    life--;
    player.x = 100;
    player.y = 240;
    player.vel.set(0, 0);


}
//collects chest
function scores(player, chest) {
    score++;
    chest.remove();
    text(score, 90, 90);
}
//portal
function check(player, portal) {
    if (score == 7) {
        text('GG, You made it!', 535, 150);
        noLoop();
    }
    else {
        deaths += 10;
    }
}

