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
if (isset($data['COD_NEGOCIO'], $data['COD_LOCALIDAD'], $data['LOCALIDAD'], $data['ESTADOS'])) {
    $datos = new dtoLocalidad();
    // Establecer los datos para modificar la localidad existente
    $datos->setCod_negocio($data['COD_NEGOCIO']);
    $datos->setCod_localidad($data['COD_LOCALIDAD']);
    $datos->setLocalidad($data['LOCALIDAD']);
    $datos->setEstados($data['ESTADOS']);

    $daoLocalidad = new daoLocalidad();
    // Llamar a la función modificaLocalidad y pasarle los datos
    $result = $daoLocalidad->modificaLocalidad($datos, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Localidad modificada correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al modificar la localidad.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}

$conexion->close();
?>
