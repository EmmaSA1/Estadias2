<?php
/*
Autor: Mariana Aldana Sánchez
Fecha: 04 de Agosto de 2020, 19:00 hrs
*/
class daoMovimiento{
     
    public function insertarMovimiento($otroDTOmovimiento, $conexion) { //INSERT
       
        $sql="INSERT INTO PDV_C_MOVIMIENTO(COD_MOVIMIENTO, DESCRIPCION, SIGNO,  COD_NEGOCIO) 
        SELECT COALESCE(MAX(COD_MOVIMIENTO)+1,1),
                ".quotedStr($otroDTOmovimiento->getDescripcion()).",
                ".quotedStr($otroDTOmovimiento->getSigno()).",
                ".$otroDTOmovimiento->getCod_negocio()
               . " FROM PDV_C_MOVIMIENTO "
               . " WHERE COD_NEGOCIO=".$otroDTOmovimiento->getCod_negocio().";";
            //echo $sql;exit;
          mysqli_query($conexion,$sql); //RECURSO DE PRUEBACONSULTA.PHP
       
        return true; 
    }
    
    public function regresaMovimientos($rm,$estatus, $conexion){ //SELECT REGRESA MOVIMIENTOS GENERAL
        
      $sql = "SELECT * FROM PDV_C_MOVIMIENTO
       WHERE COD_NEGOCIO=" . $rm->getCod_negocio() .
            " AND FECHA_BAJA ";
        if ($estatus == 'VIGENTES') {
            $aux = " IS NULL";
        } else if ($estatus == 'NO VIGENTES') {
            $aux = "IS NOT NULL";
        }
        $sql = $sql . $aux . " ORDER BY SIGNO ASC";

        // echo $sql;
        // exit;
        $res = mysqli_query($conexion, $sql);
        return $res;
    }
    
    public function regresaMovimiento($regresaMovimiento, $conexion){ //SELECT REGRESA MOVIMIENTO INDIVIDUAL
        
         
        $sql="SELECT COD_MOVIMIENTO, DESCRIPCION, SIGNO, FECHA_BAJA, COD_NEGOCIO FROM PDV_C_MOVIMIENTO WHERE COD_MOVIMIENTO=".
        $regresaMovimiento->getCod_movimiento() ." AND COD_NEGOCIO=".$regresaMovimiento->GetCod_negocio();
        $res = mysqli_query($conexion,$sql);
       $ver=mysqli_fetch_array($res);
        return $ver;
        
    }
    
    public function actualizarMovimiento($actualizarMovimiento, $conexion) { //UPDATE
       
        $sql="UPDATE PDV_C_MOVIMIENTO SET DESCRIPCION=".quotedStr($actualizarMovimiento->getDescripcion()).","
                . "SIGNO= ".quotedStr($actualizarMovimiento->getSigno()) ."WHERE COD_MOVIMIENTO =".$actualizarMovimiento->GetCod_movimiento()
                . " AND COD_NEGOCIO=".$actualizarMovimiento->GetCod_negocio();
              // echo $sql; exit;
        mysqli_query($conexion,$sql);        
        return true;
    }
    
    public function bajaMovimiento($bajaMovimiento, $conexion) { //DELETE
        
         $sql = "UPDATE PDV_C_MOVIMIENTO SET FECHA_BAJA = NOW() ".
                " WHERE COD_MOVIMIENTO=".$bajaMovimiento->getCod_movimiento()
               ." AND COD_NEGOCIO=".$bajaMovimiento->GetCod_negocio();
              //  echo $sql;exit;
       mysqli_query($conexion,$sql); //RECURSO DE PRUEBACONSULTA.PHP
       return true; 
        
        
    }
    
    // Gilberto Almanza Maldonado. 21 de Octubre de 2021 09:38 hrs
    // función que regresa el codigo de movimiento más pequeño del negocio con un signo dado
    // el dto debe contener el cod_negocio y el signo
     public function regresaMovimientoReEstructura($dto, $conexion){ //SELECT REGRESA MOVIMIENTO INDIVIDUAL
        $sql="SELECT COD_MOVIMIENTO, DESCRIPCION, SIGNO, FECHA_BAJA, COD_NEGOCIO FROM PDV_C_MOVIMIENTO ".
             " WHERE  COD_NEGOCIO=".$dto->GetCod_negocio() . " AND SIGNO = ".quotedStr($dto->getSigno()).
             " ORDER BY COD_MOVIMIENTO ASC ".
             " LIMIT 1";
        $reg = mysqli_query($conexion,$sql);
        $a   = mysqli_fetch_array($reg);
        return $a;
    }
    
    //Dulce Yenny G.A. 01/JUNIO/2023
    public function activaMovimiento($datosMovimiento, $conexion)
    {

        $sql = "UPDATE PDV_C_MOVIMIENTO SET FECHA_BAJA = NULL " .
            " WHERE COD_MOVIMIENTO=" . $datosMovimiento->getCod_movimiento()
            . " AND COD_NEGOCIO=" . $datosMovimiento->GetCod_negocio();
        //  echo $sql;exit;
        $res = mysqli_query($conexion, $sql);
        return $res;
    }
    
}
