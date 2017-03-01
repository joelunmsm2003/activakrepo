<?php

include("conexion.php");

$myData = json_decode($_POST['myData']);

$contacto = $myData->contacto;

$array = $pdo->query("SELECT t.id,a.id,a.nombre FROM tipificacion as t, accion as a WHERE  contacto = '$contacto' and t.accion = a.id group by accion")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($array);


?>