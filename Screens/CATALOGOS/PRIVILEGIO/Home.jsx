/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK y EMMANUEL SANTOS APAEZ
 11 de mayo de 2024 - 14 hrs
 Descripcion: Contiene las La vista principal del catalogo
*/

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormPrivilegios from '../../../Config/formPrivilegios';

//Declaramos los valores iniciales del formulario 
const initialSelected = {
    Nombre: ''
};

export default function Home() {
    // Hook para la navegación
    const navigation = useNavigation();
    const route = useRoute();

    // Hook para el modal de edición  
    const [editModalVisible, setEditModalVisible] = useState(false);
    // Hook para marcar el negocio seleccionado
    const [selected, setSelected] = useState(null);
    // Hook para la barra de busqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para la acción actual
    const [accion, setAccion] = useState('');
    // Hook para la paginación
    const [page, setPage] = useState(1);
    const pageSize = 10;
    // Agregar estado para los valores del negocio seleccionado
    const [selectedValues, setSelectedValues] = useState(initialSelected);
    // Hook para el filtro por status
    const [statusFilter, setStatusFilter] = useState('null');

        // Actualizar el nombre del negocio seleccionado al cargar la pantalla
        useEffect(() => {
            if (route.params?.selectedOption) {
                nombre.setNombreNegocio(route.params.selectedOption);
            }
        }, [route.params?.selectedOption]);

    // Función para cambiar la acción cuando se presiona un botón
    const handleAction = (accion, cod_privilegio) => {
        setSelected(cod_privilegio);
        setAccion(accion);
        console.log(accion);

        switch (accion) {
            case 13:
                console.log("Agregar nuevo negocio");
                navigation.replace('AgregarCatalogoPriv', { accion: accion });
                break;
            case 10:
                console.log("Consultar negocio");
                break;
            case 11:
                console.log("Dar de alta negocio");
                quitarBaja(accion);
                break;
            case 12:
                console.log("Dar de baja negocio");
                ponerBaja(accion);
                break;
            case 14:
                console.log("Editar negocio");
                openEditModal(cod_privilegio);
                break;
            case 15:
                console.log("GrupPriv");
                navigation.replace('GrupPrivCatalogoPriv');
                break;
            default:
                console.log("Acción no reconocida");
        }
    };

    //aqui van los datos se sustituira por la consulta a la base de datos
    const [data, setData] = useState([
        { cod_privilegio: '01', Nombre: 'Perfumes Ian', status: 'null' },
        { cod_privilegio: '02', Nombre: 'Soluciones T.I', status: 'null' },
        { cod_privilegio: '03', Nombre: 'prueba1', status: 'null' },
        { cod_privilegio: '04', Nombre: 'Soluciones T.I', status: 'null' },
        { cod_privilegio: '05', Nombre: 'prueba1', status: 'null' },
        { cod_privilegio: '06', Nombre: 'Soluciones T.I', status: 'null' },
        { cod_privilegio: '07', Nombre: 'prueba1', status: 'null' },
        { cod_privilegio: '08', Nombre: 'Estampa', status: '2004-04-12' },
        { cod_privilegio: '09', Nombre: 'Roca', status: '2005-04-12' },
        { cod_privilegio: '10', Nombre: 'Adios', status: '2006-04-12' },
        { cod_privilegio: '11', Nombre: 'Adios', status: '2007-04-12' },
    ]);


     //función para abrir el modal de edición y mostrar los datos del negocio
     const openEditModal = (cod_privilegio) => {
        const datos = data.find(item => item.cod_privilegio === cod_privilegio);
        setSelectedValues(datos); // Actualizar selectedValues con todos los datos del privilegio seleccionado
        setSelected(datos);
        setEditModalVisible(true);
        console.log(datos);
    };


     // Función para editar los datos del negocio
     const handleEdit = (values) => {
        // Encuentra el índice del negocio seleccionado
        const index = data.findIndex(item => item.cod_privilegio === selected.cod_privilegio);
        // Crea una copia de los datos existentes
        const newData = [...data];
        // Actualiza los datos del negocio seleccionado
        newData[index] = { ...newData[index], ...values };
        // Actualiza los datos
        setData(newData);

        console.log("Datos editados:", newData[index]);
    };


      //funcion para poner baja
      const ponerBaja = () => {
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
                    onPress: () => { navigation.navigate('SplashCatalogoPriv', { accion: Comun.accion.Baja }) }
                }
            ]
        );
    };


    //funcion para quitar baja
    const quitarBaja = () => {
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
                    onPress: () => { navigation.navigate('SplashCatalogoPriv', { accion: Comun.accion.Alta }) }
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


    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.nombre}</Text>
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
                <Text style={styles.headerTitulo}>{Comun.nombreCatalogo[101]}</Text>
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
                    <Pressable
                        style={[styles.button, styles.buttonAzul]}
                        onPress={() => handleAction(Comun.accion.GrupPriv)}>
                        <Text style={styles.textStyle}>Grupo-Priv</Text>
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
                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity onPress={() => handleAction(Comun.accion.Editar, item.cod_privilegio)}>
                                            <Icon name="eye-outline" size={25} color="black" />
                                        </TouchableOpacity>
                                        {statusFilter === 'baja' ? (
                                            <TouchableOpacity onPress={() => handleAction(Comun.accion.Alta)}>
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
                    setEditModalVisible(false);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titleModal}>Modificar {Comun.nombreCatalogo[101]}</Text>
                        <ScrollView>
                            <Text style={styles.titleInput}>Código del privilegio</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Código privilegio"
                                value={selected ? selected.cod_privilegio : ''}
                            />
                            <FormPrivilegios onSubmit={handleSubmit} action={accion} initialValues={selectedValues} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View >
    );
}
