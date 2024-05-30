<?php
// archivo de conexion.php

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "root";
$database = "bettocom_PVD_hlkjh4E_65ssg234";

// Crear conexión
$conexion = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Establecer el juego de caracteres a UTF-8
$conexion->set_charset("utf8");

?>