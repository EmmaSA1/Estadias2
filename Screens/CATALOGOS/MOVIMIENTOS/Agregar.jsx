/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 25 de abril de 2024 - 16 hrs
 Descripcion: Contiene la pantalla de agregar un movimiento
*/

import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { styles } from '../../../Styles/Styles';
import * as Comun from '../../../Config/Comun';
import FormMovimientos from '../../../Config/Formularios/formMovimientos';

export default function Agregar({ route }) {
    const { accion } = route.params;

    const handleSubmit = (data) => {
        console.log('Datos del negocio:', data);
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
