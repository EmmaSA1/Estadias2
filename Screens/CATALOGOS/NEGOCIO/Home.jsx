/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK y EMMANUEL SANTOS APAEZ
 25 de abril de 2024 - 16 hrs
 Descripcion: Contiene las La vista principal del catalogo
*/
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormNegocios from '../../../Config/formNegocios';

// Declaramos los valores iniciales del formulario 
const initialSelected = {
    Nombre: '',
    Giro: '',
    Direccion: '',
    TelefonoOficina: '',
    TelefonoCelular: '',
    Email: '',
    Logotipo: ''
};

export default function Home() {
    // Hook para la navegación
    const navigation = useNavigation();
    const route = useRoute();

    // Hook para la modal de edición
    const [editModalVisible, setEditModalVisible] = useState(false);
    // Hook para seleccionar el id
    const [selected, setSelected] = useState(null);
    // Hook para la barra de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para la acción actual
    const [accion, setAccion] = useState('');
    // Estado para los valores del negocio seleccionado
    const [selectedValues, setSelectedValues] = useState(initialSelected);
    // Estado para la paginación
    const [page, setPage] = useState(1);
    const pageSize = 10;
    // Estado para el filtro por estado
    const [statusFilter, setStatusFilter] = useState('null');

    // Actualizar el nombre del negocio seleccionado al cargar la pantalla
    useEffect(() => {
        if (route.params?.selectedOption) {
            Comun.setNombreNegocio(route.params.selectedOption);
        }
    }, [route.params?.selectedOption]);

    // Función para cambiar la acción cuando se presiona un botón
    const handleAction = (accion, cod_negocio) => {
        setSelected(cod_negocio);
        setAccion(accion);

        switch (accion) {
            case 13:
                navigation.replace('AgregarCatalogoNeg', { accion: accion });
                break;
            case 10:
                break;
            case 11:
                QuitarBaja(accion);
                break;
            case 12:
                PonerBaja(accion);
                break;
            case 14:
                openEditModal(cod_negocio);
                break;
            default:
        }
    };

    // Datos de ejemplo
    const [data, setData] = useState([
        { cod_negocio: '01', Nombre: 'Perfumes Ian', Giro: 'Venta', Direccion: 'Calle 1', TelefonoOficina: '1234567890', TelefonoCelular: '0987654321', Email: 'corre@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '02', Nombre: 'Soluciones T.I', Giro: 'Venta', Direccion: 'Calle 2', TelefonoOficina: '1234567890', TelefonoCelular: '0987654321', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '03', Nombre: 'prueba1', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '04', Nombre: 'prueba2', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: '2004-04-12' },
        { cod_negocio: '05', Nombre: 'prueba3', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '06', Nombre: 'prueba4', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '07', Nombre: 'prueba5', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: '2005-04-12' },
        { cod_negocio: '08', Nombre: 'prueba6', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '09', Nombre: 'prueba7', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '10', Nombre: 'prueba8', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: '2006-04-12' },
        { cod_negocio: '11', Nombre: 'prueba9', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '12', Nombre: 'prueba10', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '13', Nombre: 'prueba11', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '14', Nombre: 'prueba12', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: '2007-04-12' },
        { cod_negocio: '15', Nombre: 'prueba13', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '16', Nombre: 'prueba14', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '17', Nombre: 'prueba15', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
    ]);

    // Función para abrir el modal de edición y pasar los valores del negocio seleccionado
    const openEditModal = (cod_negocio) => {
        const datos = data.find(item => item.cod_negocio === cod_negocio);
        setSelectedValues(datos); // Actualizar selectedValues con los datos del negocio seleccionado
        setSelected(datos);
        setEditModalVisible(true);
    };

    // Función para editar los datos del negocio
    const handleEdit = (values) => {
        // Encuentra el índice del negocio seleccionado
        const index = data.findIndex(item => item.cod_negocio === selected.cod_negocio);
        // Crea una copia de los datos existentes
        const newData = [...data];
        // Actualiza los datos del negocio seleccionado
        newData[index] = { ...newData[index], ...values };
        // Actualiza los datos
        setData(newData);
    };

    const PonerBaja = () => {
        Alert.alert(
            "¿Estás seguro de asignar baja?",
            "Esta acción no se puede deshacer",
            [
                { text: "No", style: "cancel" },
                { text: "Sí", onPress: () => navigation.navigate('SplashCatalogoNeg', { accion: Comun.accion.Baja }) }
            ]
        );
    };

    const QuitarBaja = () => {
        Alert.alert(
            "¿Estás seguro de quitar baja?",
            "Esta acción no se puede deshacer",
            [
                { text: "No", style: "cancel" },
                { text: "Sí", onPress: () => navigation.navigate('SplashCatalogoNeg', { accion: Comun.accion.Alta }) }
            ]
        );
    };

    const handleSubmit = (values) => {
        handleEdit(values); // Pasa los valores al manejo de la edición
        setEditModalVisible(!editModalVisible); // Cierra el modal después de editar
    };

    const handleBack = () => {
        navigation.replace('Catalogos');
    };

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1);
    };

     //funcion para mostrar la siguiente paguina
     const handleNext = () => {
        if ((page * pageSize) < data.length) {
            setPage(page + 1);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.Comun}</Text>
            </View>
            <View style={styles.container2}>
                <Pressable
                    style={[styles.button, styles.buttonAzul]}
                    onPress={handleBack}
                >
                    <Text style={styles.textStyle}>Regrsear</Text>
                </Pressable>
            </View>
            <View style={styles.container3}>
                <Text style={styles.headerTitulo}>{Comun.nombreCatalogo[100]}</Text>
                <View style={styles.container4}>
                    <Pressable style={[styles.button, styles.buttonAzul]}
                        onPress={() => handleAction(Comun.accion.Agregar)}>
                        <Text style={styles.textStyle}>Agregar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonAzul]}
                        onPress={() => setStatusFilter(statusFilter === 'null' ? 'baja' : 'null')}
                    >
                        <Text style={styles.textStyle}>{statusFilter === 'null' ? 'Bajas' : 'Vigentes'}</Text>
                    </Pressable>
                </View>



                <View style={styles.table}>
                    <View style={styles.containerSearch}>
                        <TextInput
                            style={styles.inputSearch}
                            placeholder="Buscar..."
                            onChangeText={(text) => setSearchTerm(text)}
                            value={searchTerm}
                        />
                    </View>
                    <View style={styles.Encabezados}>
                        <Text style={styles.Titulo}>NOMBRE</Text>
                        <Text style={styles.Titulo}>GIRO</Text>
                        <Text style={styles.TituloAcciones}>ACCIONES</Text>
                    </View>



                    <ScrollView>
                        {data.filter(item => statusFilter === 'null' ? item.status !== 'baja' : item.status === 'baja').map((item) => (                   
                           <View key={item.cod_negocio} style={styles.Contenido}>


                                    <Text style={styles.cell}>{item.Nombre}</Text>
                                    <Text style={styles.cell}> {item.Giro}</Text>


                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity
                                            onPress={() => handleAction(Comun.accion.Editar, item.cod_negocio)}
                                        >
                                            <Icon name="eye-outline" size={25} color="black" />
                                        </TouchableOpacity>
                                        {statusFilter === 'baja' ? (
                                            <TouchableOpacity
                                                onPress={() => handleAction(Comun.accion.Alta)}
                                            >
                                                <Icon name="checkmark-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => handleAction(Comun.accion.Baja)} disabled={statusFilter === 'baja'}>
                                                <Icon name="trash-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                            </View>
                        ))}
                    </ScrollView>

                    <View style={styles.pagination}>
                        <TouchableOpacity onPress={handlePrevious}>
                            <Text style={styles.buttonPrevuis}>Previous</Text>
                        </TouchableOpacity>
                        <Text style={styles.pageCounter}>{page}</Text>
                        <TouchableOpacity onPress={handleNext}>
                            <Text style={styles.buttonNext}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => {
                    setEditModalVisible(!editModalVisible);
                }}
            >
                 <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titleModal}>Modificar {Comun.nombreCatalogo[100]}</Text>
                        <ScrollView>
                            <FormNegocios onSubmit={handleSubmit} action={accion} initialValues={{ ...selectedValues, cod_negocio: selected }} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}




















































/*
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormNegocios from '../../../Config/formNegocios';

//Declaramos los valores iniciales del formulario 
const initialSelected = {
    Nombre: '',
    Giro: '',
    Direccion: '',
    TelefonoOficina: '',
    TelefonoCelular: '',
    Email: '',
    Logotipo: ''
};

export default function Home() {
    // Hook para la navegación
    const navigation = useNavigation();
    // Hook para la modal de edición
    const [editModalVisible, setEditModalVisible] = useState(false);
    // Hook para seleccionar el id
    const [selected, setSelected] = useState(null);
    // Hook para la barra de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para la acción actual
    const [accion, setAccion] = useState('');
    // Estado para los valores del negocio seleccionado
    const [selectedValues, setSelectedValues] = useState(initialSelected);
    // Estado para la paginación
    const [page, setPage] = useState(1);
    const pageSize = 10;
    // Estado para el filtro por estado
    const [statusFilter, setStatusFilter] = useState('null');

    const [nameNegocio, setnameNegocio] = useState(Comun.nombreNegocio.Comun);


    useEffect(() => {
        setnameNegocio(Comun.nombreNegocio.Comun);
    }, []);



    // Función para cambiar la acción cuando se presiona un botón
    const handleAction = (accion, cod_negocio) => {
        setSelected(cod_negocio);
        setAccion(accion);
        console.log(accion);

        switch (accion) {
            case 13:
                console.log("Agregar nuevo negocio");
                navigation.replace('AgregarCatalogoNeg', { accion: accion });
                break;
            case 10:
                console.log("Consultar negocio");
                break;
            case 11:
                console.log("Dar de alta negocio");
                QuitarBaja(accion);
                break;
            case 12:
                console.log("Dar de baja negocio");
                PonerBaja(accion);
                break;
            case 14:
                console.log("Editar negocio");
                openEditModal(cod_negocio);
                break;
            default:
                console.log("Acción no reconocida");
        }

    };

    //aqui van los datos se sustituira por la consulta a la base de datos
    const [data, setData] = useState([
        { cod_negocio: '01', Nombre: 'Perfumes Ian', Giro: 'Venta', Direccion: 'Calle 1', TelefonoOficina: '1234567890', TelefonoCelular: '0987654321', Email: 'corre@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '02', Nombre: 'Soluciones T.I', Giro: 'Venta', Direccion: 'Calle 2', TelefonoOficina: '1234567890', TelefonoCelular: '0987654321', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '03', Nombre: 'prueba1', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '04', Nombre: 'prueba2', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: '2004-04-12' },
        { cod_negocio: '05', Nombre: 'prueba3', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '06', Nombre: 'prueba4', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '07', Nombre: 'prueba5', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: '2005-04-12' },
        { cod_negocio: '08', Nombre: 'prueba6', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '09', Nombre: 'prueba7', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '10', Nombre: 'prueba8', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: '2006-04-12' },
        { cod_negocio: '11', Nombre: 'prueba9', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '12', Nombre: 'prueba10', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '13', Nombre: 'prueba11', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '14', Nombre: 'prueba12', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: '2007-04-12' },
        { cod_negocio: '15', Nombre: 'prueba13', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '16', Nombre: 'prueba14', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
        { cod_negocio: '17', Nombre: 'prueba15', Giro: 'prueba', Direccion: 'Calle 2', TelefonoOficina: '7772953987', TelefonoCelular: '7772953987', Email: 'correo@gmail.com', Logotipo: 'imagen.png', status: 'null' },
    ]);

    //funcion para mostrar la paguina anterior
    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    //funcion para mostrar la siguiente paguina
    const handleNext = () => {
        if ((page * pageSize) < data.length) {
            setPage(page + 1);
        }
    };

    // Función para abrir el modal de edición y pasar los valores del negocio seleccionado
    const openEditModal = (cod_negocio) => {
        const datos = data.find(item => item.cod_negocio === cod_negocio);
        setSelectedValues(datos); // Actualizar selectedValues con los datos del negocio seleccionado
        setSelected(datos);
        setEditModalVisible(true);
        console.log(datos);
    }

    // Función para editar los datos del negocio
    const handleEdit = (values) => {
        // Encuentra el índice del negocio seleccionado
        const index = data.findIndex(item => item.cod_negocio === selected.cod_negocio);
        // Crea una copia de los datos existentes
        const newData = [...data];
        // Actualiza los datos del negocio seleccionado
        newData[index] = { ...newData[index], ...values };
        // Actualiza los datos
        setData(newData);

        console.log("Datos editados:", newData[index]);
    };

    const PonerBaja = () => {
        Alert.alert(
            "¿Estás seguro de asignar baja?",
            "Esta acción no se puede deshacer",
            [
                {
                    text: "No",
                    onPress: () => console.log("Operación cancelada"),
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        navigation.navigate('SplashCatalogoNeg', { accion: Comun.accion.Baja });
                    }
                }
            ]
        );
    };

    const QuitarBaja = () => {
        Alert.alert(
            "¿Estás seguro de quitar baja?",
            "Esta acción no se puede deshacer",
            [
                {
                    text: "No",
                    onPress: () => console.log("Operación cancelada"),
                    style: "cancel"
                },
                {
                    text: "Sí",
                    onPress: () => {
                        navigation.navigate('SplashCatalogoNeg', { accion: Comun.accion.Alta });
                    }
                }
            ]
        );
    };

    const handleSubmit = (values) => {
        handleEdit(values); // Pasa los valores al manejo de la edición
        setEditModalVisible(!editModalVisible); // Cierra el modal después de editar
    };

    const handleBack = () => {
        navigation.replace('Catalogos');
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
            <Text style={styles.nombreNegocio}>{nameNegocio}</Text>
            </View>
            <View style={styles.container2}>
                <Pressable
                    style={[styles.button, styles.buttonAzul]}
                    onPress={handleBack}
                >
                    <Text style={styles.textStyle}>Regrsear</Text>
                </Pressable>
            </View>
            <View style={styles.container3}>
                <Text style={styles.headerTitulo}>{Comun.nombreCatalogo[100]}</Text>
                <View style={styles.container4}>
                    <Pressable
                        style={[styles.button, styles.buttonAzul]}
                        onPress={() => handleAction(Comun.accion.Agregar)}>
                        <Text style={styles.textStyle}>Agregar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonAzul]}
                        onPress={() => setStatusFilter(statusFilter === 'null' ? 'baja' : 'null')}
                    >
                        <Text style={styles.textStyle}>{statusFilter === 'null' ? 'Bajas' : 'Vigentes'}</Text>
                    </Pressable>
                </View>
                <View style={styles.table}>
                    <View style={styles.containerSearch}>
                        <TextInput
                            style={styles.inputSearch}
                            placeholder="Buscar..."
                            onChangeText={(text) => setSearchTerm(text)}
                            value={searchTerm}
                        />
                    </View>
                    <View style={styles.Encabezados}>
                        <Text style={styles.Titulo}>NOMBRE</Text>
                        <Text style={styles.Titulo}>GIRO</Text>
                        <Text style={styles.TituloAcciones}>ACCIONES</Text>
                    </View>
                    <ScrollView>
                        {data.filter((val) => {
                            if (searchTerm === '') {
                                return val;
                            } else if (val.Nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        })
                            .filter((val) => statusFilter === 'null' ? val.status === 'null' : val.status !== 'null')
                            .slice((page - 1) * pageSize, page * pageSize)
                            .map((item, index) => (
                                <View key={index} style={styles.Contenido}>
                                    <Text style={styles.cell}>{item.Nombre}</Text>
                                    <Text style={styles.cell}>{item.Giro}</Text>
                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity
                                            onPress={() => handleAction(Comun.accion.Editar, item.cod_negocio)}
                                        >
                                            <Icon name="eye-outline" size={25} color="black" />
                                        </TouchableOpacity>
                                        {statusFilter === 'baja' ? (
                                            <TouchableOpacity
                                                onPress={() => handleAction(Comun.accion.Alta)}
                                            >
                                                <Icon name="checkmark-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => handleAction(Comun.accion.Baja)} disabled={statusFilter === 'baja'}>
                                                <Icon name="trash-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            ))}
                    </ScrollView>
                    <View style={styles.pagination}>
                        <TouchableOpacity onPress={handlePrevious}>
                            <Text style={styles.buttonPrevuis}>Previous</Text>
                        </TouchableOpacity>
                        <Text style={styles.pageCounter}>{page}</Text>
                        <TouchableOpacity onPress={handleNext}>
                            <Text style={styles.buttonNext}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={editModalVisible}
                onRequestClose={() => {
                    setEditModalVisible(!editModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titleModal}>Modificar {Comun.nombreCatalogo[100]}</Text>
                        <ScrollView>
                            <FormNegocios onSubmit={handleSubmit} action={accion} initialValues={{ ...selectedValues, cod_negocio: selected }} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}*/