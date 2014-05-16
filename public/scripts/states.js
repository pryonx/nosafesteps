var game = new Phaser.Game(800,600,Phaser.AUTO,'container');

var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var numerosalts=0;
var doublejump=false;
var map;
var layer;
var level= "level";
var numlevel=0;
var deaths=0;
var scoreText;
var spike=[];
var spikei=0;
var trap=[];
var trapi=0;
var barrel=[];
var barreli=0;

Game = {};
Game.InGame = function(game,level){
};
Game.InGame.prototype = {

preload : function() {

    game.load.tilemap('map', 'level/'+level+'.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles2', 'img/tiles-1.png');
    game.load.spritesheet('dude', 'img/dude.png.1', 32, 48);
    game.load.image('flag', 'img/flag-5.png', 32, 32);
    game.load.image('barrel', 'img/barrel.png', 32, 32);
    game.load.image('spike', 'img/spike.png', 32, 32);
    game.load.image('spikeman', 'img/spikeman.png', 32, 32);
},
    
create : function() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.stage.backgroundColor = '#2d2d2d';

    map = game.add.tilemap('map');

    map.addTilesetImage('tiles2');

    layer = map.createLayer('Capa de Patrones 1');

    layer.resizeWorld();

    map.setCollisionBetween(1, 12);

    game.physics.p2.convertTilemap(map, layer);

    game.physics.p2.restitution = 0.2;
    game.physics.p2.gravity.y = 2300;

    scoreText= game.add.text(16,16,"Deaths: "+deaths, {font: "24px arial", fill: "#fff"});
    scoreText.fixedToCamera=true;
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

    flag = game.add.sprite(1200, 500, 'flag');

    game.physics.p2.enable(flag);

    flag.body.fixedRotation = true;


    //TRAPS TRAPS TRAPS TRAPS TRAPS TRAPS TRAPS 

    $.getScript("level/"+level+".js");

    //TRAPS TRAPS TRAPS TRAPS TRAPS TRAPS TRAPS

    
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    keyboard = game.input.keyboard;
},

update : function() {

    if (cursors.left.isDown && keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        player.body.moveLeft(350);

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }else if (cursors.right.isDown  && keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        player.body.moveRight(350);

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }    
    else if (cursors.left.isDown)
    {
        player.body.moveLeft(200);

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.moveRight(200);

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        player.body.velocity.x = 0;

        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 5;
            }

            facing = 'idle';
        }
    }
    if(jumpButton.isUp&&numerosalts==0){numerosalts=1;}
    
    if (jumpButton.isDown && game.time.now > jumpTimer && checkIfCanJump(player))
    {
        player.body.moveUp(650);
        jumpTimer = game.time.now + 750;
        numerosalts=0;
    }else if (jumpButton.isDown  && numerosalts==1)
    {
        player.body.moveUp(650);
        jumpTimer = game.time.now + 750;
        doublejump=false;
        numerosalts=-1;
    }
    
    if (keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        player.body.moveUp(650);
        jumpTimer = game.time.now + 750;
        doublejump=false;
        numerosalts=-1;
    }


    if(collides(player,flag)){
    	
    	numlevel++;
    	level="level"+numlevel;
        //trap[];
        //spike=[];
        //barrel=[];

        var ii=0;
        while(trapi>ii||spikei>ii||barreli>ii) {

            if(trap[ii])trap[ii].reset(-100,-100);
            if(barrel[ii])barrel[ii].reset(-100,-100);
            if(spike[ii])spike[ii].reset(-100,-100);
            ii++;
        }
        //alert(numlevel);

    	game.state.start('InGame');
    }
    var iii=0;
    while(trapi>iii){
            if(trapcollides(trap[iii],player))cauTrap(trap[iii]);
            if(checkIfCanJump(trap[iii])) {
                trap[iii].body.data.gravityScale = 0;
                trap[iii].reset(trap[iii].owidth, trap[iii].oheight);
            }


        if(collides2(player,trap[iii])){

            playerkill(player);
        }

        iii++;
    }

    var iii=0;
    while(barreli>iii){
        if(trapcollides(barrel[iii],player))cauTrap(barrel[iii]);
        if(checkIfCanJump(barrel[iii]))barrel[iii].cankill=false;
        if(collides2(player,barrel[iii])&&barrel[iii].cankill){

            playerkill(player);
        }

        iii++;
    }

    var iii=0;
    while(spikei>iii){
        if(collides2(player,spike[iii])){

            playerkill(player);
        }

        iii++;
    }

    var socket = io.connect('http://localhost:3000');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
    
}

};

game.state.add('InGame',Game.InGame);
game.state.start('InGame');