/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 26 de abril de 2024 - 16 hrs
 Descripcion: Contiene el formulario de los negocios
*/

import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from "../../Styles/Styles";

import { Formik } from 'formik';
import * as Yup from 'yup';

export default function formMovimientos({ initialValues, onSubmit, action }) {

    // Hook para la navegación
    const navigation = useNavigation();

    //aqui manejamos las validaciones
    const validaciones = Yup.object({
        DESCRIPCION: Yup.string().required('Este campo es obligatorio'),
        SIGNO: Yup.string().required('Este campo es obligatorio'),
    });

    const handleButtonPress = (values, event) => {
        console.log(action);
        if (action === 13 && Object.values(values).some(value => value === '')) {
            // Mostrar una alerta indicando que los campos son obligatorios
            Alert.alert(
                'Error',
                'Por favor completa todos los campos antes de agregar el movimiento.',
                [
                    { text: 'OK', onPress: () => console.log('Alerta cerrada') }
                ],
                { cancelable: false }
            );
        } else if (action === 13) {
            Alert.alert(
                'Confirmar',
                '¿Estás seguro de que deseas agregar este movimiento?',
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
                            navigation.navigate('SplashCatalogoMov', { accion: action });
                        },
                    },
                ],
                { cancelable: false }
            );
        } else if (action === 14) {
            Alert.alert(
                'Confirmar',
                '¿Estás seguro de que deseas editar este movimiento?',
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
                            navigation.navigate('SplashCatalogoMov', { accion: action });
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
                        <Text style={styles.titleInput}>Descripcion</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('DESCRIPCION')}
                            onBlur={formikProps.handleBlur('DESCRIPCION')}
                            placeholder="Descripcion del movimiento"
                            value={formikProps.values.DESCRIPCION}
                        />
                        {formikProps.touched.DESCRIPCION && formikProps.errors.DESCRIPCION &&
                            <Text style={styles.error}>{formikProps.errors.DESCRIPCION}</Text>
                        }

                        <Text style={styles.titleInput}>Signo</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('SIGNO')}
                            onBlur={formikProps.handleBlur('SIGNO')}
                            placeholder="Signo del movimiento"
                            value={formikProps.values.SIGNO}
                        />
                        {formikProps.touched.SIGNO && formikProps.errors.SIGNO &&
                            <Text style={styles.error}>{formikProps.errors.SIGNO}</Text>
                        }

                        <View style={styles.container4}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonRojo]}
                                onPress={() => navigation.replace('HomeCatalogoMov')}
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
    );
}
