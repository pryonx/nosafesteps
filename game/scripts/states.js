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
var lakitu2=""//variable del mov lakitu del player2;
var timer=0;//es un contador que se incrementa cada vegada que s'executa l'update es per limitar el moviment dels lakitus
//node
var posX=-1;//guarda la posicio X actual del player 1
var posY=-1;//guarda la posicio Y actual del player 1
var myID="";//guarda la teva id
var mateID="";//guarda la id introduida del company

        var socket = io.connect('http://sapatoasdf.zapto.org:3000');//variable del socket
        //si rep info amb el nom de news del server actualitza la teva id(nomes passa al carregar)
        socket.on('news', function (data) {
            console.log(data);
            myID= document.getElementById('myID').value=data.id;
        });
	//sendID();
	
//fi node
Game = {};
Game.InGame = function(game,level){

};//crida a ingame amb
//prototype de ingame
Game.InGame.prototype = {

preload : function() {
    //carregat de tots els fitxers necesaris
    game.load.tilemap('map', 'level/'+level+'.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles2', 'assets/tiles-1.png');
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
    textDeaths= game.add.text(16,16,"Deaths: "+deaths, {font: "24px arial", fill: "#fff"});
    textDeaths.fixedToCamera=true;
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
    flag = game.add.sprite(1200, 500, 'flag');

    game.physics.p2.enable(flag);

    flag.body.fixedRotation = true;

    //creem un player 2 tot i ke el fem invisible i el treiem fora de la pantalla
    player2 = game.add.sprite(-100, -100, 'dude2');
    /*player2.animations.add('left', [0, 1, 2, 3], 10, true);
    player2.animations.add('turn', [4], 20, true);
    player2.animations.add('right', [5, 6, 7, 8], 10, true);//no va els moviments player2
     */
    game.physics.p2.enable(player2);

    player2.body.fixedRotation = true;
    
    player2.visible=false;

    //cridem el fitxer corresponent

    //TRAPS TRAPS TRAPS TRAPS TRAPS TRAPS TRAPS 

    $.getScript("level/"+level+".js");

    //TRAPS TRAPS TRAPS TRAPS TRAPS TRAPS TRAPS

    //carreguem els inputs
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    keyboard = game.input.keyboard;


},

update : function() {
    //update es un bucle constant

    //actualitzem la posicio de player1
    posX = player.x;
    posY = player.y;

    //si hem entrat una id del company i el player es mou enviem la info al server
    if (mateID!=""&&((player.body.velocity.x>1||player.body.velocity.x<-1)||(player.body.velocity.y>1||player.body.velocity.y<-1))){
        //console.log("update");
        //enviem info al server
        //format json
        socket.emit("id", {
            myID: myID,
            mateID: mateID,
            posX: posX,
            posY: posY
        });
    }
    //si rebem indormacio amb el nom positionexecutem la funcio que nou el personatge 2 i crea el lakitu2 si no estava creat i si es necesari

    socket.on('position', function (data) {
        //console.log(data);
        var novax="";
        var novay="";
        if(lakitu2==""&&lakitu!="")createLakitu2(lakitu.owidth-50,lakitu.oheight);
        player2.visible=true;
        novax=data.position.split(",")[0];
        novay=data.position.split(",")[1];
        player2.reset(novax,novay);
    });

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
    //si player 1 o 2 toca la bandera carrega el stat ingame amb level++

    if ((collides2(player, flag,10)||collides(player2, flag,10))&&timer>100) {

        numlevel++;
        level = "level" + numlevel;
        if(lakitu!=""){
            lakitu.reset(-800,-800);
            lakitu.caca=false;
        }
        if(lakitu2!=""){
            lakitu2.reset(-800,-800);
            lakitu2.caca=false;
            //lakitu2="";
        }
        player.ready=false;
        player2.ready=false;
        //lakitu2.reset(-100,-100);
        //trap[];
        //spike=[];
        //barrel=[];

        var ii = 0;
        while (trapi > ii || spikei > ii || barreli > ii) {

            if (trap[ii])trap[ii].reset(-100, -100);
            if (barrel[ii])barrel[ii].reset(-100, -100);
            if (spike[ii])spike[ii].reset(-100, -100);
            ii++;
        }
        //alert(numlevel);

        game.state.start('InGame');
    }

    //acciona tots els spikesman que passin per sota el player i si estan tocant al player el "mata"
    var iii = 0;
    while (trapi > iii) {
        if (trapcollides(trap[iii], player)||trapcollides(trap[iii], player2))cauTrap(trap[iii]);
        /*if (checkIfCanJump(trap[iii])) {
            trap[iii].body.data.gravityScale = 0;
            trap[iii].reset(trap[iii].owidth, trap[iii].oheight);
        }*/
        if (checkIfCanJump(trap[iii])) {
            trap[iii].res=true;
        }
        if(trap[iii].res&&trap[iii].y>trap[iii].oheight){
            trap[iii].reset(trap[iii].x,trap[iii].y-2);
            trap[iii].body.data.gravityScale = 0;
        }else{
            trap[iii].res=false;
        }

        if (collides2(player, trap[iii],10)) {

            playerkill(player);
        }

        iii++;
    }

    //fa caure tots els barrils sobre el personatge i si toca el player en caure el mata (un cop a terra no maten) les puxes que cauen no es queden a terra
    var iii = 0;
    while (barreli > iii) {

        if (trapcollides(barrel[iii], player)||trapcollides(barrel[iii], player2))cauTrap(barrel[iii]);
        if (checkIfCanJump(barrel[iii])){
            barrel[iii].cankill = false;
            if(barrel[iii].spike)barrel[iii].reset(-100,-100);
        }

        if (collides2(player, barrel[iii],12) && barrel[iii].cankill) {
            //createBarrel(barrel[iii].owidth,barrel[iii].oheight,'barrel');
            playerkill(player);
        }

        iii++;
    }

    //si el player toca algun spike mort
    var iii = 0;
    while (spikei > iii) {
        if (collides(player, spike[iii])) {

            playerkill(player);
        }

        iii++;
    }

    //si existeixen mouen els lakitus en direccio al personatge que segueixen lakitu-> player lakitu2-> player2
    if(lakitu!=""){
        if((lakitu.x<player.x)){
            lakitu.reset(lakitu.x+4,lakitu.y);
        }
        else {
            lakitu.reset(lakitu.x-4,lakitu.y);
        }
    }

    if(lakitu2!=""){
        if((lakitu2.x<player2.x)){
            lakitu2.reset(lakitu2.x+4,lakitu2.y);
        }
        else {
            lakitu2.reset(lakitu2.x-4,lakitu2.y);
        }
    }

    timer++;

    //si ho te activat i el personatge al que segueix es a sota seu i dins el rang de temps li tira un projectil
    if(lakitu.caca&&(trapcollides(lakitu,player))&&(timer%30==0)){
        createBarrel(lakitu.x,lakitu.y+50,'tifa');
    }
    if(lakitu2.caca&&trapcollides(lakitu2,player2)&&timer%30==0){
        createBarrel(lakitu2.x,lakitu2.y+50,'tifa');
    }
}

};

game.state.add('InGame',Game.InGame);
game.state.start('InGame');
