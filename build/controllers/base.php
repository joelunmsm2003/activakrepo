<?php

include("conexion.php");

$myData = json_decode($_POST['myData']);

$base = $myData->base;

$result = "SELECT * FROM orig_base WHERE id_orig_base='$base'";

fwrite($fp,$result);

fclose($fp);

$array = $pdo->query($result)->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($array);

?>