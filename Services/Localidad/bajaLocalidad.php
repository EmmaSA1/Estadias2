<?php
include '../../conexion.php';
include '../../dao/daoLocalidad.php';
include '../../dto/dtoLocalidad.php';

// Obtener los datos del cuerpo de la solicitud
$data = file_get_contents("php://input");
$request = json_decode($data);

if (isset($request->cod_negocio) && isset($request->cod_localidad)) {
    $localidad = new dtoLocalidad();
    $localidad->setCod_negocio($request->cod_negocio);
    $localidad->setCod_localidad($request->cod_localidad);

    $daoLocalidad = new daoLocalidad();
    $result = $daoLocalidad->bajaLocalidad($localidad, $conexion);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Localidad dada de baja correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al dar de baja la localidad.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan parámetros en la solicitud.']);
}

$conexion->close();
?>
