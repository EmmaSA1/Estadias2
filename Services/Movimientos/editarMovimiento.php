<?php
/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 29 de mayo de 2024 - 18 hrs
 Descripcion: Contiene el servicio para editar un movimiento usando la funcion "actualizarMovimiento"
*/

include '../../conexion.php';
include '../../dao/daoMovimiento.php';
include '../../dto/dtoMovimiento.php';
include '../../comun.php';

// Establecer cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir y decodificar la solicitud JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validar los datos recibidos
if (isset($data['COD_MOVIMIENTO'], $data['DESCRIPCION'], $data['SIGNO'], $data['COD_NEGOCIO'])) {
    $actualizarMovimiento = new dtoMovimiento;
    // Establecer los datos para actualizar el movimiento
    $actualizarMovimiento->setCod_movimiento($data['COD_MOVIMIENTO']);
    $actualizarMovimiento->setDescripcion($data['DESCRIPCION']);
    $actualizarMovimiento->setSigno($data['SIGNO']);
    $actualizarMovimiento->setCod_negocio($data['COD_NEGOCIO']);
    
    $daoMovimiento = new daoMovimiento();
    // Llamar a la función actualizarMovimiento y pasarle los datos
    $result = $daoMovimiento->actualizarMovimiento($actualizarMovimiento, $conexion);
    
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Movimiento actualizado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el movimiento.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}

$conexion->close();
?>
