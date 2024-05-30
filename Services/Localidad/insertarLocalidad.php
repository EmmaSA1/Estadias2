<?php
include '../../conexion.php';
include '../../dao/daoLocalidad.php';
include '../../dto/dtoLocalidad.php';
include '../../comun.php';

// Establecer cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir y decodificar la solicitud JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos recibidos
if (isset($data['COD_NEGOCIO'], $data['LOCALIDAD'], $data['ESTADOS'])) {
    $datos = new dtoLocalidad();
    // Establecer los datos para insertar la nueva localidad
    $datos->setCod_negocio($data['COD_NEGOCIO']);
    $datos->setLocalidad($data['LOCALIDAD']);
    $datos->setEstados($data['ESTADOS']);

    $daoLocalidad = new daoLocalidad();
    // Llamar a la función altaLocalidad y pasarle los datos
    $result = $daoLocalidad->altaLocalidad($datos, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Localidad agregada correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al agregar la localidad.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}

$conexion->close();
?>
