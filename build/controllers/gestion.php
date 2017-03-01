<?php


include("conexion.php");

$myData = json_decode($_POST['myData']);

$dni = $myData->dni;

$result = "SELECT * FROM orig_base_C01 WHERE DNI='$dni'";

$array = $pdo->query($result)->fetchAll(PDO::FETCH_ASSOC);

$fp = fopen("/home/gestion.log","a");

fwrite($fp,$result);

fclose($fp);

echo json_encode($array);
			
?>