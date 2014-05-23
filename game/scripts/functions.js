//node
function actionOnClick () {

    background.visible =! background.visible;

}

function sendID() {
            mateID = document.getElementById('mateID').value;
            if (mateID!=""){
                document.getElementById('mateID').disabled=true;
        }else alert("posa una id tita");
}

//game
function cauTrap(trap){


    trap.body.data.gravityScale = 1;
//console.log("cau barril");
}

function trapcollides (a, b)
{

    return !(
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
        );

}

function collides (a, b)
{

    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
        );

}

function collides2 (a, b,pre)
{

    return !(
        ((a.y + a.height+pre) < (b.y-pre)) ||
        (a.y-pre > (b.y + b.height+pre)) ||
        ((a.x + a.width+3) < b.x-3) ||
        (a.x-3 > (b.x + b.width+3))
        );

}


function createSpike(width,height){

    spike[spikei] = game.add.sprite(width, height, 'spike');

    game.physics.p2.enable(spike[spikei]);

    spike[spikei].body.fixedRotation = true;
    spike[spikei].owidth=width;
    spike[spikei].oheight=height;

    spikei++;
}



function createTrap(width,height){

    trap[trapi] = game.add.sprite(width, height, 'spikeman');

    game.physics.p2.enable(trap[trapi]);

    trap[trapi].body.data.gravityScale = 0;
    trap[trapi].body.setZeroDamping();
    trap[trapi].body.fixedRotation = true;
    trap[trapi].owidth=width;
    trap[trapi].oheight=height;

    trapi++;
}

function createLakitu(width,height){

    lakitu = game.add.sprite(width, height, 'lakitu');

    game.physics.p2.enable(lakitu);

    lakitu.body.data.gravityScale = 0;
    lakitu.body.setZeroDamping();
    lakitu.body.fixedRotation = true;
    lakitu.owidth=width;
    lakitu.oheight=height;
    lakitu.caca=true;
}
function createLakitu2(width,height){

    lakitu2 = game.add.sprite(width, height, 'lakitu2');

    game.physics.p2.enable(lakitu2);

    lakitu2.body.data.gravityScale = 0;
    lakitu2.body.setZeroDamping();
    lakitu2.body.fixedRotation = true;
    lakitu.owidth=width;
    lakitu.oheight=height;
    lakitu.caca=true;
}

function createBarrel(width,height,sprite){

    barrel[barreli] = game.add.sprite(width, height, sprite);

    game.physics.p2.enable(barrel[barreli]);

    barrel[barreli].body.data.gravityScale = 0;
    barrel[barreli].body.setZeroDamping();
    if(sprite=='barrel')barrel[barreli].body.fixedRotation = false;
    else {
        barrel[barreli].body.fixedRotation = true;
        barrel[barreli].spike=true;
    }
    barrel[barreli].owidth=width;
    barrel[barreli].oheight=height;
    barrel[barreli].cankill=true;
    barreli++;
}

function playerkill(player){

    player.reset(player.owidth, player.oheight);
    deaths++;
    if(lakitu!="")lakitu.reset(lakitu.owidth,lakitu.oheight);
    textDeaths.setText("Deaths: "+deaths);
    //console.log(deaths);
}

function checkIfCanJump(player) {

    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === player.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }

    return result;

}