//functions & image loading
let portal, portalImg, groundSensor, Cloud, CloudImg, Grass, GrassImg, Coin, CoinImg, tilesGroup, player, playerImg;
let score = 0;
function preload(){
CloudImg = loadImage('Images/Cloud-1.png');
GrassImg = loadImage('Images/Grass-1.png');
CoinImg = loadImage('Images/Coin-1.png');
playerImg = loadImage('Images/Player.png')
portalImg = loadImage('Images/Portal.png')
myFont = loadFont('Assets/SpaceGrotesk-Regular.ttf')
}
function setup() {

    new Canvas('9:16');
    world.gravity.y = 10;

    //jump refresh debug
    textSize(300);
    text('hi', 100, 500)

    //Clouds
    Cloud = new Group();
    Cloud.w = 16;
    Cloud.h = 16;
    Cloud.bounciness = 0;
    Cloud.physics = STA;
    Cloud.img = CloudImg;
    CloudImg.resize(35, 35);
    Cloud.tile = '=';

    //Grass
    Grass = new Group();
    Grass.w = 16;
    Grass.h = 16;
    Grass.physics = STA;
    Grass.img = GrassImg;
    GrassImg.resize(35, 35);
    Grass.tile = 'g';

    //portal
    portal = new Group();
    portal.w = 16;
    portal.h = 16;
    portal.bounciness = 0;
    portal.physics = STA;
    portal.img = portalImg;
    portalImg.resize(35, 35);
    portal.tile = 'p';
    
    //Coins
    Coin = new Group();
    Coin.w = 15;
    Coin.h = 15;
    Coin.physics = STA;
    Coin.img = CoinImg;
    CoinImg.resize(35, 35);
    Coin.tile = 'c';

    //player
    player = new Sprite();
    player.w = 15;
    player.h = 15;
    player.y = 880;
    player.bounciness = 0;
    player.shape = 'circle';
    player.physics = DYN;
    player.rotationLock = true;
    player.img = playerImg;
    playerImg.resize(30, 30);

    //Tiles

    tilesGroup = new Tiles(
        [
            '================================',
            '=                            pp=',
            '=                            pp=',
            '=                            pp=',
            '=======ccc======================',
            '=     ccc                      =',
            '=     cc                       =',
            '=     =                   c    =',
            '=                         c    =',
            '= c                       c    =',
            '= =                       =    =',
            '=                     c        =',
            '=     c               c        =',
            '=     =               =        =',
            '=                 c            =',
            '=         c       c            =',
            '=         =       =            =',
            '=                              =',
            '=             c       c        =',
            '=             =       =        =',
            '=                              =',
            '=c       c       c        c    =',
            '==       =       =        =   c=',
            '=                             c=',
            '=    c       c                c=',
            '=    =       =                ==',
            '=                              =',
            '=c       c       c        c    =',
            '==       =       =        =    =',
            '=    c                         =',
            '=    c               cc       c=',
            '=    =               ==       ==',
            '= c c                          =',
            '= c c    ccccccccc        c    =',
            '= = =    =========        =  c =',
            '=                            c =',
            '=                            c =',
            '== = =    c c c c c  ====   ====',
            '= c       c       c         ccc=',
            '= c       c c c c c         ccc=',
            '= =   c   =========         ====',
            '=     c       cc            c c=',
            '=    ccc      cc           cccc=',
            '=c   ===   c  ==    c c c  =====',
            '=c         c        c c c      =',
            '=c         c        ccccc      =',
            '==        ===   c   =====     c=',
            '=               c             c=',
            '=   ccc         c             c=',
            '=   ===         =           ====',
            '=                              =',
            '=         cccc      ccccc      =',
            '=         ====      =====      =',
            '=                              =',
            '=                              =',
            'gg  ggggg     gggggg        ggg=',
            'ggggggggggg  gggggggggg  ggggggg',
            'gggggggggggggggggggggggggggggggg'
        ],
        8.5,
        9,
        Cloud.w + 0.7,
        Cloud.h + 0.7
    );
}


//background
function draw() {
    clear();
    background('#39b5ff');  

    camera.pos = player.pos;
    camera.zoom = 1.4;

    player.overlap(Coin, collect);
    textSize(32);
    textFont = myFont
    text(`Score: ${score}`, 20, 40);
    textSize(10);
    text('Reminder: go in the portal to restart.', 300, 900);

    if (player.overlaps(portal)) {
        window.location.reload();
    }

    if (kb.pressing('left'))
        player.vel.x = -1.8;
    
    else if (kb.pressing('right')) 
        player.vel.x = 1.8;
    else 
        player.vel.x = 0;

    if (kb.pressing('up') && player.colliding(Grass) || kb.pressing('up') && player.colliding(Cloud))
        player.vel.y = -4.1;
        
}

function collect(player, Coin) {
    score+= 8000;
    Coin.remove();
}