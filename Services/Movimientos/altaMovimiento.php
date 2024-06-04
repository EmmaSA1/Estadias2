<?php
/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 29 de mayo de 2024 - 18 hrs
 Descripcion: Contiene el servicio para la alta de un movimiento usando la funcion "activaMovimiento"
*/

include '../../conexion.php';
include '../../dao/daoMovimiento.php';
include '../../dto/dtoMovimiento.php';
include '../../comun.php';

// Establecer cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir y decodificar la solicitud JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos recibidos
if (isset($data['COD_MOVIMIENTO'], $data['COD_NEGOCIO'])) {
    $datosMovimiento = new dtoMovimiento();
    // Establecer los datos para el movimiento a dar de alta
    $datosMovimiento->setCod_movimiento($data['COD_MOVIMIENTO']);
    $datosMovimiento->setCod_negocio($data['COD_NEGOCIO']);
    $daoMovimiento = new daoMovimiento();
    // Llamar la función altaMovimiento
    $result = $daoMovimiento->activaMovimiento($datosMovimiento, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Movimiento dado de baja correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al dar de baja el movimiento.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}

$conexion->close();
?>
