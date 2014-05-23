var game = new Phaser.Game(800,600,Phaser.AUTO,'container');

var player;
var facing = 'left';
var jumpTimer = 0;//temps de espera entra salts
var cursors;//input cursors
var jumpButton;//tecla on guardes jump
var numerosalts=0;//conta els salts per a fer doble salt
var doublejump=false;//triguer de cuan es pot fer el doble salt
var map;//variable canvas del mapa
var layer;//variable canvas de les textures en general
var level= "level";//nivell inicial
var numlevel=0;//contador del lvl actual
var deaths=0;//num morts
var textDeaths;//variable canvas text num morts
var spike=[];//array de objectes spike
var spikei=0;//contador de spikes
var trap=[];//array de objectes spikeman
var trapi=0;//contador de spikemans
var barrel=[];//array de objectes barrel
var barreli=0;//contador de barrels
var lakitu="";//variable del mov lakitu

var timer=0;//es un contador que se incrementa cada vegada que s'executa l'update es per limitar el moviment dels lakitus


//pause
document.addEventListener("keydown", pausel, false);
function pausel(e) {
    var keyCode = e.keyCode;//alert(keyCode);

    if(keyCode=="80"&&game.paused==true){
        game.paused=false;
        //console.log("continua");
    }else if(keyCode=="80"&&game.paused==false){
        game.paused=true;
        //console.log("pause");
    }
}
//FI pause

Game = {};
Game.InGame = function(game,level){

};//crida a ingame amb
//prototype de ingame
Game.InGame.prototype = {

preload : function() {
    //carregat de tots els fitxers necesaris
    game.load.tilemap('map', 'level/menu.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles2', 'assets/textures.png');
    game.load.spritesheet('dude', 'assets/dude.png', 42, 74);
    game.load.spritesheet('dude2', 'assets/dude2.png', 42, 74);
    game.load.image('flag', 'assets/flag-5.png', 32, 32);
    game.load.image('barrel', 'assets/barrel.png', 32, 32);
    game.load.image('spike', 'assets/spike.png', 32, 32);
    game.load.image('spike2', 'assets/spike2.png', 32, 32);
    game.load.image('spikeman', 'assets/spikeman.png', 32, 32);
    game.load.image('lakitu', 'assets/lakitu.png', 32, 32);
    game.load.image('lakitu2', 'assets/lakitu2.png', 32, 32);
    game.load.image('tifa', 'assets/tifa.png', 32, 32);
    game.load.image('block', 'assets/block.png', 32, 32);
},
    
create : function() {
    //iniciem el motor de fisiques
    game.physics.startSystem(Phaser.Physics.P2JS);
    //color de fondo
    game.stage.backgroundColor = '#308fe3';
    //posem les textures del mapa
    map = game.add.tilemap('map');

    map.addTilesetImage('tiles2');

    layer = map.createLayer('Capa de Patrones 1');

    layer.resizeWorld();

    map.setCollisionBetween(1, 12);

    game.physics.p2.convertTilemap(map, layer);
    //posem la gravetat i rebot amb el terra
    game.physics.p2.restitution = 0.2;
    game.physics.p2.gravity.y = 2300;
    //posem un text fixe a la pantalla amb el numero de morts
    game.add.text(16,16,"Controls:", {font: "24px arial", fill: "#fff"});
    game.add.text(16,40,"- Cursors for move and jump", {font: "24px arial", fill: "#fff"});
    game.add.text(16,74,"- Space for run", {font: "24px arial", fill: "#fff"});
    game.add.text(16,108,"- Key P for pause", {font: "24px arial", fill: "#fff"});
    game.add.text(16,142,"- Double cursor UP for doble jump", {font: "24px arial", fill: "#fff"});

    //creem el player1
    var playerwidth=100;
    var playerheight=200;

    player = game.add.sprite(playerwidth, playerheight, 'dude');
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    player.owidth=playerwidth;
    player.oheight=playerheight;

    game.physics.p2.enable(player);

    player.body.fixedRotation = true;

    game.camera.follow(player);

    //creem la bandera per passar de level
    game.add.text(260,300,"Single Player", {font: "24px arial", fill: "#fff"});
    game.add.text(475,300,"Multi Player", {font: "24px arial", fill: "#fff"});
    game.add.text(475,266,"Share your ID before start!", {font: "24px arial", fill: "#fff"});

    flagsingle = game.add.sprite(330, 350, 'block');

    game.physics.p2.enable(flagsingle);

    flagsingle.body.fixedRotation = true;

    flagsingle.body.data.gravityScale = 0;
    flagsingle.asd=true;

    flagmulti = game.add.sprite(530, 350, 'block');

    game.physics.p2.enable(flagmulti);

    flagmulti.body.fixedRotation = true;

    flagmulti.body.data.gravityScale = 0;
    flagmulti.right=false;
    flagmulti.asd=true;

    //carreguem els inputs
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    keyboard = game.input.keyboard;

},

update : function() {
    //update es un bucle constant

    //funcions de moviment
    if (cursors.left.isDown && keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        player.body.moveLeft(350);

        if (facing != 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    } else if (cursors.right.isDown && keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        player.body.moveRight(350);

        if (facing != 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else if (cursors.left.isDown) {
        player.body.moveLeft(200);

        if (facing != 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown) {
        player.body.moveRight(200);

        if (facing != 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else {
        player.body.velocity.x = 0;

        if (facing != 'idle') {
            player.animations.stop();

            if (facing == 'left') {
                player.frame = 0;
            }
            else {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    //salt
    if (jumpButton.isUp && numerosalts == 0) {
        numerosalts = 1;
    }

    if (jumpButton.isDown && game.time.now > jumpTimer && checkIfCanJump(player)) {
        player.body.moveUp(650);
        jumpTimer = game.time.now + 750;
        numerosalts = 0;
    } else if (jumpButton.isDown && numerosalts == 1) {
        player.body.moveUp(650);
        jumpTimer = game.time.now + 750;
        doublejump = false;
        numerosalts = -1;
    }

    if (keyboard.isDown(Phaser.Keyboard.DOWN)) {

        player.body.moveUp(650);
        jumpTimer = game.time.now + 750;
        doublejump = false;
        numerosalts = -1;
    }
    //FI funcions de moviment

    if(trapcollides(flagsingle, player)){
        if(flagsingle.asd){
            flagsingle.exists=false;
            flagsingle = game.add.sprite(330, 350, 'tifa');
            game.physics.p2.enable(flagsingle);
        }


        cauTrap(flagsingle);

    }
    if(trapcollides(flagmulti, player)){
        if(flagmulti.right)flagmulti.body.velocity.x=400;
        if(!flagmulti.right)flagmulti.body.velocity.x=-400;
        if(flagmulti.asd){
            game.add.text(520,450,"Nope >:C", {font: "26px arial", fill: "#fff"});
            game.add.text(475,292,"__________", {font: "24px arial", fill: "#fff"});
            game.add.text(475,286,"__________", {font: "24px arial", fill: "#fff"});
            var yol=game.add.text(475,340,"yolooo!", {font: "24px arial", fill: "#fff"});
        }
    }

    if(flagmulti.x>740)flagmulti.right=false;

    if(flagmulti.x<60)flagmulti.right=true;


    if(checkIfCanJump(flagsingle)){
        flagsingle.reset(-100,-100);

    }

    if(collides2(player, flagsingle,12)){
        game.state.start('InGameSingle');

    }
    if(collides2(player, flagmulti,12)){
        game.state.start('InGameMulti');

    }

    timer++;
}

};
$.getScript("scripts/single.js");
$.getScript("scripts/multi.js");
game.state.add('InGame',Game.InGame);
game.state.start('InGame');
