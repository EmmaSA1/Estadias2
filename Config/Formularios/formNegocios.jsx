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

export default function formNegocios({ initialValues, onSubmit, action }) {

    // Hook para la navegación
    const navigation = useNavigation();

    //aqui manejamos las validaciones
    const validaciones = Yup.object({
        NOMBRE: Yup.string().required('Este campo es obligatorio').min(3, 'Debe tener al menos 3 caracteres')
        .max(49, 'Debe tener máximo 49 caracteres'),
        GIRO: Yup.string().required('Este campo es obligatorio').min(3, 'Debe tener al menos 3 caracteres')
        .max(49, 'Debe tener máximo 49 caracteres'),
        DIRECCION: Yup.string().required('Este campo es obligatorio').min(10, 'Debe tener al menos 10 caracteres')
        .max(99, 'Debe tener máximo 99 caracteres'),
        TELEFONO_OFICINA: Yup.string().matches(/^[0-9]{10}$/, 'Introduce un número real de 10 dígitos').required('Este campo es obligatorio'),
        TELEFONO_CELULAR: Yup.string().matches(/^[0-9]{10}$/, 'Introduce un número real de 10 dígitos').required('Este campo es obligatorio'),
        E_MAIL: Yup.string().email('Email no válido').required('Este campo es obligatorio').min(7, 'Debe tener al menos 7 caracteres')
        .max(34, 'Debe tener máximo 34 caracteres'),
        LOGOTIPO: Yup.string().required('Este campo es obligatorio').min(5, 'Debe tener al menos 5 caracteres')
        .max(19, 'Debe tener máximo 19 caracteres'),
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
                            navigation.navigate('SplashCatalogoNeg', { accion: action });
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
                onSubmit={(values, actions) => handleButtonPress(values, actions)}
            >
                {formikProps => (
                    <View>
                        <Text style={styles.titleInput}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('NOMBRE')}
                            onBlur={formikProps.handleBlur('NOMBRE')}
                            placeholder="Nombre del Negocio"
                            value={formikProps.values.NOMBRE}
                        />
                        {formikProps.touched.NOMBRE && formikProps.errors.NOMBRE &&
                            <Text style={styles.error}>{formikProps.errors.NOMBRE}</Text>
                        }

                        <Text style={styles.titleInput}>Giro</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('GIRO')}
                            onBlur={formikProps.handleBlur('GIRO')}
                            placeholder="Giro del negocio"
                            value={formikProps.values.GIRO}
                        />
                        {formikProps.touched.GIRO && formikProps.errors.GIRO &&
                            <Text style={styles.error}>{formikProps.errors.GIRO}</Text>
                        }

                        <Text style={styles.titleInput}>Dirección</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('DIRECCION')}
                            onBlur={formikProps.handleBlur('DIRECCION')}
                            placeholder="Dirección del negocio"
                            value={formikProps.values.DIRECCION}
                        />
                        {formikProps.touched.DIRECCION && formikProps.errors.DIRECCION &&
                            <Text style={styles.error}>{formikProps.errors.DIRECCION}</Text>
                        }

                        <Text style={styles.titleInput}>Teléfono de oficina</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('TELEFONO_OFICINA')}
                            onBlur={formikProps.handleBlur('TELEFONO_OFICINA')}
                            value={formikProps.values.TELEFONO_OFICINA}
                            placeholder="Teléfono de oficina"
                            keyboardType="numeric"
                        />
                        {formikProps.touched.TELEFONO_OFICINA && formikProps.errors.TELEFONO_OFICINA &&
                            <Text style={styles.error}>{formikProps.errors.TELEFONO_OFICINA}</Text>
                        }

                        <Text style={styles.titleInput}>Teléfono celular</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('TELEFONO_CELULAR')}
                            onBlur={formikProps.handleBlur('TELEFONO_CELULAR')}
                            value={formikProps.values.TELEFONO_CELULAR}
                            placeholder="Teléfono celular"
                            keyboardType="numeric"
                        />
                        {formikProps.touched.TELEFONO_CELULAR && formikProps.errors.TELEFONO_CELULAR &&
                            <Text style={styles.error}>{formikProps.errors.TELEFONO_CELULAR}</Text>
                        }

                        <Text style={styles.titleInput}>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('E_MAIL')}
                            onBlur={formikProps.handleBlur('E_MAIL')}
                            placeholder="Correo electrónico"
                            value={formikProps.values.E_MAIL}
                            keyboardType="email-address"
                        />
                        {formikProps.touched.E_MAIL && formikProps.errors.E_MAIL &&
                            <Text style={styles.error}>{formikProps.errors.E_MAIL}</Text>
                        }

                        <Text style={styles.titleInput}>Logotipo</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('LOGOTIPO')}
                            onBlur={formikProps.handleBlur('LOGOTIPO')}
                            placeholder="Nombre del logotipo"
                            value={formikProps.values.LOGOTIPO}
                        />
                        {formikProps.touched.LOGOTIPO && formikProps.errors.LOGOTIPO &&
                            <Text style={styles.error}>{formikProps.errors.LOGOTIPO}</Text>
                        }

                        <View style={styles.container4}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonRojo]}
                                onPress={() => navigation.replace('HomeCatalogoNeg')}
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
