<?php

/*
Autor: Mariana Aldana Sánchez
Fecha: 22 de Julio de 2020, 16:45 hrs
*/


class dtoMovimiento{  
    
    private $Cod_movimiento;
    private $Descripcion;
    private $Signo;
    private $Fecha_baja;
    private $Cod_negocio;
    
    function getCod_movimiento() {
        return $this->Cod_movimiento;
    }

    function getDescripcion() {
        return $this->Descripcion;
    }

    function getSigno() {
        return $this->Signo;
    }

    function getFecha_baja() {
        return $this->Fecha_baja;
    }

    function getCod_negocio() {
        return $this->Cod_negocio;
    }

    function setCod_movimiento($Cod_movimiento) {
        $this->Cod_movimiento = $Cod_movimiento;
    }

    function setDescripcion($Descripcion) {
        $this->Descripcion = $Descripcion;
    }

    function setSigno($Signo) {
        $this->Signo = $Signo;
    }

    function setFecha_baja($Fecha_baja) {
        $this->Fecha_baja = $Fecha_baja;
    }

    function setCod_negocio($Cod_negocio) {
        $this->Cod_negocio = $Cod_negocio;
    }

    
    


 
}

