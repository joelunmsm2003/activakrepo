<?php
include("conexion.php");

$myData = json_decode($_POST['myData']);

$base = json_encode($myData->base);

$agente = json_encode($myData->agente);

$nomagente = json_encode($myData->nomagente);

$query = "UPDATE orig_base SET id_ori_usuario = $agente,nombre_agente=$nomagente WHERE  id_orig_base = $base ";

$fp = fopen("/home/gestion.log","a");

fwrite($fp,$query);

fclose($fp);

$array = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($array);

?>