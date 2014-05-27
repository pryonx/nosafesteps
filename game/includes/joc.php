<div id="gamecontainer">
		<script src="scripts/socket.io.js"></script>
		<script type="application/javascript" src="lib/phaser.min.js"></script>
		<script type="application/javascript" src="scripts/functions.js"></script>
		<script type="application/javascript" src="lib/jquery-2.1.1.min.js"></script>
		<script type="application/javascript" src="scripts/states.js"></script>

	Your ID:<input id="myID" style="width:28%;margin-right:10px;" disabled/>Your mate's ID:<input id="mateID" style="width:28%;margin-right:10px;" /><button onclick="sendID();">Send ID</button>
	<div id="game">
        
		<button id="mainMenu" style="display:none;top:30%;left:13%;z-index:2;" onclick="goMainMenu();">Main Menu</button>
		<button id="restart" style="display:none;top:30%;left:38%;z-index:2;" onclick="restartLevel();">Restart</button>
		<button id="ajax" style="display:none;top:40%;left:13%;z-index:2;" onclick="ajax();">Send Rating</button>
		<input id="ajaxName" style="display:none;top:310px;left:38%;z-index:2;" />
	</div>
	<div id="overlay" style="display:none;"></div>
	<script>
 setTimeout(function(){
 
 var asa=document.getElementById("game");
 var canvasDelJoc=asa.children[4];
 	canvasDelJoc.style.width="71%";
 }, 10);
</script>
</div>