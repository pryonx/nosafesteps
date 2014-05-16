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

function collides2 (a, b)
{

    return !(
        ((a.y + a.height+5) < (b.y-5)) ||
        (a.y-5 > (b.y + b.height+5)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
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
    trap[trapi].timer=0;

    trapi++;
}


function createBarrel(width,height){

    barrel[barreli] = game.add.sprite(width, height, 'barrel');

    game.physics.p2.enable(barrel[barreli]);

    barrel[barreli].body.data.gravityScale = 0;
    barrel[barreli].body.setZeroDamping();
    barrel[barreli].body.fixedRotation = false;
    barrel[barreli].owidth=width;
    barrel[barreli].oheight=height;
    barrel[barreli].cankill=true;
    barreli++;
}

function playerkill(player){

    player.reset(player.owidth, player.oheight);
    deaths++;
    scoreText.setText("Deaths: "+deaths);
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