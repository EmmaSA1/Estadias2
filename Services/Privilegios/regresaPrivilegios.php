<?php
include '../../conexion.php';
include '../../dao/daoPrivilegio.php';

// Manejo de errores
ini_set('display_errors', 0);
error_reporting(E_ERROR | E_PARSE);

// Obtener los parámetros 'estado' y 'negocio' desde la solicitud
$estado = isset($_GET['estado']) ? $_GET['estado'] : 'VIGENTES';
$negocioPriv = '';

// Crear una instancia de la clase daoPrivilegio
$daoPrivilegio = new daoPrivilegio();

// Llamar al método regresaPrivilegios de la clase daoPrivilegio
$res = $daoPrivilegio->regresaPrivilegios($negocioPriv, $estado, $conexion);

// Crear un array para almacenar los privilegios
$privilegios = array();

// Verificar si hay resultados
if ($res && $res->num_rows > 0) {
    // Recorrer los resultados y agregarlos al array
    while ($fila = mysqli_fetch_assoc($res)) {
        $privilegios[] = $fila;
    }
}

// Imprimir la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($privilegios);

// Cerrar la conexión a la base de datos
$conexion->close();
?>
