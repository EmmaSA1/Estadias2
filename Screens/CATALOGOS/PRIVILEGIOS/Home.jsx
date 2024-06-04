/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK y EMMANUEL SANTOS APAEZ
 11 de mayo de 2024 - 14 hrs
 Descripcion: Contiene las La vista principal del catalogo
*/

import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Alert, Modal, Pressable, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormPrivilegios from '../../../Config/Formularios/formPrivilegios';
import { Backend } from "../../../Config/Conexion/backendConfig";

//Declaramos los valores iniciales del formulario 
const initialSelected = {
    DESCRIPCION_PRIVILEGIO: ''
};

export default function Home() {
    const { url } = Backend();
    // Hook para la navegación
    const navigation = useNavigation();
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
    const pageSize = Comun.CantidadMaximaMostrada;
    // Agregar estado para los valores del negocio seleccionado
    const [selectedValues, setSelectedValues] = useState(initialSelected);
    // Hook para el filtro por status
    const [statusFilter, setStatusFilter] = useState('null');
    //aqui van los datos se sustituira por la consulta a la base de datos
    const [data, setData] = useState([]);

    // Función para cambiar la acción cuando se presiona un botón
    const handleAction = (accion, COD_PRIVILEGIO) => {
        setSelected(COD_PRIVILEGIO);
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
                quitarBaja(COD_PRIVILEGIO);
                break;
            case 12:
                console.log("Dar de baja negocio");
                ponerBaja(COD_PRIVILEGIO);
                break;
            case 14:
                console.log("Editar negocio");
                openEditModal(COD_PRIVILEGIO);
                break;
            case 15:
                console.log("GrupPriv");
                navigation.replace('GrupPrivCatalogoPriv');
                break;
            default:
                console.log("Acción no reconocida");
        }
    };

    // const negocioPriv = Comun.CodigoNegocio.codigo;
    useEffect(() => {
        fetch(`${url}/Privilegios/regresarPrivilegios.php?estado=${statusFilter === 'null' ? 'VIGENTES' : 'NO VIGENTES'}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los privilegios');
                }
                return response.text();
            })
            .then(text => {
                const data = JSON.parse(text);
                setData(data);
            })
            .catch(error => {
                console.error('Error al obtener privilegios:', error);
                Alert.alert('Error', 'Hubo un problema al obtener los privilegios.');
            });
    }, [statusFilter]);

    

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

    //función para abrir el modal de edición y mostrar los datos del negocio
    const openEditModal = (COD_PRIVILEGIO) => {
        const datos = data.find(item => item.COD_PRIVILEGIO === COD_PRIVILEGIO);
        setSelectedValues(datos); // Actualizar selectedValues con todos los datos del privilegio seleccionado
        setSelected(datos);
        setEditModalVisible(true);
        console.log(datos);
    };

    // Función para editar los datos del negocio
    const handleEdit = async (values) => {
        // Encuentra el índice del negocio seleccionado
        const index = data.findIndex(item => item.COD_PRIVILEGIO === selected.COD_PRIVILEGIO);
        // Crea una copia de los datos existentes
        const newData = [...data];
        // Actualiza los datos del negocio seleccionado
        newData[index] = { ...newData[index], ...values };
        // Actualiza los datos
        setData(newData);
        try {
            const response = await fetch(`${url}/Privilegios/editarPrivilegio.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData[index]),
            });
    
            const result = await response.json();
            if (result.success) {
                console.log("Datos editados:", newData[index]);
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error('Error al actualizar privilegio:', error);
            Alert.alert('Error', 'Hubo un problema al actualizar el privilegio.');
        }
        console.log("Datos editados:", newData[index]);
    };

    //funcion para poner baja
    const ponerBaja = (cod_privilegio) => {
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
                        fetch(`${url}/Privilegios/bajaPrivilegio.php`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ cod_privilegio })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    navigation.replace('SplashCatalogoPriv', { accion: Comun.accion.Baja });
                                } else {
                                    Alert.alert("Error", data.message || "Error al dar de baja el privilegio.");
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

    //funcion para quitar baja
    const quitarBaja = (cod_privilegio) => {
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
                        fetch(`${url}/Privilegios/altaPrivilegio.php`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ cod_privilegio })
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    navigation.replace('SplashCatalogoPriv', { accion: Comun.accion.Alta });
                                } else {
                                    Alert.alert("Error", data.message || "Error al dar de alta el privilegio.");
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
                            } else if (val.DESCRIPCION_PRIVILEGIO.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            }
                        })
                        .filter((val) => statusFilter === 'null' ? val.FECHA_BAJA === null : val.FECHA_BAJA !== null)
                            .slice((page - 1) * pageSize, page * pageSize)
                            .map((item, index) => (
                                <View key={index} style={styles.Contenido}>
                                    <Text style={styles.cell}>{item.DESCRIPCION_PRIVILEGIO}</Text>
                                    <View style={styles.iconContainer}>
                                        <TouchableOpacity
                                            onPress={() => handleAction(Comun.accion.Editar, item.COD_NEGOCIO)}
                                        >
                                            <Icon name="eye-outline" size={25} color="black" />
                                        </TouchableOpacity>
                                        {statusFilter === 'baja' ? (
                                            <TouchableOpacity onPress={() => handleAction(Comun.accion.Alta, item.COD_NEGOCIO)}>
                                                <Icon name="checkmark-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                        ) : (
                                            item.COD_NEGOCIO !== Comun.CodigoNegocio.codigo && (
                                                <TouchableOpacity onPress={() => handleAction(Comun.accion.Baja, item.COD_NEGOCIO)} disabled={statusFilter === 'baja'}>
                                                    <Icon name="trash-outline" size={25} color="black" />
                                                </TouchableOpacity>
                                            )
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
                                value={selected ? selected.COD_PRIVILEGIO : ''}
                            />
                            <FormPrivilegios onSubmit={handleSubmit} action={accion} initialValues={selectedValues} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View >
    );
}
