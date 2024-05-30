<?php
/*
Autor: Mariana Aldana Sánchez
Fecha: 04 de Agosto de 2020, 19:00 hrs
*/

class daoGrupoUsuario
{
    public function insertarGrupoUsuario($otroDTOgrupoUsuario, $conexion)
    { //INSERT

        $sql = "INSERT INTO PDV_C_GRUPO_USUARIO(COD_GRUPO, NOMBRE_GRUPO, FECHA_BAJA, COD_NEGOCIO)
        SELECT COALESCE(MAX(COD_GRUPO)+1,1),
               " . quotedStr($otroDTOgrupoUsuario->getNombre_grupo()) . ",
               NULL," . $otroDTOgrupoUsuario->getCod_negocio() . " FROM PDV_C_GRUPO_USUARIO WHERE COD_NEGOCIO = " . $otroDTOgrupoUsuario->getCod_negocio();
        mysqli_query($conexion, $sql); //RECURSO DE PRUEBACONSULTA.PHP
        return true;
    }
    public function regresaGrupoUsuario($regresaGrupoUsuario, $conexion)
    { //SELECT REGRESA GRUPO USUARIO INDIVIDUAL

        // $sql = "SELECT COD_GRUPO, NOMBRE_GRUPO, FECHA_BAJA,COD_NEGOCIO FROM PDV_C_GRUPO_USUARIO"
        //     . " WHERE COD_NEGOCIO=" . $regresaGrupoUsuario->GetCod_negocio()
        //     . " AND COD_GRUPO=" . $regresaGrupoUsuario->GetCod_grupo();
        $sql = "SELECT COD_GRUPO, DESCRIPCION, FECHA_BAJA FROM C_GRUPO"
            . " WHERE COD_GRUPO=" . $regresaGrupoUsuario->GetCod_grupo();
        $res = mysqli_query($conexion, $sql);
        $ver = mysqli_fetch_array($res);
        return $ver;
    }

    public function regresaGruposUsuariosG($datoGrupoUsuario, $conexion)
    { //SELECT REGRESA GRUPOS USUARIOS GENERAL 
        // ECHO 'ENTRA A DAO'; EXIT;
        // $sql = "SELECT COD_GRUPO, NOMBRE_GRUPO, FECHA_BAJA, COD_NEGOCIO FROM PDV_C_GRUPO_USUARIO WHERE COD_NEGOCIO =" . $datoGrupoUsuario->getCod_negocio() . "  AND FECHA_BAJA IS NULL";
        $sql = "SELECT COD_GRUPO, DESCRIPCION, FECHA_BAJA FROM C_GRUPO WHERE  FECHA_BAJA IS NULL";
        // echo $sql;
        // exit;
        $res = mysqli_query($conexion, $sql); //RECURSO DE PRUEBACONSULTA.PHP
        return $res;
    }

    public function regresaInfoGrupoUsuario($regresainfoGrupoUsuario, $conexion)
    {
        $sql = "SELECT COD_GRUPO, DESCRIPCION, FECHA_BAJA FROM C_GRUPO"
            . " WHERE  FECHA_BAJA IS NULL";
        // echo $sql;
        // exit;
        $res = mysqli_query($conexion, $sql);
        return $res;
    }

    public function actualizarGrupoUsuario($actualizarGrupoUsuario, $conexion)
    { //UPDATE

        $sql = "UPDATE C_GRUPO SET DESCRIPCION=" . quotedStr($actualizarGrupoUsuario->getNombre_grupo())
            . " WHERE COD_GRUPO=" . $actualizarGrupoUsuario->GetCod_grupo();
        // echo $sql; exit;
        mysqli_query($conexion, $sql);
        return true;
    }

    public function bajaGrupoUsuario($bajaGrupoUsuario, $conexion)
    { //DELETE

        $sql = "UPDATE C_GRUPO SET FECHA_BAJA = NOW() WHERE COD_GRUPO= " . $bajaGrupoUsuario->getCod_grupo();
        //echo $sql;
        //exit;
        mysqli_query($conexion, $sql); //RECURSO DE PRUEBACONSULTA.PHP
        return true;
    }
    //D.Y.G.A
    public function insertaNuevoCatalogo($datos, $conexion)
    {
        $sql = "INSERT INTO C_GRUPO(COD_GRUPO,DESCRIPCION)
    SELECT COALESCE(MAX(COD_GRUPO)+1,1)," . quotedStr($datos->getNombre_grupo()) . "
        FROM C_GRUPO ;";
        mysqli_query($conexion, $sql);
        return true;
    }
    public function regresainfo($dato, $conexion)
    {
        $sql = "SELECT * FROM PDV_C_GRUPO_USUARIO";
    }
}
