<?php
/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 29 de mayo de 2024 - 18 hrs
 Descripcion: Contiene el servicio para la alta de un negocio usando la funcion "activaNegocio"
*/

include '../../conexion.php';
include '../../dao/daoNegocio.php';
include '../../dto/dtoNegocio.php';

// Obtener los datos del cuerpo de la solicitud
$data = file_get_contents("php://input");
$request = json_decode($data);
//validar que recibio el codigo de negocio
if (isset($request->cod_negocio)) {
    $negocio = new dtoNegocio();
    // Establecer el código de negocio
    $negocio->setCod_negocio($request->cod_negocio);
    $daoNegocio = new daoNegocio();
    // Llamar al método activaNegocio y pasarle el objeto de negocio
    $result = $daoNegocio->activaNegocio($negocio, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Operación realizada correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en la operación.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Falta el parámetro "cod_negocio" en la solicitud.']);
}

// Cerrar la conexión a la base de datos
$conexion->close();
?>
