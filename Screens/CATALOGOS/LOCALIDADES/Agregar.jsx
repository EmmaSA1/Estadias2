/*
  EMMANUEL SANTOS APAEZ
 21 de mayo de 2024 - 14 hrs
 Descripcion: Contiene la pantalla de agregar localidad
*/

//importaciones que se utilizan para todo
import React from 'react';
import { View, Text, ScrollView, Alert } from "react-native";

import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormLocalidades from '../../../Config/Formularios/formLocalidades';
import { Backend } from "../../../Config/Conexion/backendConfig";

export default function Agregar({ route }) {
    const { accion } = route.params;
    const { url } = Backend();

    const handleSubmit = async (data) => {
        try {
            // Enviar solicitud POST para agregar la localidad
            const response = await fetch(`${url}/Localidades/altaLocalidad.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            // Convertir la respuesta en JSON
            const result = await response.json();
            // Verificar si la operación fue exitosa
            if (response.ok && result.success) {
                console.log('Datos de la localidad:', data);
                Alert.alert('Éxito', 'Localidad agregada correctamente.');
            } else {
                console.error('Error:', result.message);
                Alert.alert('Error', result.message || 'Hubo un problema al agregar la localidad.');
            }
        } catch (error) {
            // Manejar cualquier error que ocurra durante la solicitud
            console.error('Error al agregar localidad:', error);
            Alert.alert('Error', 'Hubo un problema al agregar la localidad.');
        }
    };

    const initialValues = { LOCALIDAD: '', ESTADOS: '' };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.Soluciones}</Text>
            </View>
            <Text style={styles.headerTitulo}>Agregar {Comun.nombreCatalogo[103]}</Text>
            <View style={styles.tableChica}>
                <ScrollView>
                    <FormLocalidades onSubmit={handleSubmit} action={accion} initialValues={initialValues} />
                </ScrollView>
            </View>
        </View>
    );
}
