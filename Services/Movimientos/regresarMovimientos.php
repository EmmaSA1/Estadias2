<?php
/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 29 de mayo de 2024 - 18 hrs
 Descripcion: Contiene el servicio para mostrar los movimiento usando la funcion "regresaMovimientos"
*/

include '../../conexion.php';
include '../../dao/daoMovimiento.php';
include '../../dto/dtoMovimiento.php';
include '../../comun.php';

define('estadoDefault', 'VIGENTES');

// Manejo de errores
ini_set('display_errors', 0);
error_reporting(E_ERROR | E_PARSE);

// Establecer cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Obtener los parámetros de la URL
$codNegocio = isset($_GET['COD_NEGOCIO']) ? $_GET['COD_NEGOCIO'] : null;
$estatus = isset($_GET['estatus']) ? $_GET['estatus'] : estadoDefault;

// Validar datos recibidos
if ($codNegocio && $estatus) {
    $rm = new dtoMovimiento();
    // Establecer los datos para el negocio a consultar
    $rm->setCod_negocio($codNegocio);

    $daoMovimiento = new daoMovimiento();
    // Llamar la función regresaMovimientos
    $result = $daoMovimiento->regresaMovimientos($rm, $estatus, $conexion);
    
    // Verificar el resultado y responder
    if ($result) {
        $movimientos = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $movimientos[] = $row;
        }
        echo json_encode(['success' => true, 'movimientos' => $movimientos]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al obtener los movimientos.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}

$conexion->close();
?>
