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

const accion = {
    Consultar: 10,
    Alta: 11,
    Baja: 12,
    Agregar: 13,
    Editar: 14,
    GrupPriv: 15
  };

export default function formMovimientos({ initialValues, onSubmit, action }) {

    // Hook para la navegación
    const navigation = useNavigation();

    //aqui manejamos las validaciones
    const validaciones = Yup.object({
        DESCRIPCION: Yup.string().min(3, 'Debe tener al menos 3 caracteres')
        .max(49, 'Debe tener máximo 49 caracteres')
        .required('Este campo es obligatorio'),
        SIGNO: Yup.string().length(1, 'Teclea solo un caracter')
        .matches(/^[+-]$/, 'Debe ser un signo de más (+) o menos (-)')
        .required('Este campo es obligatorio'),
    });

    const handleButtonPress = (values, formikActions) => {
        console.log(action);
        if (action === accion.Agregar) {
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
                            onSubmit(values);
                            formikActions.setSubmitting(false);
                            navigation.navigate('SplashCatalogoMov', { accion: action });
                        },
                    },
                ],
                { cancelable: false }
            );
        } else if (action === accion.Editar) {
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
                            onSubmit(values);
                            formikActions.setSubmitting(false);
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
                onSubmit={(values, actions) => handleButtonPress(values, actions)}
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
                                style={[styles.button, formikProps.isValid && !formikProps.isSubmitting ? styles.buttonVerde : styles.buttonGris]}
                                onPress={formikProps.handleSubmit}
                                disabled={!formikProps.isValid || formikProps.isSubmitting}
                            >
                                <Text style={styles.textStyle}>{action === accion.Agregar ? 'Agregar' : 'Editar'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
}
