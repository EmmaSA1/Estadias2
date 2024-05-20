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
import FormPrivilegios from '../../../Config/formLocalidades';


export default function Agregar({ route }) {
    const { accion } = route.params;

    const handleSubmit = (data) => {
        console.log('Datos del negocio:', data);
    };

    const initialValues = { Nombre: '' };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.Soluciones}</Text>
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
