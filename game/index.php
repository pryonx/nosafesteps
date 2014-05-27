<html>
	<div id="contenidor">
		<?php include 'includes/header.php' ?>
		<!-- CONTENT -->
		<div id="content"><?php 
 
 
 if(isset($_GET["p"]))
 {
 if($_GET["p"]=="ranking"){
 include 'includes/ranking.php';
 }elseif($_GET["p"]=="joc"){
 include 'includes/joc.php';
 }else include 'includes/blog.php';
 
 }else include 'includes/blog.php';
 
 
 ?></div>
		<div id="rightcol"><?php include 'includes/rightcol.php' ?></div>
		<!-- /CONTENT -->
		</body>
	</div>
</html>