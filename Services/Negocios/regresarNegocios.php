<?php
/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 29 de mayo de 2024 - 18 hrs
 Descripcion: Contiene el servicio para mostrar los negocios usando la funcion "regresaNegocios"
*/

include '../../conexion.php';
include '../../dao/daoNegocio.php';

define('estadoDefault', 'VIGENTES');

// Manejo de errores
ini_set('display_errors', 0);
error_reporting(E_ERROR | E_PARSE);

// Obtener el parámetro 'estado' desde la solicitud
$estado = isset($_GET['estado']) ? $_GET['estado'] : estadoDefault;
$daoNegocio = new daoNegocio();
$res = $daoNegocio->regresaNegocios($conexion, $estado);
$negocios = array();
// Verificar si hay resultados
if ($res && $res->num_rows > 0) {
    while ($fila = mysqli_fetch_assoc($res)) {
        $negocios[] = $fila;
    }
}
// Imprimir la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($negocios);

$conexion->close();
?>
