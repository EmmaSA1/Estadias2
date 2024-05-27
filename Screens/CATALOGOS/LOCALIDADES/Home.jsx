import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormLocalidades from '../../../Config/formLocalidades';

// Declaramos los valores iniciales del formulario 
const initialSelected = {
    LOCALIDAD: '',
    ESTADOS: ''
};

export default function Home() {
    // Hook para la navegación
    const navigation = useNavigation();

    // Hook para el modal de edición  
    const [editModalVisible, setEditModalVisible] = useState(false);
    // Hook para marcar el negocio seleccionado
    const [selected, setSelected] = useState(null);
    // Hook para la barra de búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para la acción actual
    const [accion, setAccion] = useState('');
    // Hook para la paginación
    const [page, setPage] = useState(1);
    const pageSize = 10;
    // Agregar estado para los valores del negocio seleccionado
    const [selectedValues, setSelectedValues] = useState(initialSelected);
    // Hook para el filtro por FECHA_BAJA
    const [FECHA_BAJAFilter, setFECHA_BAJAFilter] = useState('null');

   

    // Función para cambiar la acción cuando se presiona un botón
    const handleAction = (accion, COD_LOCALIDAD) => {
        setSelected(COD_LOCALIDAD);
        setAccion(accion);
        console.log(accion);

        switch (accion) {
            case 13:
                console.log("Agregar nuevo negocio");
                navigation.replace('AgregarCatalogoLoc', { accion: accion });
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
                openEditModal(COD_LOCALIDAD);
                break;
            
            default:
                console.log("Acción no reconocida");
        }
    };

    // Aquí van los datos, se sustituirá por la consulta a la base de datos
    const [data, setData] = useState([
        { COD_LOCALIDAD: '01', LOCALIDAD: 'Xochitepec', ESTADOS: 'Morelos',FECHA_BAJA: null },
        { COD_LOCALIDAD: '02', LOCALIDAD: 'Tezoyuca', ESTADOS: 'Morelos', FECHA_BAJA: null },
        { COD_LOCALIDAD: '03', LOCALIDAD: 'Cuernavaca', ESTADOS: 'Morelos', FECHA_BAJA: null },
        { COD_LOCALIDAD: '04', LOCALIDAD: 'Temixco', ESTADOS: 'Morelos', FECHA_BAJA: null },
        { COD_LOCALIDAD: '05', LOCALIDAD: 'Cuernavaca', ESTADOS: 'Morelos', FECHA_BAJA: null },
        { COD_LOCALIDAD: '06', LOCALIDAD: 'Puente', ESTADOS: 'Morelos', FECHA_BAJA: null },
        { COD_LOCALIDAD: '07', LOCALIDAD: 'Zapata', ESTADOS: 'Morelos', FECHA_BAJA: null },
        { COD_LOCALIDAD: '08', LOCALIDAD: 'Xochimilco', ESTADOS: 'Morelos', FECHA_BAJA: null },
        { COD_LOCALIDAD: '09', LOCALIDAD: 'Buenos ', ESTADOS: 'Morelos', FECHA_BAJA: null },
        { COD_LOCALIDAD: '10', LOCALIDAD: 'Xochitepec', ESTADOS: 'Morelos',FECHA_BAJA: null },
        { COD_LOCALIDAD: '11', LOCALIDAD: 'Xochitepec', ESTADOS: 'Morelos',FECHA_BAJA: null },
    ]);

    // Función para abrir el modal de edición y mostrar los datos del negocio
    const openEditModal = (COD_LOCALIDAD) => {
        const datos = data.find(item => item.COD_LOCALIDAD === COD_LOCALIDAD);
        setSelectedValues(datos); // Actualizar selectedValues con todos los datos del negocio seleccionado
        setSelected(datos);
        setEditModalVisible(true);
        console.log(datos);
    };

    // Función para editar los datos de la localidad
    const handleEdit = (values) => {
        // Encuentra el índice del negocio seleccionado
        const index = data.findIndex(item => item.COD_LOCALIDAD === selected.COD_LOCALIDAD);
        // Crea una copia de los datos existentes
        const newData = [...data];
        // Actualiza los datos del negocio seleccionado
        newData[index] = { ...newData[index], ...values };
        // Actualiza los datos
        setData(newData);

        // Verifica que el índice sea válido y que el estado exista
        if (index !== -1 && newData[index].ESTADOS) {  // Cambié 'estado' por 'ESTADOS'
            // Muestra el código y el estado en la consola
            console.log("Datos editados:", { 
                COD_LOCALIDAD: newData[index].COD_LOCALIDAD, 
                estado: newData[index].ESTADOS  // Cambié 'estado' por 'ESTADOS'
            });
        } else {
            console.log("No se encontró el negocio seleccionado o no tiene un estado asignado.");
        }
    };

    // Función para poner baja
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
                    onPress: () => { navigation.navigate('SplashCatalogoLoc', { accion: Comun.accion.Baja }) }
                }
            ]
        );
    };

    // Función para quitar baja
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
                    onPress: () => { navigation.navigate('SplashCatalogoLoc', { accion: Comun.accion.Alta }) }
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

    // Función para mostrar la página anterior
    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    // Función para mostrar la siguiente página
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
                    <Text style={styles.textStyle}>Regresar</Text>
                </Pressable>
            </View>
            <View style={styles.container3}>
                <Text style={styles.headerTitulo}>{Comun.nombreCatalogo[103]}</Text>
                <View style={styles.container4}>
                    <Pressable
                        style={[styles.button, styles.buttonAzul]}
                        onPress={() => handleAction(Comun.accion.Agregar)}>
                        <Text style={styles.textStyle}>Agregar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonAzul]}
                        onPress={() => setFECHA_BAJAFilter(FECHA_BAJAFilter === 'null' ? 'baja' : 'null')}
                    >
                        <Text style={styles.textStyle}>{FECHA_BAJAFilter === 'null' ? 'Bajas' : 'Vigentes'}</Text>
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
                        <Text style={styles.Titulo}>Localidad</Text>
                        <Text style={styles.Titulo}>  Estados</Text>
                        <Text style={styles.TituloAcciones}>ACCIONES</Text>
                    </View>

                    <ScrollView>
                        {data.filter((val) => {
                            if (searchTerm === '') {
                                return val;
                            } else if (val.LOCALIDAD.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            } else if (val.ESTADOS.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        })
                            .filter((val) => FECHA_BAJAFilter === 'null' ? val.FECHA_BAJA === 'null' : val.FECHA_BAJA !== 'null')
                            .slice((page - 1) * pageSize, page * pageSize)
                            .map((item, index) => (
                                <View key={index} style={styles.Contenido}>
                                    <Text style={styles.cell}>{item.LOCALIDAD}</Text>
                                    <Text style={styles.cell}>{item.ESTADOS}</Text>
                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity onPress={() => handleAction(Comun.accion.Editar, item.COD_LOCALIDAD)}>
                                            <Icon name="eye-outline" size={25} color="black" />
                                        </TouchableOpacity>
                                        {FECHA_BAJAFilter === 'baja' ? (
                                            <TouchableOpacity onPress={() => handleAction(Comun.accion.Alta)}>
                                                <Icon name="checkmark-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => handleAction(Comun.accion.Baja)} disabled={FECHA_BAJAFilter === 'baja'}>
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
                        <Text style={styles.titleModal}>Modificar {Comun.nombreCatalogo[103]}</Text>
                        <ScrollView>
                            <Text style={styles.titleInput}>Código de localidad</Text>
                            <TextInput
                                style={styles.inputCodPriv}
                                placeholder="Código privilegio"
                                value={selected ? selected.COD_LOCALIDAD : ''}
                                editable={false}
                            />
                            <FormLocalidades onSubmit={handleSubmit} action={accion} initialValues={selectedValues} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
