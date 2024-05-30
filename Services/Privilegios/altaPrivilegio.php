<?php
include '../../conexion.php';
include '../../dao/daoPrivilegio.php';
include '../../dto/dtoPrivilegio.php';

// Obtener los datos del cuerpo de la solicitud
$data = file_get_contents("php://input");
$request = json_decode($data);

// Validar que se recibió el código de privilegio
if (isset($request->cod_privilegio)) {
    $privilegio = new dtoPrivilegio();
    // Establecer el código de privilegio
    $privilegio->setCod_privilegio($request->cod_privilegio);
    $daoPrivilegio = new daoPrivilegio();
    // Llamar al método activaPrivilegio y pasarle el objeto de privilegio
    $result = $daoPrivilegio->activaPrivilegio($privilegio, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Operación realizada correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en la operación.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Falta el parámetro "cod_privilegio" en la solicitud.']);
}

// Cerrar la conexión a la base de datos
$conexion->close();
?>
