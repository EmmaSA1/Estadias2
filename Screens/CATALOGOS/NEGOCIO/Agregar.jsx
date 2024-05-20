/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 25 de abril de 2024 - 16 hrs
 Descripcion: Contiene la pantalla de agregar un negocio
*/

import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import { styles } from '../../../Styles/Styles';
import * as Comun from '../../../Config/Comun';
import FormNegocios from '../../../Config/formNegocios';

export default function Agregar({ route }) {
    const { accion } = route.params;

    const handleSubmit = (data) => {
        console.log('Datos del negocio:', data);
    };

    const initialValues = {
        Nombre: '',
        Giro: '',
        Direccion: '',
        TelefonoOficina: '',
        TelefonoCelular: '',
        Email: '',
        Logotipo: ''
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.Soluciones}</Text>
            </View>
            <Text style={styles.headerTitulo}>Agregar {Comun.nombreCatalogo[100]}</Text>
            <View style={styles.container6}>
                <ScrollView>
                    <FormNegocios onSubmit={handleSubmit} action={accion} initialValues={initialValues} />
                </ScrollView>
            </View>
        </View>
    );
}
