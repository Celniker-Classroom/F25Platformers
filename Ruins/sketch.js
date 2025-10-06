let player, grass, grassImg, soil, soilImg, grassR, grassRImg, grassL, grassLImg, soilR, soilRImg, soilL, soilLImg, soilRB, soilRBImg, soilLB, soilLBImg, soilD, soilDImg, soilRD, soilRDImg, soilLD, soilLDImg, soilF, soilFImg, soilRF, soilRFImg, soilLF, soilLFImg, end, endImg, tilesGroup;
let canJump = true
let talk = ["Hey there little friend! (space to continue)", " You lost? (space to continue)", "Don't Worry! The name's Glowby and Ill teach you the ropes! (space to continue)", "Hmmm.. This Jump looks tricky! (space to continue)", "Try pressing (w) in the air to double jump! (space to continue)", "Nice! Seems you're getting the hang of things! (space to continue)", "Be careful not to let go of (a) or (d) while trying to make a jump. (space to continue)", "You'll lose all your momentum!", "Seems you cant jump that high...", "Try rapidly changing directions while holding (w) to perform a Spin Jump!", "Well, Iv'e taught you all I know!", "My journey ends here, this is my home.", "The underground is vast and many dangers lie ahead.", "Take care! I believe you little fella!"]
let talkNum = 0
let started = false
function preload() {
    grassImg = loadImage('Sprites/Grass.png')
    soilImg = loadImage('Sprites/Soil.png')
    grassRImg = loadImage('Sprites/GrassR.png')
    grassLImg = loadImage('Sprites/GrassL.png')
    soilRImg = loadImage('Sprites/SoilR.png')
    soilLImg = loadImage('Sprites/SoilL.png')
    soilRBImg = loadImage('Sprites/SoilRB.png')
    soilLBImg = loadImage('Sprites/SoilLB.png')
    soilDImg = loadImage('Sprites/SoilD.png')
    soilRDImg = loadImage('Sprites/SoilRD.png')
    soilLDImg = loadImage('Sprites/SoilLD.png')
    soilFImg = loadImage('Sprites/SoilF.png')
    soilRFImg = loadImage('Sprites/SoilRF.png')
    soilLFImg = loadImage('Sprites/SoilLF.png')
    endImg = loadImage('Sprites/End.png')

}

function setup() {
    new Canvas();
    displayMode(CENTER, PIXELATED, 6);
    allSprites.pixelPerfect = true

    world.gravity.y = 10
    //sprites

    grass = new Group();
    grass.w = 75;
    grass.h = 75;
    grass.img = grassImg;
    grassImg.resize(150, 150);
    grass.tile = '=';
    grass.physics = STA
    grass.bounciness = 0
    grass.layer = 1

    soil = new Group();
    soil.w = 75;
    soil.h = 75;
    soil.img = soilImg;
    soilImg.resize(150, 150);
    soil.tile = 'd';
    soil.physics = STA
    soil.bounciness = 0
    soil.layer = 1

    grassR = new Group();
    grassR.w = 75;
    grassR.h = 75;
    grassR.img = grassRImg;
    grassRImg.resize(150, 150);
    grassR.tile = '>';
    grassR.physics = STA
    grassR.bounciness = 0
    grassR.layer = 1

    grassL = new Group();
    grassL.w = 75;
    grassL.h = 75;
    grassL.img = grassLImg;
    grassLImg.resize(150, 150);
    grassL.tile = '<';
    grassL.physics = STA
    grassL.bounciness = 0
    grassL.layer = 1

    soilR = new Group();
    soilR.w = 75;
    soilR.h = 75;
    soilR.img = soilRImg;
    soilRImg.resize(150, 150);
    soilR.tile = 'r';
    soilR.physics = STA
    soilR.bounciness = 0
    soilR.layer = 1

    soilL = new Group();
    soilL.w = 75;
    soilL.h = 75;
    soilL.img = soilLImg;
    soilLImg.resize(150, 150);
    soilL.tile = 'l';
    soilL.physics = STA
    soilL.bounciness = 0
    soilL.layer = 1

    soilRB = new Group();
    soilRB.w = 75;
    soilRB.h = 75;
    soilRB.img = soilRBImg;
    soilRBImg.resize(150, 150);
    soilRB.tile = ']';
    soilRB.physics = STA
    soilRB.bounciness = 0
    soilRB.layer = 1

    soilLB = new Group();
    soilLB.w = 75;
    soilLB.h = 75;
    soilLB.img = soilLBImg;
    soilLBImg.resize(150, 150);
    soilLB.tile = '[';
    soilLB.physics = STA
    soilLB.bounciness = 0
    soilLB.layer = 1

    soilD = new Group();
    soilD.w = 75;
    soilD.h = 75;
    soilD.img = soilDImg;
    soilDImg.resize(150, 150);
    soilD.tile = '?';
    soilD.physics = NONE
    soilD.bounciness = 0

    //glowby NPC
    glowby = new Sprite
    glowby.rotationLock = true
    glowby.physics = NONE
    glowby.x = 2689
    glowby.y = 1237
    glowby.addAni('GlowIdle', 'Sprites/Glowby Idle 1.png', 'Sprites/Glowby Idle 2.png ');
    glowby.addAni('Happy', 'Sprites/Glowby Happy.png')
    glowby.scale = .5
    glowby.layer = 1

    //glowby talk trigger
    glowbyBox = new Sprite
    glowbyBox.rotationLock = true
    glowbyBox.physics = NONE
    glowbyBox.x = 2689
    glowbyBox.y = 1237
    glowbyBox.width = 350
    glowbyBox.opacity = 0
    glowby.changeAni('GlowIdle')
    glowby.ani.frameDelay = (15)

    player = new Sprite
    player.rotationLock = true
    player.bounciness = 0
    //player animations
    player.addAni('Idle', 'Sprites/Dog Idle 1.png', 'Sprites/Dog Idle 2.png ')
    player.addAni('Run', 'Sprites/Dog Idle 1.png', 'Sprites/Dog Run 1.png', 'Sprites/Dog Run 2.png', 'Sprites/Dog Run 3.png', 'Sprites/Dog Run 4.png')
    player.addAni('Jump', 'Sprites/Dog Jump.png')
    player.addAni('Fall', 'Sprites/Dog Run 3.png')
    player.addAni('Heli', 'Sprites/Heli.png')
    player.scale = .5
    player.width = 50
    player.height = 100
   // player.debug = true
    player.x = 449
    player.y = 2512

    playerJump = new Sprite(player.x, player.y + 50, 45, 10)
    new GlueJoint(player, playerJump)
    playerJump.opacity = 0
    playerJump.bounciness = 0
    //playerJump.debug = true

    //End of game
    end = new Sprite
    end.rotationLock = true
    end.x = 7478
    end.y = 495
    end.physics = NONE
    end.img = endImg
    end.width = 100
    end.height = 400
    //end.debug = true


    //level
    tilesGroup = new Tiles(
        [
            '..................................................................................',
            '..................................................................................',
            '..................................................................................',
            '...........................................................................................<==========>',
            '................................................................................<>.........[dddddddddd]',
            '................................................................................lr.........',
            '................................................................................lr...........',
            '.......................................................................<========dr..........',
            '.......................................................................[ddddddddd]........',
            '......................................',
            '...........................................................<==>.',
            '.................................<===>.....................[dd].',
            '...........................<=====ddddr......<====>.',
            '.........................[ddddddddddd]......[dddd].....',
            '......................................',
            '..................<=>.................',
            '..................[d].................',
            '..........................<>.............',
            '......................................',
            '.................................<>.....',
            '...........................................<>',
            '...........................................[]',
            '......................................<>',
            '......................................[]',
            '..........................<>.....<>....',
            '.....................<>...[].....lr...',
            '...............<==>..lr..........[]....',
            '............<==dddr..lr................',
            '<===========ddddddr..lr...............',
            'ldddddddddddddddddr..lr...............',
            '[ddddddddddddddddd]..[]...............'
        ],
        0,
        500,
        grass.w + 0,
        grass.h + 0
    );
    playerJump.overlaps(allSprites)
}

function draw() {
    clear();
    background(50 - (player.y/50))

    camera.x = player.x
    camera.y = player.y

    playerMovement()
    npc()
    //end game call
    if (player.overlaps(end)) {
        background('black')
        fill(255)
        textSize(100)
        textAlign(CENTER)
        text("Ruins", width / 2, height / 2);
        end()
    }

    function playerMovement() {
        if (player.vel.y > 0) {
            player.changeAni('Fall');
            player.ani.frameDelay = 15
        }
    }

    //reset game
    if (player.y > 3500){
        player.x = 449
    player.y = 2512
    }
    //left right movement
    if (kb.pressing('d') && player.vel.x <= 10) {
        player.vel.x = max(3, player.vel.x);
        player.vel.x += .5
        player.scale.x = .5
        //run anim
        if (player.vel.y == 0) {
            player.changeAni('Run');
            player.ani.frameDelay = 5
        }
        if (!playerJump.overlapping(allSprites) && player.colliding(allSprites)) {
            player.vel.x =0;
        }
    }//running code
    else if (kb.pressing('a') && player.vel.x >= -10) {
        player.vel.x = min(-3, player.vel.x);
        player.vel.x += -.5
        player.scale.x = -.5
        //run anim
        if (player.vel.y == 0) {
            player.changeAni('Run');
            player.ani.frameDelay = 5
        }
        if (!playerJump.overlapping(allSprites) && player.colliding(allSprites)) {
            player.vel.x = 0;
        }
    }
    else if ((!kb.pressing('d') && !kb.pressing('a')) && playerJump.overlapping(allSprites) && player.vel.y == 0) {
        player.vel.x = 0;
        player.changeAni('Idle');
        player.ani.frameDelay = 15
    }

    //movement
    //jump1 
    if (kb.presses('w') && (canJump == true) && playerJump.overlapping(allSprites)) {
        player.changeAni('Jump');
        player.ani.frameDelay = 15
        player.vel.y += -9
    }
    //air jump
    if (kb.presses('w') && (canJump == true) && !playerJump.overlapping(allSprites)) {
        player.vel.y = -1
        player.vel.y += -7
        player.changeAni('Jump');
        player.ani.frameDelay = 15
    }
    //Helicopter Jump
    if (player.vel.x <= 4.5 && player.vel.x >= -4.5) {
        if (((kb.pressing('a') && kb.presses('d')) && (kb.pressing('w'))) || ((kb.pressing('d') && kb.presses('a')) && (kb.pressing('w')))) {
            player.changeAni('Heli')
            player.ani.frameDelay = 15
            player.vel.y -= .5
        }
    }

    //double jumping conditions
    if (playerJump.overlapping(allSprites)) {
        canJump = true
    }
    if (!playerJump.overlapping(allSprites) && (kb.presses('w'))) {
        canJump = false
    }

    if (playerJump.overlapping(allSprites)) {
        player.vel.x *= 0.98
    } else {
        player.vel.x *= 0.95
        if (!kb.pressing('d') && !kb.pressing('a')) {
            player.vel.y += .3
        }
    }
    // if (!playerJump.overlapping(allSprites) && player.colliding(allSprites)) {
    //     player.vel.y -= -2
    // }
//     fill(255);
//     text("X: " + round(player.x) + " Y: " + round(player.y) + " V:" + round(player.vel.x) + " H:" + round(player.vel.y), 25, 25);
//     text("X: " + round(glowby.x - camera.x) + " Y: " + round(glowby.y - camera.y), 25, 50);
}

function npc() {
    if (player.overlapping(glowbyBox)) {
        glowby.changeAni('Happy')
        fill(255);
        //textSize(50);
        text(talk[talkNum], glowby.x - 100 - camera.x + width / 2, glowby.y - 50 - camera.y + height / 2)
        if (kb.presses('space') && talkNum < talk.length - 1) {
            talkNum++
            if (talkNum == 3) {
                glowby.x = 3610
                glowby.y = 1312
                glowbyBox.x = 3610
                glowbyBox.y = 1312
            }
            if (talkNum == 5) {
                glowby.x = 4587
                glowby.y = 1162
                glowbyBox.x = 4587
                glowbyBox.y = 1162
            }
            if (talkNum == 8) {
                glowby.x = 5547
                glowby.y = 937
                glowbyBox.x = 5547
                glowbyBox.y = 937
            }
            if (talkNum == 10) {
                glowby.x = 7030
                glowby.y = 637
                glowbyBox.x = 7030
                glowbyBox.y = 637
            }
        }
    } else { glowby.changeAni('GlowIdle') }
}
function gameEnd() {
    allSprites.removeALL();

}