new Q5;
let player, platform, platform2, start, starterImg, tilesGroup, coin, score, deaths, jump, grounded = true, gAMEOVER;
new Canvas;

gAMEOVER = "GAME OVER!"
deaths = 0
score = 0
jump = "Jump into the pit!";

let rec = createRecorder();
rec.bitrate = 10;




function preload() {
    starterImg = loadImage('images/starter.png');
    playerImg = loadImage('images/bigged.png');
    sandImg = loadImage('images/sand.png');
    coinImg = loadImage('images/bigCoin.png');
    waterImg = loadImage('images/water.png');
    brickImg = loadImage('images/brick.png'); 
    spikeImg = loadImage('images/shiftedRevSpike.png');  
    projectileImg = loadImage('images/newProjectile.png');
    endImg = loadImage('images/end.png');
    iceImg = loadImage('images/ice.png')
}

function setup() {

    
    world.gravity.y = 10
    noStroke();
    // makes the starting platform
    start = new Group();
    start.w = 35;
    start.h = 77;
    start.physics = STATIC;
    start.img = starterImg;
    start.tile = '=';
   // starterImg.resize = (350, 250);

   projectiles = new Group();
   projectiles.img = projectileImg;
   projectiles.diameter = 10;
   projectiles.life = 60;
   projectiles.rotationLock = true;

   water = new Group();
   water.img = waterImg;
   water.tile = 'w';
   water.physics = STATIC;
   water.width = 50;
   water.h = 77;

   spike = new Group();
   spike.img = spikeImg;
   spike.tile = 's';
   spike.width = 64;
   spike.height = 64;
   spike.physics = STATIC;

   brick = new Group();
   brick.img = brickImg;
   brick.height = 70;
   brick.physics = STATIC;
   brick.tile = 'b';
   

    coin = new Group();
    coin.x = 40;
    coin.img = coinImg;
    coinImg.resize = (256, 256);  
    coin.tile = 'c'
    coin.physics = STATIC;
    coin.y=100

    // // allows for the platform to be made
    // platform = new Sprite();
    // platform.color = 'red';
    // platform.rotation = 45; 
    // // platform.img = sandImg;
    // // sandImg.resize(74, 74);
    // // platform.width = 54;
    // // platform.height = 54;
    // platform.physics = STA;

    // platform2 = new Sprite();
    // platform2.color = 'orange';
    // platform2.x = 1120;
    // platform2.y = 240
    // platform2.rotation = 90;
    // platform2.width = 15;
    // platform2.physics = STATIC;
    
    // allows for the p;layer to be made
    player = new Sprite();
    player.color = 'green';
    playerImg.resize(64,64);
    player.x = 1132;
    player.y = 500;
    player.img = playerImg;
    // playerImg.resize(128,128);
    player.radius = 5; 
    player.rotationLock = true;
    // camera.y = player.y

    end = new Group();
    end.img = endImg;
    end.physics = STATIC;
    end.tile = 'e';

    ice = new Group();
    ice.img = iceImg;
    ice.physics = STATIC;
    // ice.y = 800; // iceImg.resize(64000, 64)
    ice.width = 40;
     ice.tile = 'i';




    tilesGroup = new Tiles (
        [
        'wwwwwwwwwwwwwwwwwwwwwwwwww............................................................................................................................................................===========',
        'w........................................................................c',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        'bbbbbbbbbbbbbbbbbbbbbbbbbb............................................................................................................................................................bbbbbbbbbbbb',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
         '',
         '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
         '',
         '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
         '',
         '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
      '',
      '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
       '', 
       '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
         '',
         '',
         '',
         '',
         '',
         '',
         '',
         '',
         '',
         '',
         '',
         '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
           '',
           '',
           '',
           '',
           '',
           '',
           '',
           '',
           '',
           '',
           '',
           '',
            '',
            '.........................................................................................................................................................................................................................................................................................................................................................................c',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
             '',
             '',
             '',
             '',
             '................................................................................................................................................................................s............................s............................s.................................................................................................................................................................................................................................s.',
            '',
            '',
            '',
            '',
            '',
            '',





            'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',

            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',

            '',
            '',
             '',
             '',
             '',
             '',
             '',
             '',
             '',

              '',
              '',
              '',
              '',
              '',
              '',

               '',
                '',
                 '',
                  '',
                   '',
                   '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '............................................................................................................................................................................e',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',


            'iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',
           
            
            

        
        ],
        1132,
        708,
        // start.w + 1,
        // start.h + 1,
    )

    player.overlaps(coin, removeGathered);
    projectiles.collides(spike, removeSpike);
    player.collides(spike, die); 
    

  
    
}

function update() {
    background('lightblue');
    // allows for the camera to follow the ball
    camera.y = player.y 
    camera.x = player.x 

    // adds control for the w button

    if (player.colliding(start) || player.colliding(brick) || player.colliding(ice)) {
        grounded = true;
    }

    if (kb.presses('up') && grounded) {
       player.vel.y = -5;
    }

    // adds control for the a button

    if (kb.presses('left')) {
        player.vel.x = -5;
    }

    // adds control for the s button

    if (kb.presses('down')) {
        player.vel.y = 5;
    }

    // adds control for the d button

    if (kb.presses('right')) {
        player.vel.x = 5;
    }  

    if (kb.presses('space')) {
        projectile()
    }

    if (deaths>=3) {
        textSize(120)
        textAlign("center")
        text(gAMEOVER, 532, 400);

        // making it so that the w value corrosponds to nothing

        if (player.colliding(end)) {
            deaths = 4
            gAMEOVER = "VICTORY"
        }
        if(kb.presses(w)) {
            player.vel.y = 0;
        }
    }

    if (kb.presses('enter')) {
        deaths = 0;
    }
    // displayhs scorea

    textSize(80);
    textAlign("center")
    text(score, 100, 300);

    textSize(40);
    textAlign("center")
    text(jump, 700,300);

    if (player.vel.x > 0) {
        jump = ' ';
    }

    // if (player.colliding(end)) {
    //     textSize(120)
    //     textAlign("center")
    //     text("VICTORY", 532, 400);
    // }

    

}


// Anagh's custom function that removes gathered coins
function removeGathered(player, gathered) {
    gathered.remove();
    score += 2;
}

// custom function that deals withplayer dyinh
function die(player, spike) {
    deaths++;
    player.x = 1132
    player.y = 500;
    player.vel.set(0, 0);
    score += -1;
}

// function that makes projectile
function projectile(){
  
    // creates projectile
    let newProjectile = new projectiles.Sprite();
    newProjectile.x = player.x;
    newProjectile.y = player.y;
    // set the projectiles velocity

    newProjectile.direction = 0;
    newProjectile.speed = 10;
}

// function that deals with the spike disapperaring when hit by a projectile
function removeSpike(projectile, spikeHit) {
    spikeHit.remove()
}

// deals with the number of lives a person has left
// function lives(player) {
//     deaths++;
// }


