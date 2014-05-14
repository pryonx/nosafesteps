var game = new Phaser.Game(1280,720,Phaser.AUTO, '',{preload: preload, create: create, update: update});

function preload(){
    //CARREGAR AQUI ELS GRAFICS
}

function create(){
    game.physics.startSystem(Phaser.Physics.P2JS);
}

function update(){

}