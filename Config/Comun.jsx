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






export let accionReporte = {
  Consultar: 20,
  Generar: 21,
  Descargar: 22,
  Compartir: 23,
  Editar: 24,
  Eliminar: 25
};

export let codReporte = {
  Ventas: 200,
  Clientes: 201,
  Productos: 202,
  Usuarios: 203,
  Finanzas: 204,
  Inventario: 205
};

export let nombreReporte = {
  200: 'Ventas',
  201: 'Clientes',
  202: 'Productos',
  203: 'Usuarios',
  204: 'Finanzas',
  205: 'Inventario'
};

export const nombreReporteSeleccionado = {
  nombre: ''
};

export const codigoReporteSeleccionado = {
  codigo: ''
};

export const setNombreReporte = (nombre) => {
  nombreReporteSeleccionado.nombre = nombre;
  console.log("Nombre del reporte establecido:", nombre);
};

export const setCodigoReporte = (codigo) => {
  codigoReporteSeleccionado.codigo = codigo;
  console.log("Código del reporte establecido:", codigo);
};