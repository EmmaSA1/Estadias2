/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 11 de mayo de 2024 - 14 hrs
 Descripcion: Contiene las La vista para asignar los grupos de privilegios
*/

//importaciones de los componetes a utilizar, y las librerias 
import React, { useState } from "react";
import { Text, View, Pressable, TouchableOpacity, Modal, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import ListPriv from "../../../Config/listPriv";

export default function GrupPriv() {
    // Hook para la navegación
    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);

    const handleBack = () => {
        navigation.replace('HomeCatalogoPriv');
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.Soluciones}</Text>
            </View>
            <View style={styles.container2}>
                <Pressable
                    style={[styles.button, styles.buttonAzul]}
                    onPress={() => handleBack()}
                >
                    <Text style={styles.textStyle}>Regrsear</Text>
                </Pressable>
            </View>
            <Text style={styles.headerTitulo}>Listado de Grupos</Text>
            <View style={styles.tableChica}>
                <View style={styles.listGrupPriv}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.textGrupPriv}>Administrador</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.listGrupPriv}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.textGrupPriv}>Super Usuario</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.listGrupPriv, styles.lastItem]}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.textGrupPriv}>Visitante</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titleModal}>Modificar {Comun.nombreCatalogo[101]}</Text>
                        <ScrollView>
                            <ListPriv />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}