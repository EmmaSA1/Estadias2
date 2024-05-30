/*
  EMMANUEL SANTOS APAEZ
 21 de mayo de 2024 - 14 hrs
 Descripcion: Contiene la pantalla principal de localidad 
*/


import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormLocalidades from '../../../Config/Formularios/formLocalidades';
import { Backend } from "../../../Config/Conexion/backendConfig";


// Declaramos los valores iniciales del formulario 
const initialSelected = {
    LOCALIDAD: '',
    ESTADOS: ''
};

export default function Home() {
    const { url } = Backend();
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
    const [statusFilter, setstatusFilter] = useState('null');
    //aqui van los datos de la base de datos
    const [data, setData] = useState([]);


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
                quitarBaja(COD_LOCALIDAD);
                break;
            case 12:
                console.log("Dar de baja negocio");
                ponerBaja(COD_LOCALIDAD);
                break;
            case 14:
                console.log("Editar negocio");
                openEditModal(COD_LOCALIDAD);
                break;
            
            default:
                console.log("Acción no reconocida");
        }
    };


    
    useEffect(() => {
        const Cod_Negocio= Comun.CodigoNegocio.codigo; 
        fetch(`${url}/Localidades/regresaTodasLocalidades.php?Cod_Negocio=${Cod_Negocio}&estatus=${statusFilter === 'null' ? 'VIGENTES' : 'NO VIGENTES'}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las localidades');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error al obtener localidades:', error);
            });
    }, [statusFilter]);
    

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

    const ponerBaja = (cod_negocio, cod_localidad) => {
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
                        fetch(`${url}/Localidades/bajaLocalidad.php`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ cod_negocio, cod_localidad })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    navigation.replace('SplashCatalogoLoc', { accion: Comun.accion.Baja });
                                } else {
                                    Alert.alert("Error", data.message || "Error al dar de baja la localidad.");
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                Alert.alert("Error", "Ocurrió un error al realizar la operación.");
                            });
                    }
                }
            ]
        );
    };
    
    // Función para quitar baja
    const quitarBaja = (cod_negocio, cod_localidad) => {
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
                        fetch(`${url}/Localidades/activaLocalidad.php`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ cod_negocio, cod_localidad })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    navigation.replace('SplashCatalogoLoc', { accion: Comun.accion.Alta });
                                } else {
                                    Alert.alert("Error", data.message || "Error al activar la localidad.");
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                Alert.alert("Error", "Ocurrió un error al realizar la operación.");
                            });
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
                        onPress={() => setstatusFilter(statusFilter === 'null' ? 'baja' : 'null')}
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
                            .filter((val) => statusFilter === 'null' ? val.FECHA_BAJA === 'null' : val.FECHA_BAJA !== 'null')
                            .slice((page - 1) * pageSize, page * pageSize)
                            .map((item, index) => (
                                <View key={index} style={styles.Contenido}>
                                    <Text style={styles.cell}>{item.LOCALIDAD}</Text>
                                    <Text style={styles.cell}>{item.ESTADOS}</Text>
                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity onPress={() => handleAction(Comun.accion.Editar, item.COD_LOCALIDAD)}>
                                            <Icon name="eye-outline" size={25} color="black" />
                                        </TouchableOpacity>
                                        {statusFilter === 'baja' ? (
                                            <TouchableOpacity onPress={() => handleAction(Comun.accion.Alta,  item.COD_LOCALIDAD)}>
                                                <Icon name="checkmark-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => handleAction(Comun.accion.Baja,  item.COD_LOCALIDAD)} disabled={statusFilter === 'baja'}>
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
