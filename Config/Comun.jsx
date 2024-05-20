/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 08 de mayo de 2024 - 12 hrs
 Descripcion: Contiene las variables comunes para los archivos utilizados en el sistema

 EMMANUEL SANTOS APAEZ 
 16 de mayo - 13 hrs
Descripción: Actualización del comun 
*/

export let accion = {
  Consultar: 10,
  Alta: 11,
  Baja: 12,
  Agregar: 13,
  Editar: 14,
  GrupPriv: 15
};

export let codCatalogo = {
  Negocios: 100,
  Privilegios: 101,
  Movimientos: 102,
  Localidades: 103
};


export const nombreNegocio = {
    Comun: ''
};

export const setNombreNegocio = (nombre) => {
    nombreNegocio.Comun = nombre;
};

export let nombreCatalogo = {
  100: 'Negocios',
  101: 'Privilegios',
  102: 'Movimientos',
  103: 'Localidades'
};

export let codNegocio = {

};



