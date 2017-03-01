<?php
include("conexion.php");

$myData = json_decode($_POST['myData']);

$observacion = json_encode($myData->observacion);

$base = json_encode($myData->base);

$query = "UPDATE orig_base SET observacion = $observacion WHERE  id_orig_base = $base ";

$fp = fopen("/home/gestion.log","a");

fwrite($fp,$query);

fclose($fp);

$array = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($array);

?>