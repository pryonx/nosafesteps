<?php
function conexio()
{
    //estableix conexio a la BD seleccionada

    $con = mysqli_connect("localhost","root2","a","nosafesteps") or die ("No es pot conectar a la Base de Dades");

    //mysql_select_db("nosafesteps",$con) or die (mysql_error());
}

function sql($query)
{
    //entrar una query en sql aquesta funció fa la comanda sql. En cas de ser una select ten retorna el resultat en una array de arrays
    conexio();
    $result=mysqli_query($con , $query); //print_r($result);
    if($result!=FALSE)
    {
    $i=0;
    while($ret = mysqli_fetch_array($result, MYSQLI_NUM))
    {
        $return[$i]=$ret;
        $i++;
    }
    mysqli_close($link);
    return $return;
    }
    else{return "";}
}
?>
