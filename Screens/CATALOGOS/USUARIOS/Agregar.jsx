/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 25 de abril de 2024 - 16 hrs
 Descripcion: Contiene la pantalla de agregar un negocio
*/

import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { styles } from '../../../Styles/Styles';
import * as Comun from '../../../Config/Comun';
import FormProductos from '../../../Config/Formularios/formUsuarios';
import { Backend } from "../../../Config/Conexion/backendConfig";

export default function Agregar({ route }) {
    const { accion } = route.params;
    const { url } = Backend();

    const handleSubmit = async (data) => {
        try{
            const response = await fetch(`${url}/Usuarios/insertarUsuario.php`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.success) {
                console.log('Datos del usuario:', data);
            } else {
                console.log('Error', result.message);
            }
        }catch(error){
            console.error('Error al insertar usuario:', error);
            Alert.alert('Error', 'Hubo un problema al insertar el usuario.');
        }
    };

    const initialValues = {
        NOMBRE: '',
        APELLIDO_P: '',
        APELLIDO_M: '',
        CELULAR: '',
        E_MAIL: '',
        DIRECCION: ''
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.nombreNegocio}>{Comun.nombreNegocio.nombre}</Text>
            </View>
            <Text style={styles.headerTitulo}>Agregar {Comun.nombreCatalogo[105]}</Text>
            <View style={styles.container6}>
                <ScrollView>
                    <FormNegocios onSubmit={handleSubmit} action={accion} initialValues={initialValues} />
                </ScrollView>
            </View>
        </View>
    );
}
