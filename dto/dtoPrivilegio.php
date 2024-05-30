<?php

/*
Autor: Mariana Aldana Sánchez
Fecha: 22 de Julio de 2020, 16:30 hrs
*/

class dtoPrivilegio{   
     
    private $Cod_privilegio;
    private $Nombre_privilegio;
    private $Fecha_baja;
    private $Cod_negocio;
    
    function getCod_privilegio() {
        return $this->Cod_privilegio;
    }

    function getNombre_privilegio() {
        return $this->Nombre_privilegio;
    }

    function getFecha_baja() {
        return $this->Fecha_baja;
    }

    function getCod_negocio() {
        return $this->Cod_negocio;
    }

    function setCod_privilegio($Cod_privilegio) {
        $this->Cod_privilegio = $Cod_privilegio;
    }

    function setNombre_privilegio($Nombre_privilegio) {
        $this->Nombre_privilegio = $Nombre_privilegio;
    }

    function setFecha_baja($Fecha_baja) {
        $this->Fecha_baja = $Fecha_baja;
    }

    function setCod_negocio($Cod_negocio) {
        $this->Cod_negocio = $Cod_negocio;
    }

   
    
    
}
?>
    
