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

const accion = {
    Consultar: 10,
    Alta: 11,
    Baja: 12,
    Agregar: 13,
    Editar: 14,
    GrupPriv: 15
  };

export default function formPrivilegios({ initialValues, onSubmit, action }) {

    // Hook para la navegación
    const navigation = useNavigation();

    //aqui manejamos las validaciones
    const validaciones = Yup.object({
        DESCRIPCION_PRIVILEGIO: Yup.string().required('Este campo es obligatorio').min(4, 'Debe tener al menos 4 caracteres')
        .max(49, 'Debe tener máximo 49 caracteres'),
    });

    const handleButtonPress = (values, formikActions) => {
        console.log(action);
        if (action === accion.Agregar) {
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
                            onSubmit(values);
                            formikActions.setSubmitting(false);
                            navigation.navigate('SplashCatalogoPriv', { accion: action });
                        },
                    },
                ],
                { cancelable: false }
            );
        } else if (action === accion.Editar) {
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
                            onSubmit(values);
                            formikActions.setSubmitting(false);
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
                onSubmit={(values, actions) => handleButtonPress(values, actions)}
            >
                {formikProps => (
                    <View>
                        <Text style={styles.titleInput}>Nombre del Privilegio</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('DESCRIPCION_PRIVILEGIO')}
                            onBlur={formikProps.handleBlur('DESCRIPCION_PRIVILEGIO')}
                            placeholder="Nombre del Privilegio"
                            value={formikProps.values.DESCRIPCION_PRIVILEGIO}
                        />
                        {formikProps.touched.DESCRIPCION_PRIVILEGIO && formikProps.errors.DESCRIPCION_PRIVILEGIO &&
                            <Text style={styles.error}>{formikProps.errors.DESCRIPCION_PRIVILEGIO}</Text>
                        }

                        <View style={styles.container4}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonRojo]}
                                onPress={() => navigation.replace("HomeCatalogoPriv")}
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
    )
}
