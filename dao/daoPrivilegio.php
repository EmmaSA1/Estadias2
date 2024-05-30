<?php

/*
Autor: Mariana Aldana Sánchez
Fecha: 04 de Agosto de 2020, 19:00 hrs
*/


class daoPrivilegio
{

  public function insertarPrivilegio($otroDTOprivilegio, $conexion)
  { //INSERT
    $sql = "INSERT INTO PDV_C_PRIVILEGIO(COD_PRIVILEGIO, NOMBRE_PRIVILEGIO, COD_NEGOCIO)
              SELECT COALESCE(MAX(COD_PRIVILEGIO)+1,1),
                " . quotedStr($otroDTOprivilegio->getNombre_privilegio()) . ",
                " . $otroDTOprivilegio->getCod_negocio() .
      " FROM PDV_C_PRIVILEGIO WHERE COD_NEGOCIO =" . $otroDTOprivilegio->getCod_negocio();
    //echo $sql;exit;
    mysqli_query($conexion, $sql); //RECURSO DE PRUEBACONSULTA.PHP
    return true;
  }


  public function regresaPrivilegios($negocioPriv, $estatus, $conexion)
  { //SELECT REGRESA PIVILEGIO GENERAL

    $sql = "SELECT * FROM C_PRIVILEGIO  WHERE 
       FECHA_BAJA ";
    if ($estatus == 'VIGENTES') {
      $aux = " IS NULL";
    } else if ($estatus == 'NO VIGENTES') {
      $aux = "IS NOT NULL";
    }
    $sql = $sql . $aux . " ORDER BY COD_PRIVILEGIO ASC";
    $res = mysqli_query($conexion, $sql); //RECURSO DE PRUEBACONSULTA.PHP
    return $res;  
  }

  public function regresaPrivilegio($regresaPrivilegio, $conexion)
  { //SELECT REGRESA PRIVILEGIO INDIVIDUAL
    $sql = "SELECT COD_PRIVILEGIO, DESCRIPCION_PRIVILEGIO, FECHA_BAJA FROM C_PRIVILEGIO WHERE COD_PRIVILEGIO=" .
      $regresaPrivilegio->GetCod_privilegio() . ";";
    // echo $sql;
    //exit;
    $res = mysqli_query($conexion, $sql);
    $ver = mysqli_fetch_array($res);
    return $ver;
  }

  
  public function regresaPrivilegioII($regresaPrivilegioII, $conexion)
  { //SELECT REGRESA PRIVILEGIO INDIVIDUAL

    $sql = "SELECT COD_PRIVILEGIO, DESCRIPCION_PRIVILEGIO  FROM C_PRIVILEGIO WHERE COD_PRIVILEGIO=" .
      $regresaPrivilegioII->getCod_privilegio() . ";";
    //  echo $sql;exit;
    $res = mysqli_query($conexion, $sql);
    $ver = mysqli_fetch_array($res);
    return $ver;
  }



  public function bajaPrivilegio($bajaPrivilegio, $conexion)
  { //DELETE
    $sql = "UPDATE C_PRIVILEGIO SET FECHA_BAJA = NOW() WHERE 
      COD_PRIVILEGIO=" . $bajaPrivilegio->getCod_privilegio();
    // echo $sql; exit;
    mysqli_query($conexion, $sql); //RECURSO DE PRUEBACONSULTA.PHP
    return true;
  }

  // GONZALEZ AGUILAR DULCE YENNY 20/JUNIO/2023

  public function activaPrivilegio($cod, $conexion)
  {
    $sql = "UPDATE C_PRIVILEGIO SET FECHA_BAJA = NULL" .
      " WHERE COD_PRIVILEGIO = " . $cod->getCod_privilegio() . ";";
    mysqli_query($conexion, $sql);
    // echo $sql;exit;

    return true;
  }



  public function modificaPrivilegio($dtoPrivilegio, $conexion)
  {
    $sql = "UPDATE C_PRIVILEGIO 
    SET DESCRIPCION_PRIVILEGIO = " . quotedStr($dtoPrivilegio->getNombre_privilegio()) . "
       WHERE COD_PRIVILEGIO = " . $dtoPrivilegio->getCod_privilegio() . ";";
           //echo $sql;exit;
    mysqli_query($conexion, $sql);


    return true;
  }



  /*Autor: Gilberto Almanza Maldonado, 05 de Septiembre de 2020, 11:37 hrs*/
  public function tienePrivilegio($dto, $conexion)
  {


    // $sql = "SELECT * FROM C_GRUPO_PRIVILEGIO WHERE COD_PRIVILEGIO=" . $dto->getCod_privilegio() . " AND COD_GRUPO = " . $dto->getCod_grupo();
    $sql = "SELECT * FROM C_GRUPO_PRIVILEGIO WHERE COD_PRIVILEGIO=" . $dto->getCod_privilegio() . " AND COD_GRUPO = " . $dto->getCod_grupo();
    // echo $sql;
    // exit;
    $res = mysqli_query($conexion, $sql);
    $ver = mysqli_fetch_array($res);
    // if (empty($ver)) {
    //   $aux = 0;
    //   //var_dump($ver);
    //   //exit;
    // } else {

    //   $aux = 1;
    // }

    // echo $ver[0];
    // exit;
    return isset($ver[0]) ? 1 : 0;
    // return $aux;
    //echo $aux;
    //exit;
  }

  public function maximoId($conexion)
  {
    $sql = "SELECT MAX(COD_PRIVILEGIO) AS ID FROM PDV_C_PRIVILEGIO";
    //echo $sql;exit;
    $res = mysqli_query($conexion, $sql);
    $ver = mysqli_fetch_array($res);

    return isset($ver[0]) ? $ver[0] : -1;
  }
  public function grupoUsuario($conexion)
  {
    $sql = "SELECT * FROM C_GRUPO WHERE FECHA_BAJA IS NULL";
    $res = mysqli_query($conexion, $sql);
    return $res;
  }
  public function regresaTodosPrivilegios($conexion)
  {
    $sql = "SELECT * FROM PDV_C_PRIVILEGIO AS p, PDV_C_GRUPO_PRIVILEGIO AS g
    WHERE p.COD_PRIVILEGIO = g.COD_PRIVILEGIO";
    // echo $sql;
    // exit;
    $res = mysqli_query($conexion, $sql);
    return $res;
  }
  public function privilegiosgrupo($datos, $conexion)
  {
    //$sql = "SELECT * FROM PDV_C_GRUPO_PRIVILEGIO WHERE COD_GRUPO = " . $datos . ";";

    $sql = "SELECT * FROM C_PRIVILEGIO AS p, C_GRUPO_PRIVILEGIO AS g
    WHERE p.COD_PRIVILEGIO = g.COD_PRIVILEGIO AND g.COD_GRUPO =" . $datos . ";";

    // echo $sql;
    // exit;
    $res = mysqli_query($conexion, $sql);
    return $res;
  }
  
  public function insertarCatalogoNuevo($datos, $conexion)
  {

    $sql = "INSERT INTO C_PRIVILEGIO(COD_PRIVILEGIO,DESCRIPCION_PRIVILEGIO)
   SELECT COALESCE(MAX(COD_PRIVILEGIO)+1,1),
      " . quotedStr($datos->getNombre_privilegio()) . "
      FROM C_PRIVILEGIO;";
    // echo $sql;
    // exit;
    mysqli_query($conexion, $sql); //RECURSO DE PRUEBACONSULTA.PHP
    return true;
  }

  public function regresaTodosPrivilegiosNuevo($conexion)
  {
    $sql = "SELECT * FROM C_PRIVILEGIO WHERE FECHA_BAJA IS NULL";
    // echo $sql;
    // exit;
    $res = mysqli_query($conexion, $sql);
    return $res;
  }
}
