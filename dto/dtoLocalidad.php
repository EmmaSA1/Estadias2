<?php
//Auto: Alex Fredy Rivera Sandoval

class dtoLocalidad{
    
    private $Cod_localidad;
    private $Cod_negocio;
    private $Localidad;
    private $Estados;
    private $Fecha_baja;
    
    function getCod_Localidad() {
        return $this->Cod_localidad;
    }

    function getCod_negocio() {
        return $this->Cod_negocio;
    }

    function getLocalidad() {
        return $this->Localidad;
    }

    function getEstados() {
        return $this->Estados;
    }

    function getFecha_baja() {
        return $this->Fecha_baja;
    }

    function setCod_localidad($Cod_localidad) {
        $this->Cod_localidad = $Cod_localidad;
    }

    function setCod_negocio($Cod_negocio) {
        $this->Cod_negocio = $Cod_negocio;
    }

    function setLocalidad($Localidad) {
        $this->Localidad = $Localidad;
    }

    function setEstados($Estados) {
        $this->Estados = $Estados;
    }

    function setFecha_baja($Fecha_baja) {
        $this->Fecha_baja = $Fecha_baja;
    }
 }
?>