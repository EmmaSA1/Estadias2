<?php
/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 29 de mayo de 2024 - 18 hrs
 Descripcion: Contiene el servicio para insertar un movimiento usando la funcion "insertarMovimiento"
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
if (isset($data['DESCRIPCION'], $data['SIGNO'], $data['COD_NEGOCIO'])) {
    $otroDTOMovimiento = new dtoMovimiento;
    // Establecer los datos para el nuevo movimiento
    $otroDTOMovimiento->setDescripcion($data['DESCRIPCION']);
    $otroDTOMovimiento->setSigno($data['SIGNO']);
    $otroDTOMovimiento->setCod_negocio($data['COD_NEGOCIO']);
    $daoMovimiento = new daoMovimiento();
    // Llamar a la función insertarMovimiento y pasarle los datos
    $result = $daoMovimiento->insertarMovimiento($otroDTOMovimiento, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Movimiento insertado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al insertar el movimiento.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}

$conexion->close();
?>
