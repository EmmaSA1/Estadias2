/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK y EMMANUEL SANTOS APAEZ 
 11 de mayo de 2024 - 14 hrs
 Descripcion: Contiene el formulario de los privilegios
*/

import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from "../../Styles/Styles";

import { Formik } from 'formik';
import * as Yup from 'yup';

export default function formPrivilegios({ initialValues, onSubmit, action }) {

    // Hook para la navegación
    const navigation = useNavigation();

    //aqui manejamos las validaciones
    const validaciones = Yup.object({
        Nombre: Yup.string().required('Este campo es obligatorio'),
    });

    const handleButtonPress = (values, event) => {
        console.log(action);
        if (action === 13 && Object.values(values).some(value => value === '')) {
            // Mostrar una alerta indicando que los campos son obligatorios
            Alert.alert(
                'Error',
                'Por favor completa todos los campos antes de agregar el privilegio.',
                [
                    { text: 'OK', onPress: () => console.log('Alerta cerrada') }
                ],
                { cancelable: false }
            );
        } else if (action === 13) {
            Alert.alert(
                'Confirmar',
                '¿Estás seguro de que deseas agregar este negocio?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Agregar',
                        onPress: () => {
                            event.persist();
                            onSubmit(values);
                            navigation.navigate('SplashCatalogoPriv', { accion: action });
                        },
                    },
                ],
                { cancelable: false }
            );
        } else if (action === 14) {
            Alert.alert(
                'Confirmar',
                '¿Estás seguro de que deseas editar este negocio?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'Editar',
                        onPress: () => {
                            event.persist();
                            onSubmit(values);
                            navigation.navigate('SplashCatalogoPriv', { accion: action });
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };

    console.log("Valor de la acción:", action);

    return (
        <View style={styles.tableChica}>
            <Formik
                initialValues={initialValues}
                validationSchema={validaciones}
                onSubmit={(values) => handleButtonPress(values)}
            >
                {formikProps => (
                    <View>
                        <Text style={styles.titleInput}>Nombre del Privilegio</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('Nombre')}
                            onBlur={formikProps.handleBlur('Nombre')}
                            placeholder="Nombre del Privilegio"
                            value={formikProps.values.Nombre}
                        />
                        {formikProps.touched.Nombre && formikProps.errors.Nombre &&
                            <Text style={{ color: 'white' }}>{formikProps.errors.Nombre}</Text>
                        }

                        <View style={styles.container4}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonRojo]}
                                onPress={() => navigation.replace("HomeCatalogoPriv")}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonVerde]}
                                onPress={(event) => handleButtonPress(formikProps.values, event)}
                            >
                                <Text style={styles.textStyle}>{action === 13 ? 'Agregar' : 'Editar'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
}
