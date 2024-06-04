/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK y Emmanuel Santos Apaez
 08 de mayo de 2024 - 12 hrs
 Descripcion: Contiene las variables comunes para los archivos utilizados en el sistema
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
  Localidades: 103,
  Productos: 104,
  Usuarios: 105,
  Cliente: 106,
  Configuracion: 107

};

export let nombreCatalogo = {
  100: 'Negocios',
  101: 'Privilegios',
  102: 'Movimientos',
  103: 'Localidades',
  104: 'Productos',
  105: 'Usuarios',
  106: 'Clientes',
  107: 'Configuracion'

};

export const nombreNegocio = {
  nombre: ''
};

export const CodigoNegocio = {
codigo: ''
};

export const setNombreNegocio = (nombre) => {
  nombreNegocio.nombre = nombre;
  console.log("Nombre de negocio establecido:", nombre);
};

export const setCodNegocio = (codigo) => {
  CodigoNegocio.codigo = codigo;
  console.log("Código de negocio establecido:", codigo);
};

export const CantidadMaximaMostrada = 10;