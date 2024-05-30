<?php
/*
Autor: Mariana Aldana Sánchez
Fecha: 04 de Agosto de 2020, 19:00 hrs
*/

class daoNegocio
{

    public function insertarNegocio($otroDTOnegocio, $x)
    { //INSERT
        //CAMBIE A SELECT
        $sql = "INSERT INTO PDV_C_NEGOCIO (COD_NEGOCIO, NOMBRE, GIRO, DIRECCION,TELEFONO_OFICINA, TELEFONO_CELULAR, E_MAIL,LOGOTIPO)
                SELECT COALESCE(MAX(COD_NEGOCIO)+1,1), 
                " . quotedStr($otroDTOnegocio->getNombre()) . ", 
                " . quotedStr($otroDTOnegocio->getGiro()) . ",
                " . quotedStr($otroDTOnegocio->getDireccion()) . ",
                " . quotedStr($otroDTOnegocio->getTelefono_oficina()) . ",
                " . quotedStr($otroDTOnegocio->getTelefono_celular()) . ",
                " . quotedStr($otroDTOnegocio->getE_mail()) . ",
                " . quotedStr($otroDTOnegocio->getLogo()) . "
                FROM PDV_C_NEGOCIO;";
        // no se considera el COD_NEGOCIO en clausula WHERE por que los negocios son independientes (es tabla padre) 
        mysqli_query($x, $sql); //RECURSO DE PRUEBACONSULTA.PHP
        // echo $sql;exit;
        return true;
    }


    public function regresaNegocios($conexion, $estatus)
    { //SELECT REGRESA TODOS LOS NEGOCIOS del sistema
        //$sql = "SELECT * FROM PDV_C_NEGOCIO WHERE FECHA_BAJA IS NULL;";
        // echo $estatus;
        // exit;
        $sql = "SELECT * FROM PDV_C_NEGOCIO
        WHERE FECHA_BAJA ";
        if ($estatus == 'VIGENTES') {
            $aux = "IS NULL";
        } else if ($estatus == 'NO VIGENTES') {
            $aux = "IS NOT NULL";
        }

        $sql = $sql . $aux . " ORDER BY COD_NEGOCIO ASC";


        // echo $sql;
        // exit;

        $res = mysqli_query($conexion, $sql);


        //echo $sql;exit;
        return $res;
    }

    public function regresaUnSoloNegocio($datos, $conexion)
    {
        $sql = "SELECT * FROM PDV_C_NEGOCIO WHERE COD_NEGOCIO = " . $datos->getCod_negocio() . ";";
        // echo $sql;
        // exit;
        $res = mysqli_query($conexion, $sql);

        return $res;
    }


    public function actualizarNegocio($actualizarNegocio, $conexion)
    { //UPDATE
        $sql = "UPDATE PDV_C_NEGOCIO SET NOMBRE= " . quotedStr($actualizarNegocio->getNombre()) . ","
            . "GIRO = " . quotedStr($actualizarNegocio->getGiro()) . ","
            . "DIRECCION =" . quotedStr($actualizarNegocio->getDireccion()) . ","
            . "TELEFONO_OFICINA =" . quotedStr($actualizarNegocio->getTelefono_oficina()) . ","
            . "TELEFONO_CELULAR =" . quotedStr($actualizarNegocio->getTelefono_celular()) . ","
            . "E_MAIL= " . quotedStr($actualizarNegocio->getE_mail()) . ","
            . "FECHA_BAJA = " . 'NULL' . ","
            . "LOGOTIPO = " . quotedStr($actualizarNegocio->getLogo())
            . " WHERE COD_NEGOCIO = " . $actualizarNegocio->getCod_negocio() . ";";
        mysqli_query($conexion, $sql);
        //echo $sql;exit;
        return true;
    }

    public function bajaNegocio($bajaNegocio, $conexion)
    { //DELETE
        $sql = "UPDATE PDV_C_NEGOCIO SET FECHA_BAJA = NOW() " .
            " WHERE COD_NEGOCIO = " . $bajaNegocio->getCod_negocio() . ";";
        mysqli_query($conexion, $sql); //RECURSO DE PRUEBACONSULTA.PHP
        // echo $sql;exit;

        return true;
    }


    //Alex Fredy Rivera Sandoval

    public function regresaUnNegocioPorNombre($conexion)
    {
        $sql = "SELECT COD_NEGOCIO FROM PDV_C_NEGOCIO WHERE NOMBRE = " . quotedStr($_SESSION['NOMBRE']) . " AND FECHA_BAJA IS NULL;";
        $res = mysqli_query($conexion, $sql);
        $ver = mysqli_fetch_array($res);
        // echo $sql;exit;
        return $ver;
    }

    //Francisco Javier Murillo Carrera 02/11/2021
    public function bajaDeNegocio($eliminaNegocio, $conexion)
    { //DELETE Negocio
        $sql = "DELETE FROM PDV_C_NEGOCIO WHERE COD_NEGOCIO = " . $eliminaNegocio->getCod_negocio() . ";";
        mysqli_query($conexion, $sql);
        //echo $sql;exit;
        return true;
    }

    public function regresaNegociosUsuario($regresaNegocio, $conexion)
    { //SELECT REGRESA LOS NEGOCIOS del usuario seleccionado
        $sql = "SELECT * FROM PDV_C_NEGOCIO AS N JOIN PDV_C_USUARIO_NEGOCIO AS U 
                ON (N.COD_NEGOCIO = U.COD_NEGOCIO)
                WHERE N.FECHA_BAJA IS NULL AND U.COD_USUARIO=" . $regresaNegocio->getCod_usuario() . ";";
        $res = mysqli_query($conexion, $sql);
        //echo $sql;exit;
        return $res;
    }

    // Dulce Yenny G.A 29/MAYO/2023

    public function activaNegocio($negocio, $conexion)
    {
        $sql = "UPDATE PDV_C_NEGOCIO SET FECHA_BAJA = NULL" .
            " WHERE COD_NEGOCIO = " . $negocio->getCod_negocio() . ";";
        mysqli_query($conexion, $sql);
        // echo $sql;exit;

        return true;
    }
}
