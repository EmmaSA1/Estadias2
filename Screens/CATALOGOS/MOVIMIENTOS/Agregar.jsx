import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { styles } from '../../../Styles/Styles';
import * as Comun from '../../../Config/Comun';
import FormMovimientos from '../../../Config/Formularios/formMovimientos';
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

            const response = await fetch(`${url}/Movimientos/insertarMovimiento.php`, {
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
                console.log('Error al insertar el movimiento:', result.message);
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error('Error al insertar movimiento:', error);
            Alert.alert('Error', 'Hubo un problema al insertar el movimiento.');
        }
    };

    const initialValues = {
        DESCRIPCION: '',
        SIGNO: '',
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.nombre}</Text>
            </View>
            <Text style={styles.headerTitulo}>Agregar {Comun.nombreCatalogo[102]}</Text>
            <View style={styles.tableChica}>
                <ScrollView>
                    <FormMovimientos onSubmit={handleSubmit} action={accion} initialValues={initialValues} />
                </ScrollView>
            </View>
        </View>
    );
}
