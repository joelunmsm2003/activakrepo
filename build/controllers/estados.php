<?php

include("conexion.php");


$myData = json_decode($_POST['myData']);

$accion = $myData->accion;


$array = $pdo->query("SELECT e.id,e.nombre FROM tipificacion AS t, estado AS e WHERE accion ='$accion' AND t.estado = e.id GROUP BY e.nombre")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($array);


?>