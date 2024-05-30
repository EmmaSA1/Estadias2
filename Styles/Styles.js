/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK Y EMMANUEL SANTOS APAEZ
 11 de mayo de 2024 - 14 hrs
 Descripcion: Contiene la los estilos de la aplicacion

  21 de mayo de 2024 - 14 hrs
 Descripcion: Contiene la los estilos de la aplicacion
*/

import { StyleSheet } from "react-native";
import { Row } from "react-native-table-component";

//variables para cada color de fonfo y de botones
//variable para el color del fondo
let fondoColorAzul = "#000082";

//variable para seleccionar los colores para los botones
let botonesColorAzul = "0000cf";

//variable para el color amarillo del hook
let fondoColorAmarrillo = "#F1B70C";

//variable para botones de color rojos
let botonRojo = "red";

let botonVerde = "green";

//variable para seleccionar le color de anterior
let botonesNextPrevious = "#DDDDDD";

//variable para el tipo de tipografía
let tipoLetraTitulo = "Roboto";

//variable para el color del tipo de tipografia "blanca"
let colorLetraBlanca = "white";

//variable para el color del tipo de tipografia "negra"
let colorLetraNegra = "black";

//variable del color del modal
let colorModal = "white";

//variable selección del color gris
let colorGris = "f2f2f2";

//variable selección color blanco
let colorBlanco = "white";

//variable selecr color amarillo
let colorAmarillo = "yellow";

////variable para el tipo de tipografía secundaria
let tipoLetraSecundaria = "Roboto";

//variable para los bordes de los colores
let borderColor = "#ddd";

//variable para los bordes de los colores
let borderColor1 = "#ccc";

//variable para el color de la tabla
let colorTabla = "#fff";

//variable para el color de las sombras
let colorSobra = "#000";

//valores hexa en variables
export const styles = StyleSheet.create({
  //contenedor principal de la pantalla
  container: {
    flex: 1,
    backgroundColor: fondoColorAzul,
  },

  //contenedor del Encabezado
  containerHeader: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: fondoColorAmarrillo,
    height: 70, // Reducimos la altura del encabezado
    marginBottom: 20, // Añadimos un margen inferior
  },

  //contenedor para los botones
  container2: {
    alignSelf: "center",
    height: "auto",
    width: "70%",
  },

  //contenedor de la tabla
  container3: {
    height: "75%",
  },

  //contenedor de dos botones al mismo nivel
  container4: {
    marginTop: 5,
    alignSelf: "center",
    height: "auto",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  //contenedor del boton de cancelar formulario
  container5: {
    alignSelf: "center",
    height: "auto",
  },

  //contenedor del formulario para agregar
  container6: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colorBlanco,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    height: "70%",
  },

  //contenedor del Splash
  container7: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colorBlanco,
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 90,
    marginRight: 20,
  },

  containerSearch: {
    backgroundColor: colorGris,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  inputSearch: {
    height: 40,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: "45%",
  },

  table: {
    height: "80%",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    margin: 20,
    backgroundColor: colorTabla,
    borderRadius: 5,
    shadowColor: colorSobra,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  opcionesTable: {
    fontSize: 30,
  },

  Encabezados: {
    flexDirection: "row",
    backgroundColor: colorGris,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },

  Contenido: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },

  cell: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },

  Titulo: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    fontSize: 16,
  },

  TituloAcciones: {
    flex: 1,
    padding: 10,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "right", // Alinea el texto hacia la derecha dentro del contenedor
    marginRight: "5%", // Agrega un margen derecho para moverlo más a la derecha
    fontFamily: tipoLetraSecundaria,
  },

  centeredView: {
    marginTop: 10,
    marginBottom: 10,
    height: "90%",
  },

  modalView: {
    backgroundColor: colorModal,
    borderRadius: 20,
    padding: 30,
    shadowColor: colorSobra,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  titleModal: {
    color: colorLetraNegra,
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: tipoLetraSecundaria,
  },

  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 1,
  },

  buttonCancelar: {
    borderRadius: 20,
    padding: 15,
    marginStart: -50, // Espacio a la derecha para separar los botones
  },

  buttonEdit: {
    borderRadius: 20,
    padding: 15,
    marginEnd: -50,
  },

  buttonAzul: {
    backgroundColor: botonesColorAzul,
  },

  buttonRojo: {
    backgroundColor: botonRojo,
  },

  buttonVerde: {
    backgroundColor: botonVerde,
  },

  /*button: {
    backgroundColor: botonEditar,
  },*/

  textStyle: {
    color: colorLetraBlanca,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: tipoLetraSecundaria,
  },

  //textStyleNegro:{
  //color: colorLetraNegra,
  //fontWeight: "bold",
  //textAlign: "center",
  //ontFamily: tipoLetraSecundaria,
  //},

  loadingAnimation: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  imageLogo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  input: {
    height: 50,
    width: 300, // Ajusta el valor para que sea igual en ambos estilos
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20, // Ajusta este valor si es necesario para mantener la consistencia vertical
    backgroundColor: colorTabla,
    fontSize: 16,
    color: colorLetraNegra,
    textAlign: "center",
    marginLeft: "auto", // Esto ajustará el inputCodPriv hacia la derecha
    marginRight: "auto", // Esto ajustará el inputCodPriv hacia la izquierda
  },
  
  inputNombre: {
    height: 50,
    width: 300, // Ajustamos el ancho relativo en lugar de un valor fijo
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    paddingHorizontal: 20, // Ajustamos el padding horizontal
    marginBottom: 20,
    backgroundColor: colorTabla,
    fontSize: 16,
    color: colorLetraNegra,
    textAlign: "center",
    marginLeft: "auto", // Esto ajustará el inputCodPriv hacia la derecha
    marginRight: "auto", // Esto ajustará el inputCodPriv hacia la izquierda
  },
  
  inputCodPriv: {
    height: 50,
    width: 300, // Ajustamos el ancho relativo en lugar de un valor fijo
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    paddingHorizontal: 20, // Ajustamos el padding horizontal
    marginBottom: 20,
    marginLeft: "auto", // Esto ajustará el inputCodPriv hacia la derecha
    marginRight: "auto", // Esto ajustará el inputCodPriv hacia la izquierda
    backgroundColor: colorTabla,
    fontSize: 16,
    color: colorLetraNegra,
    textAlign: "center",
  },

  

  titleInput: {
    color: colorLetraNegra,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: tipoLetraSecundaria,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%", // Espacio horizontal para que los botones no estén pegados a los bordes
  },

  buttonNext: {
    paddingVertical: 15, // Ajuste del padding vertical, el horizontal sigue siendo 10
    backgroundColor: botonesNextPrevious,
    borderRadius: 10,
    textAlign: "center",
    marginLeft: "31%",
  },

  buttonPrevuis: {
    paddingVertical: 15, // Ajuste del padding vertical, el horizontal sigue siendo 10
    backgroundColor: botonesNextPrevious,
    borderRadius: 10,
    textAlign: "center",
    fontFamily: tipoLetraSecundaria,
    marginRight: "24%",
  },

  pageCounter: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },

  headerTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colorLetraBlanca,
    fontFamily: tipoLetraTitulo,
    padding: 30,
  },

  error: {
    color: "red",
  },

  nombreNegocio: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: tipoLetraTitulo,
  },

  //Estilos de Login
  containerLogi: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 400,
    marginHorizontal: "auto",
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  logo1: {
    width: 250,
    height: 200,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },

  inputUsuario: {
    height: 50,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colorTabla,
    fontSize: 16,
    color: colorLetraNegra,
    width: 320 /* Ancho del input */,
    marginHorizontal: 10 /* Margen interno horizontal */,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 320 /* Ancho del contenedor */,
    marginBottom: 20,
    marginHorizontal: 10 /* Margen interno horizontal */,
  },

  passwordInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colorTabla,
    fontSize: 16,
    color: colorLetraNegra,
  },

  eyeIconContainer: {
    position: "absolute",
    right: 10,
  },

  forgotPasswordContainer: {
    alignSelf: "center",
    marginBottom: 25,
  },

  forgotPasswordText: {
    color: botonesColorAzul,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },

  ButtonLogin: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginHorizontal: "auto",
    backgroundColor: botonesColorAzul,
  },

  //estilos de filtrado
  containerFil: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "",
    width: "auto",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Centra el texto horizontalmente
  },

  UserContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 320 /* Ancho del contenedor */,
    marginBottom: 20,
    marginHorizontal: 10 /* Margen interno horizontal */,
  },

  selectInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colorTabla,
    fontSize: 16,
    color: colorLetraNegra,
  },

  IconContainer: {
    position: "absolute",
    right: 20,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "#707070",
    justifyContent: "center",
    alignItems: "center",
  },

  pickerContainer: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },

  ButtonFil: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginHorizontal: "auto",
    backgroundColor: botonesColorAzul,
  },

  //Estilos de Paginaa Principal
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: fondoColorAzul,
  },

  title2: {
    padding: 70,
    color: colorAmarillo,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Centra el texto horizontalmente
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "56%",
    marginBottom: 50,
    fontWeight: "bold",
  },


  buttonContainer1: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginBottom: 50,
    fontWeight: "bold",
  },

  /*buttonContainer2: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginBottom: 50,
    fontWeight: "bold",
  },*/

  buttonWrapper: {
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorAmarillo,
    marginTop: 5,
  },

  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },

  imagePag: {
    width: 170,
    height: 170,
    marginBottom: 15,
  },

  //Estilos de Catalogos
  catlogoContainer: {
    flex: 1,
    paddingHorizontal: 40,
    marginBottom: 20,
    padding: 100,
  },
  topSection: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 30,
  },
  middleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonCatalogo: {
    borderRadius: 20,
    padding: 40,
    elevation: 1,
  },
  
  backButton: {
     flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginBottom: 50,
    fontWeight: "bold",
  },

  backButtonPrin: {
    flexDirection: "row",
   justifyContent: "space-around",
   alignItems: "center",
   width: "57%",
   marginBottom: 50,
   fontWeight: "bold",
 },

  backButtonText: {
    borderRadius: 20,
    padding: 10,
    elevation: 1,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
   },

  tableChica: {
    height: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    backgroundColor: colorTabla,
    borderRadius: 25,
    overflow: "hidden",
  },

  listGrupPriv:{
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    width: "100%",
  },
  lastItem: {
    borderBottomWidth: 0,
},

  textGrupPriv:{
    fontSize: 20,
    fontWeight: 'bold',
  },
});
