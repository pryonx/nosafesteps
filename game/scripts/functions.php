<?php

function connection(){
    $username="root";
    $password="ddjd12cr";
    $database="nosafesteps";
    
    $connection = @mysqli_connect("localhost", $username, $password, $database) or die ("No es pot conectar a la Base de Dades");

    if (mysqli_connect_errno()) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }
    
    return $connection;
}

function sql($query)
{
    //entrar una query en sql aquesta funció fa la comanda sql. En cas de ser una select ten retorna el resultat en una array de arrays
   
    
    //estableix conexio a la BD seleccionada
    $connection = connection();
    
    $queryresult = mysqli_query($connection, $query);
    
    if($queryresult != FALSE)
    {
		$i=0;
		while($ret = mysqli_fetch_array($queryresult, MYSQLI_BOTH)){
			$return[$i]=$ret;
			$i++;
		}
		
        return $return;
    }
}


?>
