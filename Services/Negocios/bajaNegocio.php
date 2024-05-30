<?php
include '../../conexion.php';
include '../../dao/daoNegocio.php';
include '../../dto/dtoNegocio.php';

// Obtener los datos del cuerpo de la solicitud
$data = file_get_contents("php://input");
$request = json_decode($data);
//validar que recibio el codigo de negocio
if (isset($request->cod_negocio)) {
    $negocio = new dtoNegocio();
    //establecer el codigo de negocio
    $negocio->setCod_negocio($request->cod_negocio);
    $daoNegocio = new daoNegocio();
    // Llamar al método bajaNegocio y pasarle el objeto de negocio
    $result = $daoNegocio->bajaNegocio($negocio, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Operación realizada correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en la operación.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Falta el parámetro "cod_negocio" en la solicitud.']);
}

$conexion->close();
?>
