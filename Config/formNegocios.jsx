/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 26 de abril de 2024 - 16 hrs
 Descripcion: Contiene el formulario de los negocios
*/

import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from "../Styles/Styles";

import { Formik } from 'formik';
import * as Yup from 'yup';

export default function formNegocios({ initialValues, onSubmit, action }) {

    // Hook para la navegación
    const navigation = useNavigation();

    //aqui manejamos las validaciones
    const validaciones = Yup.object({
        Nombre: Yup.string().required('Este campo es obligatorio'),
        Giro: Yup.string().required('Este campo es obligatorio'),
        Direccion: Yup.string().required('Este campo es obligatorio'),
        TelefonoOficina: Yup.string().matches(/^[0-9]{10}$/, 'Introduce un número real de 10 dígitos').required('Este campo es obligatorio'),
        TelefonoCelular: Yup.string().matches(/^[0-9]{10}$/, 'Introduce un número real de 10 dígitos').required('Este campo es obligatorio'),
        Email: Yup.string().email('Email no válido').required('Este campo es obligatorio'),
        Logotipo: Yup.string().required('Este campo es obligatorio'),
    });

    const handleButtonPress = (values, event) => {
        console.log(action);
        if (action === 13 && Object.values(values).some(value => value === '')) {
            // Mostrar una alerta indicando que los campos son obligatorios
            Alert.alert(
                'Error',
                'Por favor completa todos los campos antes de agregar el negocio.',
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
                            navigation.navigate('SplashCatalogoNeg', { accion: action });
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
                            navigation.navigate('SplashCatalogoNeg', { accion: action });
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    };

    console.log("Valor de la acción:", action);

    return (
        <View style={styles.container5}>
            <Formik
                initialValues={initialValues}
                validationSchema={validaciones}
                onSubmit={(values) => handleButtonPress(values)}
            >
                {formikProps => (
                    <View>
                        <Text style={styles.titleInput}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('Nombre')}
                            onBlur={formikProps.handleBlur('Nombre')}
                            placeholder="Nombre del Negocio"
                            value={formikProps.values.Nombre}
                        />
                        {formikProps.touched.Nombre && formikProps.errors.Nombre &&
                            <Text style={styles.error}>{formikProps.errors.Nombre}</Text>
                        }

                        <Text style={styles.titleInput}>Giro</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('Giro')}
                            onBlur={formikProps.handleBlur('Giro')}
                            placeholder="Giro del negocio"
                            value={formikProps.values.Giro}
                        />
                        {formikProps.touched.Giro && formikProps.errors.Giro &&
                            <Text style={styles.error}>{formikProps.errors.Giro}</Text>
                        }

                        <Text style={styles.titleInput}>Dirección</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('Direccion')}
                            onBlur={formikProps.handleBlur('Direccion')}
                            placeholder="Dirección del negocio"
                            value={formikProps.values.Direccion}
                        />
                        {formikProps.touched.Direccion && formikProps.errors.Direccion &&
                            <Text style={styles.error}>{formikProps.errors.Direccion}</Text>
                        }

                        <Text style={styles.titleInput}>Teléfono de oficina</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('TelefonoOficina')}
                            onBlur={formikProps.handleBlur('TelefonoOficina')}
                            value={formikProps.values.TelefonoOficina}
                            placeholder="Teléfono de oficina"
                            keyboardType="numeric"
                        />
                        {formikProps.touched.TelefonoOficina && formikProps.errors.TelefonoOficina &&
                            <Text style={styles.error}>{formikProps.errors.TelefonoOficina}</Text>
                        }

                        <Text style={styles.titleInput}>Teléfono celular</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('TelefonoCelular')}
                            onBlur={formikProps.handleBlur('TelefonoCelular')}
                            value={formikProps.values.TelefonoCelular}
                            placeholder="Teléfono celular"
                            keyboardType="numeric"
                        />
                        {formikProps.touched.TelefonoCelular && formikProps.errors.TelefonoCelular &&
                            <Text style={styles.error}>{formikProps.errors.TelefonoCelular}</Text>
                        }

                        <Text style={styles.titleInput}>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('Email')}
                            onBlur={formikProps.handleBlur('Email')}
                            placeholder="Correo electrónico"
                            value={formikProps.values.Email}
                            keyboardType="email-address"
                        />
                        {formikProps.touched.Email && formikProps.errors.Email &&
                            <Text style={styles.error}>{formikProps.errors.Email}</Text>
                        }

                        <Text style={styles.titleInput}>Logotipo</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('Logotipo')}
                            onBlur={formikProps.handleBlur('Logotipo')}
                            placeholder="Nombre del logotipo"
                            value={formikProps.values.Logotipo}
                        />
                        {formikProps.touched.Logotipo && formikProps.errors.Logotipo &&
                            <Text style={styles.error}>{formikProps.errors.Logotipo}</Text>
                        }

                        <View style={styles.container4}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonRojo]}
                                onPress={() => navigation.replace('HomeCatalogoNeg')}
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
