    <?php
    include '../../conexion.php';
    include '../../dao/daoNegocio.php';

    // Manejo de errores
    ini_set('display_errors', 0);
    error_reporting(E_ERROR | E_PARSE);

    // Obtener el parámetro 'estado' desde la solicitud
    $estado = isset($_GET['estado']) ? $_GET['estado'] : 'VIGENTES';

    // Crear una instancia de la clase daoNegocio
    $daoNegocio = new daoNegocio();

    // Llamar al método regresaNegocios de la clase daoNegocio
    $res = $daoNegocio->regresaNegocios($conexion, $estado);

    // Crear un array para almacenar los negocios
    $negocios = array();

    // Verificar si hay resultados
    if ($res && $res->num_rows > 0) {
        // Recorrer los resultados y agregarlos al array
        while ($fila = mysqli_fetch_assoc($res)) {
            $negocios[] = $fila;
        }
    }

    // Imprimir la respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($negocios);

    // Cerrar la conexión a la base de datos
    $conexion->close();
    ?>

<?php
