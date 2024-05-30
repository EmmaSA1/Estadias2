
<?php
//Autor: Alex Fredy Rivera Sandoval
class daoLocalidad{
    
    public function regresaTodasLocalidades($datos, $estatus, $conexion){ // función que regresa todas las localidades del sitemá 
       $sql = "SELECT * FROM PDV_C_LOCALIDAD
       WHERE COD_NEGOCIO=" . $datos->getCod_negocio() .
      " AND FECHA_BAJA ";
    if ($estatus == 'VIGENTES') {
      $aux = " IS NULL";
    } else if ($estatus == 'NO VIGENTES') {
      $aux = "IS NOT NULL";
    }
    $sql = $sql . $aux . " ORDER BY ESTADOS ASC";
       $res = mysqli_query($conexion,$sql);
      // echo $sql;exit;
      return $res;
    }
    
    public function regresaLocalidad($datos, $conexion)
  { // función que regresa solo una localidad del sistema
    $sql = "SELECT * FROM PDV_C_LOCALIDAD WHERE COD_NEGOCIO = " . $datos->getCod_negocio() . " AND 
        COD_LOCALIDAD = " . $datos->getCod_localidad() . ";";
    $res = mysqli_query($conexion, $sql);
    // echo $sql;
    // exit;
    return $res;
  }
    
    
    public function altaLocalidad($datos,$conexion){
        $sql = "INSERT INTO PDV_C_LOCALIDAD (COD_LOCALIDAD, COD_NEGOCIO, LOCALIDAD, ESTADOS) 
        SELECT COALESCE(MAX(COD_LOCALIDAD)+1,1),
        ".$datos->getCod_negocio().",
        ".quotedStr($datos->getLocalidad()).",
        ".quotedStr($datos->getEstados())." 
        FROM PDV_C_LOCALIDAD;";
        $res = mysqli_query($conexion,$sql);
       //echo $sql;exit;
      return $res;
    }

    
    
    public function modificaLocalidad($datos,$conexion){ // función que regresa solo una localidad del sistema
        $sql = "UPDATE PDV_C_LOCALIDAD SET 
        LOCALIDAD= ".quotedStr($datos->getLocalidad()).","
        ."ESTADOS= ".quotedStr($datos->getestados()).","
        ."FECHA_BAJA = ".'NULL'."
        WHERE COD_NEGOCIO = ".$datos->getCod_negocio()." AND 
        COD_LOCALIDAD = ".$datos->getCod_localidad().";";
        $res = mysqli_query($conexion,$sql);
       //echo $sql;exit;
      return $res;
    }
    
        public function bajaLocalidad($datos,$conexion){ // función que regresa solo una localidad del sistema
        $sql = "UPDATE PDV_C_LOCALIDAD SET FECHA_BAJA = NOW()"."
        WHERE COD_NEGOCIO = ".$datos->getCod_negocio()." AND 
        COD_LOCALIDAD = ".$datos->getCod_localidad().";";
        $res = mysqli_query($conexion,$sql);
       //echo $sql;exit;
      return $res;
    }
    
    //DULCE YENNY G.A. 29/05/2023
    
      public function activaLocalidad($datos, $conexion)
    { // función que regresa solo una localidad del sistema
      $sql = "UPDATE PDV_C_LOCALIDAD SET FECHA_BAJA = NULL" . "
          WHERE COD_NEGOCIO = " . $datos->getCod_negocio() . " AND 
          COD_LOCALIDAD = " . $datos->getCod_localidad() . ";";
      $res = mysqli_query($conexion, $sql);
      //echo $sql;exit;
      return $res;
    }
    
}

?>





