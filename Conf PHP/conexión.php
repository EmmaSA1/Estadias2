<?php

class Cconexion {

    function ConexionPHP(){
        $host = 'localhost';
        $dbname= 'bettocom_PVD_hlkjh4E_65ssg234';
        $username = 'root';
        $pasword= 'root';
    
        try{
            $conn= new PDO ("mysql:host =$host; dbname = $dbname", $username, $pasword );
            echo "Se conecto correctamente a la base de datos ";
    
        }catch (PDOExveption $exp){
            echo ("No se lotro conectar a la base de datos: $dbname, error: $exp "); $pasword
        }
        return $conn
    }
   
}

?>