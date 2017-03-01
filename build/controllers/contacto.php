<?php

include("conexion.php");

$myData = json_decode($_POST['myData']);

$id = $myData->id;

$array = $pdo->query("SELECT * from contacto")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($array);


?>