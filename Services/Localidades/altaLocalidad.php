<?php
/*
EMMANUEL SANTOS APAEZ 
29 DE ABRIL DEL 2024

*/
?>
<?php
include '../../conexion.php';
include '../../dao/daoLocalidad.php';
include '../../dto/dtoLocalidad.php';

// Obtener los datos del cuerpo de la solicitud
$data = file_get_contents("php://input");
$request = json_decode($data);

// Validar que se recibieron los datos necesarios
if (isset($request->cod_negocio, $request->cod_localidad)) {
    $localidad = new dtoLocalidad();
    // Establecer los datos de la localidad
    $localidad->setCod_negocio($request->cod_negocio);
    $localidad->setCod_localidad($request->cod_localidad);
    
    // Llamar al método activaLocalidad del DAO de Localidad
    $daoLocalidad = new daoLocalidad();
    $result = $daoLocalidad->activaLocalidad($localidad, $conexion); // Pasar la conexión a la función
    
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Localidad activada correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al activar la localidad.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Faltan datos requeridos en la solicitud.']);
}

// Cerrar la conexión a la base de datos
$conexion->close();
?>
