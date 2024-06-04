import React from 'react';
import { View, Text, ScrollView } from "react-native";

import { styles } from "../../../Styles/Styles";
import * as Comun from '../../../Config/Comun';
import FormPrivilegios from '../../../Config/Formularios/formLocalidades';
import { Backend } from "../../../Config/Conexion/backendConfig";

export default function Agregar({ route }) {
    const { accion } = route.params;
    const { url } = Backend();

    const COD_NEGOCIO = Comun.CodigoNegocio.codigo;

    const handleSubmit = async (data) => {
        try {
            const body = {
                ...data,
                COD_NEGOCIO: COD_NEGOCIO,
            };

            const response = await fetch(`${url}/Localidades/insertarLocalidad.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            if (result.success) {
                console.log(body);
            } else {
                console.log('Error al insertar la localidad:', result.message);
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error('Error al insertar localidad:', error);
            Alert.alert('Error', 'Hubo un problema al insertar la localidad.');
        }
    };

    const initialValues = { LOCALIDAD: '', ESTADOS: '' };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.nombre}</Text>
            </View>
            <Text style={styles.headerTitulo}>Agregar {Comun.nombreCatalogo[103]}</Text>
            <View style={styles.tableChica}>
                <ScrollView>
                    <FormPrivilegios onSubmit={handleSubmit} action={accion} initialValues={initialValues} />
                </ScrollView>
            </View>
        </View>
    );
}