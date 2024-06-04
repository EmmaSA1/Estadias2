<?php
/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 29 de mayo de 2024 - 18 hrs
 Descripcion: Contiene el servicio para editar un negocio usando la funcion "actualizarNegocio"
*/

include '../../conexion.php';
include '../../dao/daoNegocio.php';
include '../../dto/dtoNegocio.php';
include '../../comun.php';

// Establecer cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir y decodificar la solicitud JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos recibidos
if (isset($data['COD_NEGOCIO'], $data['NOMBRE'], $data['GIRO'], $data['DIRECCION'], $data['TELEFONO_OFICINA'], $data['TELEFONO_CELULAR'], $data['E_MAIL'], $data['LOGOTIPO'])) {
    $actualizarNegocio = new dtoNegocio();
    // Establecer los datos para el negocio a actualizar
    $actualizarNegocio->setCod_negocio($data['COD_NEGOCIO']);
    $actualizarNegocio->setNombre($data['NOMBRE']);
    $actualizarNegocio->setGiro($data['GIRO']);
    $actualizarNegocio->setDireccion($data['DIRECCION']);
    $actualizarNegocio->setTelefono_oficina($data['TELEFONO_OFICINA']);
    $actualizarNegocio->setTelefono_celular($data['TELEFONO_CELULAR']);
    $actualizarNegocio->setE_mail($data['E_MAIL']);
    $actualizarNegocio->setLogo($data['LOGOTIPO']);
    $daoNegocio = new daoNegocio();
    // llamar la funcion actualizarNegocio
    $result = $daoNegocio->actualizarNegocio($actualizarNegocio, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Negocio actualizado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar el negocio.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}

$conexion->close();
?>
