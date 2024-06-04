/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 16 de mayo de 2024 - 17 hrs
 Descripcion: Contiene las La vista principal del catalogo Movimientos
*/

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormMovimientos from '../../../Config/Formularios/formMovimientos';
//importacion para conectar con los servicios
import { Backend } from "../../../Config/Conexion/backendConfig";

//Declaramos los valores iniciales del formulario 
const initialSelected = {
    DESCRIPCION: '',
    SIGNO: '',
};

export default function Home() {
    const { url } = Backend();
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
    //aqui van los datos de la base de datos
    const [data, setData] = useState([]);

    // Función para cambiar la acción cuando se presiona un botón
    const handleAction = (accion, COD_MOVIMIENTO) => {
        setSelected(COD_MOVIMIENTO);
        setAccion(accion);
        console.log(accion);

        switch (accion) {
            case 13:
                console.log("Agregar nuevo movimiento");
                navigation.replace('AgregarCatalogoMov', { accion: accion });
                break;
            case 10:
                console.log("Consultar movimiento");
                break;
            case 11:
                console.log("Dar de alta movimiento");
                QuitarBaja(COD_MOVIMIENTO);
                break;
            case 12:
                console.log("Dar de baja movimiento");
                PonerBaja(COD_MOVIMIENTO);
                break;
            case 14:
                console.log("Editar movimiento");
                openEditModal(COD_MOVIMIENTO);
                break;
            default:
                console.log("Acción no reconocida");
        }
    };

    const codNegocio = Comun.CodigoNegocio.codigo;
    useEffect(() => {
        fetch(`${url}/Movimientos/regresarMovimientos.php?COD_NEGOCIO=${codNegocio}&estatus=${statusFilter === 'null' ? 'VIGENTES' : 'NO VIGENTES'}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los movimientos');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    setData(data.movimientos);
                } else {
                    Alert.alert('Error', data.message);
                }
            })
            .catch(error => {
                console.error('Error al obtener movimientos:', error);
                Alert.alert('Error', 'Hubo un problema al obtener los movimientos.');
            });
    }, [statusFilter, codNegocio]);

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
    const openEditModal = (COD_MOVIMIENTO) => {
        const datos = data.find(item => item.COD_MOVIMIENTO === COD_MOVIMIENTO);
        setSelectedValues(datos); // Actualizar selectedValues con los datos del negocio seleccionado
        setSelected(datos);
        setEditModalVisible(true);
        console.log(datos);
    }

    // Función para editar los datos del negocio
    const handleEdit = async(values) => {
        // Encuentra el índice del negocio seleccionado
        const index = data.findIndex(item => item.COD_MOVIMIENTO === selected.COD_MOVIMIENTO);
        // Crea una copia de los datos existentes
        const newData = [...data];
        // Actualiza los datos del negocio seleccionado
        newData[index] = { ...newData[index], ...values };
        // Actualiza los datos
        setData(newData);

        try{
            const response = await fetch(`${url}/Movimientos/editarMovimiento.php`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData[index]),
            });
            const result = await response.json();
            if(result.success){
                console.log("Datos editados:", newData[index]);
            } else {
                Alert.alert('Error', result.message);
            }
            } catch (error) {
                console.error('Error al editar el movimiento:', error);
                Alert.alert('Error', 'Hubo un problema al editar el movimiento.');
        }
    };

    const PonerBaja = (COD_MOVIMIENTO) => {
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
                        fetch(`${url}/Movimientos/bajaMovimiento.php`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                COD_NEGOCIO: codNegocio,
                                COD_MOVIMIENTO,
                             })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    navigation.replace('SplashCatalogoMov', { accion: Comun.accion.Baja });
                                } else {
                                    Alert.alert("Error", data.message || "Error al dar de baja el movimiento.");
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

    const QuitarBaja = (COD_MOVIMIENTO) => {
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
                        fetch(`${url}/Movimientos/altaMovimiento.php`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                COD_NEGOCIO: codNegocio,
                                COD_MOVIMIENTO,
                             })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    navigation.replace('SplashCatalogoMov', { accion: Comun.accion.Alta });
                                } else {
                                    Alert.alert("Error", data.message || "Error al dar de alta el movimiento.");
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
                    <Text style={styles.textStyle}>Regrsear</Text>
                </Pressable>
            </View>
            <View style={styles.container3}>
                <Text style={styles.headerTitulo}>{Comun.nombreCatalogo[102]}</Text>
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
                        <Text style={styles.Titulo}>DESCRIPCION</Text>
                        <Text style={styles.Titulo}>SIGNO</Text>
                        <Text style={styles.TituloAcciones}>ACCIONES</Text>
                    </View>
                    <ScrollView>
                        {data.filter((val) => {
                            if (searchTerm === '') {
                                return val;
                            } else if (val.NOMBRE.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        })
                            .filter((val) => statusFilter === 'null' ? val.FECHA_BAJA === null : val.FECHA_BAJA !== null)
                            .slice((page - 1) * pageSize, page * pageSize)
                            .map((item, index) => (
                                <View key={index} style={styles.Contenido}>
                                    <Text style={styles.cell}>{item.DESCRIPCION}</Text>
                                    <Text style={styles.cell}>{item.SIGNO}</Text>
                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity
                                            onPress={() => handleAction(Comun.accion.Editar, item.COD_MOVIMIENTO)}
                                        >
                                            <Icon name="eye-outline" size={25} color="black" />
                                        </TouchableOpacity>
                                        {statusFilter === 'baja' ? (
                                            <TouchableOpacity
                                                onPress={() => handleAction(Comun.accion.Alta, item.COD_MOVIMIENTO)}
                                            >
                                                <Icon name="checkmark-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => handleAction(Comun.accion.Baja, item.COD_MOVIMIENTO)} disabled={statusFilter === 'baja'}>
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
                        <Text style={styles.titleModal}>Modificar {Comun.nombreCatalogo[102]}</Text>
                        <ScrollView>
                            <FormMovimientos onSubmit={handleSubmit} action={accion} initialValues={{ ...selectedValues }} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
