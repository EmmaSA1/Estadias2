<?php
/*
EMMANUEL SANTOS APAEZ 
29 DE ABRIL DEL 2024

*/
?>


<?php
include '../../conexion.php';
include '../../dao/daoLocalidad.php';

// Manejo de errores
ini_set('display_errors', 0);
error_reporting(E_ERROR | E_PARSE);

// Obtener el parámetro 'cod_negocio' desde la solicitud
$cod_negocio = isset($_GET['cod_negocio']) ? $_GET['cod_negocio'] : die('Código de negocio no proporcionado.');

// Crear un objeto de la clase Negocio
class Negocio {
    private $cod_negocio;

    public function __construct($cod_negocio) {
        $this->cod_negocio = $cod_negocio;
    }

    public function getCod_negocio() {
        return $this->cod_negocio;
    }
}

$datos = new Negocio($cod_negocio);

// Crear una instancia de la clase daoLocalidad
$daoLocalidad = new daoLocalidad();

$estado = isset($_GET['estado']) ? $_GET['estado'] : 'VIGENTES';

// Llamar al método para regresar todas las localidades de un negocio específico
$res = $daoLocalidad->regresaTodasLocalidades($datos, $estado, $conexion);

// Verificar si se obtuvieron resultados y dar una respuesta adecuada
if ($res) {
    // Crear un array para almacenar las localidades
    $localidades = array();

    // Verificar si hay resultados
    if ($res->num_rows > 0) {
        // Recorrer los resultados y agregarlos al array
        while ($fila = mysqli_fetch_assoc($res)) {
            $localidades[] = $fila;
        }
    }

    // Imprimir la respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($localidades);
} else {
    // Si no se obtuvieron resultados, enviar un mensaje de error
    http_response_code(404);
    echo json_encode(array("message" => "No se encontraron localidades para el negocio especificado."));
}

// Cerrar la conexión a la base de datos
$conexion->close();
?>