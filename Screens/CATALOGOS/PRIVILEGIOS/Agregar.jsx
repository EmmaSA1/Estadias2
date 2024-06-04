/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK Y EMMANUEL SANTOS APAEZ
 11 de mayo de 2024 - 14 hrs
 Descripcion: Contiene la pantalla de agregar un privilegio
*/

//importaciones que se utilizan para todo
import React, { useState } from 'react';
import { View, Text, ScrollView } from "react-native";

import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormPrivilegios from '../../../Config/Formularios/formPrivilegios';
import { Backend } from "../../../Config/Conexion/backendConfig";

export default function Agregar({ route }) {
    const { accion } = route.params;
    const { url } = Backend();

    const handleSubmit = async (data) => {
        try{
            console.log(data);
            const response = await fetch(`${url}/Privilegios/insertarPrivilegio.php`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.success) {
                console.log('Datos del privilegio:', data);
            } else {
                console.log('Error', result.message);
            }
        }catch(error){
            console.error('Error al insertar privilegio:', error);
            Alert.alert('Error', 'Hubo un problema al insertar el privilegio.');
        }
    };

    const initialValues = { DESCRIPCION_PRIVILEGIO: '' };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.nombre}</Text>
            </View>
            <Text style={styles.headerTitulo}>Agregar {Comun.nombreCatalogo[101]}</Text>
            <View style={styles.tableChica}>
                <ScrollView>
                    <FormPrivilegios onSubmit={handleSubmit} action={accion} initialValues={initialValues} />
                </ScrollView>
            </View>
        </View>
    );
}
