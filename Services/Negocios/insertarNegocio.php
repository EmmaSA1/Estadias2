<?php
include '../../conexion.php';
include '../../dao/daoNegocio.php';
include '../../dto/dtoNegocio.php';
include '../../comun.php';

// Establecer cabeceras para la respuesta JSON
header('Content-Type: application/json');

// Recibir y decodificar la solicitud JSON
$data = json_decode(file_get_contents('php://input'), true);

// Validar datos recibidos
if (isset($data['NOMBRE'], $data['GIRO'], $data['DIRECCION'], $data['TELEFONO_OFICINA'], $data['TELEFONO_CELULAR'], $data['E_MAIL'], $data['LOGOTIPO'])) {
    $otroDTOnegocio = new dtoNegocio();
    //establecer los datos para el nuevo negocio
    $otroDTOnegocio->setNombre($data['NOMBRE']);
    $otroDTOnegocio->setGiro($data['GIRO']);
    $otroDTOnegocio->setDireccion($data['DIRECCION']);
    $otroDTOnegocio->setTelefono_oficina($data['TELEFONO_OFICINA']);
    $otroDTOnegocio->setTelefono_celular($data['TELEFONO_CELULAR']);
    $otroDTOnegocio->setE_mail($data['E_MAIL']);
    $otroDTOnegocio->setLogo($data['LOGOTIPO']);
    $daoNegocio = new daoNegocio();
    //llamar a la funcion insertarNegocio y pasarle los datos
    $result = $daoNegocio->insertarNegocio($otroDTOnegocio, $conexion);
    // Verificar el resultado y responder
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Negocio insertado correctamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al insertar el negocio.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos.']);
}

$conexion->close();
?>