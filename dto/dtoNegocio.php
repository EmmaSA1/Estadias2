<?php

/*
Autor: Mariana Aldana Sánchez
Fecha: 22 de Julio de 2020, 17:30 hrs
*/

class dtoNegocio{   
           
    private $Cod_negocio;
    private $Nombre;
    private $Giro;
    private $Direccion;
    private $Telefono_oficina;
    private $Telefono_celular;
    private $E_mail;
    private $Fecha_baja;
    private $Logo;

    function getLogo() {
        return $this->Logo;
    }
 
    function getCod_negocio() {
        return $this->Cod_negocio;
    }

    function getNombre() {
        return $this->Nombre;
    }

    function getGiro() {
        return $this->Giro;
    }

    function getDireccion() {
        return $this->Direccion;
    }

    function getTelefono_oficina() {
        return $this->Telefono_oficina;
    }

    function getTelefono_celular() {
        return $this->Telefono_celular;
    }

    function getE_mail() {
        return $this->E_mail;
    }

    function getFecha_baja() {
        return $this->Fecha_baja;
    }

    function setCod_negocio($Cod_negocio) {
        $this->Cod_negocio = $Cod_negocio;
    }

    function setNombre($Nombre) {
        $this->Nombre = $Nombre;
    }

    function setGiro($Giro) {
        $this->Giro = $Giro;
    }

    function setDireccion($Direccion) {
        $this->Direccion = $Direccion;
    }

    function setTelefono_oficina($Telefono_oficina) {
        $this->Telefono_oficina = $Telefono_oficina;
    }

    function setTelefono_celular($Telefono_celular) {
        $this->Telefono_celular = $Telefono_celular;
    }

    function setE_mail($E_mail) {
        $this->E_mail = $E_mail;
    }

    function setFecha_baja($Fecha_baja) {
        $this->Fecha_baja = $Fecha_baja;
    }

    function setLogo($Logo) {
        $this->Logo = $Logo;
    }


   
}
?>

