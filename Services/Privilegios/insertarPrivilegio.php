<?php
include '../../conexion.php';
include '../../dao/daoPrivilegio.php';
include '../../dto/dtoPrivilegio.php';
include '../../comun.php';

// Establecer cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir y decodificar la solicitud JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos recibidos
if (isset($data['NOMBRE_PRIVILEGIO'])) {
    $datos = new dtoPrivilegio();
    //establecer los datos para el nuevo negocio
    $datos->setNombre_privilegio($data['NOMBRE_PRIVILEGIO']);
   
    $daoPrivilegio = new daoPrivilegio();
    //llamar a la funcion insertarNegocio y pasarle los datos
    $result = $daoPrivilegio->insertarCatalogoNuevo($datos, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Privilegio insertado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al insertar el negocio.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}

$conexion->close();
?>