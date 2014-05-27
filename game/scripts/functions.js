
function ajax(){

    var query=document.getElementById("ajaxName").value+","+numlevel+","+deaths;

    var xmlhttp;//creem consulta ajax
    if (window.XMLHttpRequest)
    {// IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    //alert(query);
    xmlhttp.open("GET","scripts/updateDB.php?query=" + query,false);//pasa per get la query
    xmlhttp.send();
    var resposta= xmlhttp.responseText.split(",");
    if(resposta=="fail")alert("Name already exist ...");
}

function actionOnClick () {

    background.visible =! background.visible;

}
function goMainMenu(){
    actualState="InGame";

    facing = 'left';
    jumpTimer = 0;//temps de espera entra salts
    numerosalts=0;//conta els salts per a fer doble salt
    doublejump=false;//triguer de cuan es pot fer el doble salt
    level= "level";//nivell inicial
    numlevel=0;//contador del lvl actual
    deaths=0;

    if(lakitu!=""){
        lakitu.reset(-800,-800);
        lakitu.caca=false;
    }
    if(lakitu2!=""){
        lakitu2.reset(-800,-800);
        lakitu2.caca=false;
        //lakitu2="";
    }
    var ii = 0;
    while (trapi > ii || spikei > ii || barreli > ii) {

        if (trap[ii])trap[ii].reset(-100, -100);
        if (barrel[ii])barrel[ii].reset(-100, -100);
        if (spike[ii])spike[ii].reset(-100, -100);
        ii++;
    }
    if(narcis!=""){
        narcis.reset(-800,-800);
        narcis.spawn=false;
        if(puntsExamen){
            punts=0;
            puntsExamen.setText("");
    }
    }
    game.state.start('InGame');
    game.paused=false;
	document.getElementById('overlay').style.display="none";
    document.getElementById('restart').style.display="none";
    document.getElementById('mainMenu').style.display="none";
    document.getElementById('ajax').style.display="none";
    document.getElementById('ajaxName').style.display="none";
    narcis.facing=true;
}

function restartLevel(){
    if(narcis!=""){
        if(puntsExamen){
            punts=0;
            puntsExamen.setText("");
        }
    }
    game.state.start(actualState);
    game.paused=false;
	document.getElementById('overlay').style.display="none";
    document.getElementById('restart').style.display="none";
    document.getElementById('mainMenu').style.display="none";
    document.getElementById('ajax').style.display="none";
    document.getElementById('ajaxName').style.display="none";

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


function createSpike(width,height,angle){

    spike[spikei] = game.add.sprite(width, height, 'spike');

    game.physics.p2.enable(spike[spikei]);

    spike[spikei].body.fixedRotation = true;
    spike[spikei].body.dynamic = false;
		if(angle == "right"){spike[spikei].angle = 90;}
		else if (angle == "left") {spike[spikei].angle = 270;}
		else if (angle == "up"){spike[spikei].angle = 0;}
		else if (angle == "down") {spike[spikei].angle = 180;}
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

function createNarcis(width,height){

    narcis = game.add.sprite(width, height, 'narcis');

    game.physics.p2.enable(narcis);

    narcis.body.data.gravityScale = 0;
    narcis.body.setZeroDamping();
    narcis.body.fixedRotation = false;
    narcis.owidth=width;
    narcis.oheight=height;
    narcis.spawn=true;
    narcis.summon=true;
}

function createSpawn(width,height,sprite){

    spawn[spawni] = game.add.sprite(width, height, sprite);

    game.physics.p2.enable(spawn[spawni]);

    spawn[spawni].body.data.gravityScale = 1;
    spawn[spawni].body.setZeroDamping();
    if(sprite=='pernil')spawn[spawni].body.fixedRotation = false;
    else {
        spawn[spawni].body.fixedRotation = true;
        spawn[spawni].spike=true;
        spawn[spawni].cankill=true;
    }
    spawn[spawni].spike=true;
    spawn[spawni].owidth=width;
    spawn[spawni].oheight=height;

    spawni++;
}

function playerkill(player){

    player.reset(player.owidth, player.oheight);
    deaths++;
    if(lakitu!="")lakitu.reset(lakitu.owidth,lakitu.oheight);
    textDeaths.setText("Deaths: "+deaths);
    //console.log(deaths);
}
function playerpunt(player,signe){


    if(signe)punts++;
    else {
        if(punts>0)punts--;
    }
    puntsExamen.setText("Exam mark: "+punts);
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
