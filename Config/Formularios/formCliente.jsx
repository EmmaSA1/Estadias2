/*
Emmanuel Santos Apaez
 04 de abril de 2024 - 16 hrs
 Descripcion: Contiene el formulario de los negocios
*/

import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de importar Picker si no lo has hecho
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

// Lista de estados de México
const estados = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
    'Chihuahua', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero',
    'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla',
    'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas',
    'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
];

const pagos = [
    '5 días', '8 días', '14 días', '15 días', '30 días'
];

export default function formProductos({ initialValues, onSubmit, action }) {

    // Hook para la navegación
    const navigation = useNavigation();

    //aqui manejamos las validaciones
    const validaciones = Yup.object({
        NOMBRE: Yup.string().required('Este campo es obligatorio').min(3, 'Debe tener al menos 3 caracteres')
            .max(49, 'Debe tener máximo 49 caracteres'),
        APELLIDO_P: Yup.string().required('Este campo es obligatorio').min(3, 'Debe tener al menos 3 caracteres')
            .max(49, 'Debe tener máximo 49 caracteres'),
        APELLIDO_M: Yup.string().required('Este campo es obligatorio').min(3, 'Debe tener al menos 3 caracteres')
            .max(49, 'Debe tener máximo 49 caracteres'),
        CELULAR: Yup.string().matches(/^[0-9]{10}$/, 'Introduce un número real de 10 dígitos').required('Este campo es obligatorio'),
        E_MAIL: Yup.string().email('Email no válido').required('Este campo es obligatorio').min(7, 'Debe tener al menos 7 caracteres')
            .max(34, 'Debe tener máximo 34 caracteres'),
        DIRECCION: Yup.string().required('Este campo es obligatorio').min(3, 'Debe tener al menos 3 caracteres')
            .max(49, 'Debe tener máximo 49 caracteres'),
        LOCALIDAD: Yup.string().required('Este campo es obligatorio'),
        PERIODO_PAGO: Yup.string().required('Este campo es obligatorio')

    });

    const handleButtonPress = (values, formikActions) => {
        console.log(action);
        if (action === accion.Agregar) {
            Alert.alert(
                'Confirmar',
                '¿Estás seguro de que deseas agregar este cliente?',
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
                            navigation.navigate('SplashCatalogoClie', { accion: action });
                        },
                    },
                ],
                { cancelable: false }
            );
        } else if (action === accion.Editar) {
            Alert.alert(
                'Confirmar',
                '¿Estás seguro de que deseas editar este cliente?',
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
                            navigation.navigate('SplashCatalogoClie', { accion: action });
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
                            value={formikProps.values.NOMBRE}
                            placeholder="Nombre"
                        />
                        {formikProps.touched.NOMBRE && formikProps.errors.NOMBRE &&
                            <Text style={styles.error}>{formikProps.errors.NOMBRE}</Text>
                        }

                        <Text style={styles.titleInput}>Apellido Paterno</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('APELLIDO_P')}
                            onBlur={formikProps.handleBlur('APELLIDO_P')}
                            value={formikProps.values.APELLIDO_P}
                            placeholder="Apellido Paterno"
                        />
                        {formikProps.touched.APELLIDO_P && formikProps.errors.APELLIDO_P &&
                            <Text style={styles.error}>{formikProps.errors.APELLIDO_P}</Text>
                        }

                        <Text style={styles.titleInput}>Apellido Materno</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('APELLIDO_M')}
                            onBlur={formikProps.handleBlur('APELLIDO_M')}
                            value={formikProps.values.APELLIDO_M}
                            placeholder="Apellido Materno"
                        />
                        {formikProps.touched.APELLIDO_M && formikProps.errors.APELLIDO_M &&
                            <Text style={styles.error}>{formikProps.errors.APELLIDO_M}</Text>
                        }

                        <Text style={styles.titleInput}>Celular</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('CELULAR')}
                            onBlur={formikProps.handleBlur('CELULAR')}
                            value={formikProps.values.CELULAR}
                            keyboardType="phone-pad"
                            placeholder="Celular"
                        />
                        {formikProps.touched.CELULAR && formikProps.errors.CELULAR &&
                            <Text style={styles.error}>{formikProps.errors.CELULAR}</Text>
                        }

                        <Text style={styles.titleInput}>Correo Electrónico</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('E_MAIL')}
                            onBlur={formikProps.handleBlur('E_MAIL')}
                            value={formikProps.values.E_MAIL}
                            keyboardType="email-address"
                            placeholder="Correo Electrónico"
                        />
                        {formikProps.touched.E_MAIL && formikProps.errors.E_MAIL &&
                            <Text style={styles.error}>{formikProps.errors.E_MAIL}</Text>
                        }

                        <Text style={styles.titleInput}>Dirección</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('DIRECCION')}
                            onBlur={formikProps.handleBlur('DIRECCION')}
                            value={formikProps.values.DIRECCION}
                            placeholder="Dirección"
                        />
                        {formikProps.touched.DIRECCION && formikProps.errors.DIRECCION &&
                            <Text style={styles.error}>{formikProps.errors.DIRECCION}</Text>
                        }

                        <Text style={styles.titleInput}>Localidad</Text>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={formikProps.values.LOCALIDAD}
                                onValueChange={(itemValue) => formikProps.setFieldValue('LOCALIDAD', itemValue)}
                            >
                                <Picker.Item label="Selecciona un estado" value="" />
                                {estados.map((estado, index) => (
                                    <Picker.Item key={index} label={estado} value={estado} />
                                ))}
                            </Picker>
                        </View>
                        {formikProps.touched.LOCALIDAD && formikProps.errors.LOCALIDAD && (
                            <Text style={styles.error}>{formikProps.errors.LOCALIDAD}</Text>
                        )}

                        <Text style={styles.titleInput}>Periodo de pago</Text>
                        <View style={styles.input}>
                            <Picker
                                selectedValue={formikProps.values.PERIODO_PAGO}
                                onValueChange={(itemValue) => formikProps.setFieldValue('PERIODO_PAGO', itemValue)}
                            >
                                <Picker.Item label="Selecciona un periodo de pago" value="" />
                                {pagos.map((estado, index) => (
                                    <Picker.Item key={index} label={estado} value={estado} />
                                ))}
                            </Picker>
                        </View>
                        {formikProps.touched.PERIODO_PAGO && formikProps.errors.PERIODO_PAGO && (
                            <Text style={styles.error}>{formikProps.errors.PERIODO_PAGO}</Text>
                        )}

                        <View style={styles.container4}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonRojo]}
                                onPress={() => navigation.replace('HomeCatalogoClie')}
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
