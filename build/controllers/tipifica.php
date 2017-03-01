<?php

include("conexion.php");

$myData = json_decode($_POST['myData']);

$base= $myData->base;

$tipifica = $myData->tipifica;

$fp = fopen("/home/gestion.log","a");

fwrite($fp,json_encode($tipifica->contacto));

fwrite($fp,json_encode($base));



if($tipifica->contacto){

	$query = "UPDATE orig_base SET contacto = '$tipifica->contacto' WHERE  id_orig_base = $base ";

}

if($tipifica->accion){

	$query = "UPDATE orig_base SET accion = '$tipifica->accion' WHERE  id_orig_base = $base ";

}


if($tipifica->estado){

	$query = "UPDATE orig_base SET estado = '$tipifica->estado' WHERE  id_orig_base = $base ";

}

	$array = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);

// $array = $pdo->query("SELECT * from contacto")->fetchAll(PDO::FETCH_ASSOC);

// echo json_encode($array);

fclose($fp);
?>