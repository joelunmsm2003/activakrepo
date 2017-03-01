<?php

include("conexion.php");

$myData = json_decode($_POST['myData']);

$fagenda = json_encode($myData->fagenda);

$base = json_encode($myData->base);

$query = "UPDATE orig_base SET fagenda = $fagenda WHERE  id_orig_base = $base ";

fwrite($fp,$query);

fclose($fp);

$array = $pdo->query($query)->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($array);

?>