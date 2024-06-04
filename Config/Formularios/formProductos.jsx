/*
Emmanuel Santos Apaez
 04 de abril de 2024 - 16 hrs
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

export default function formProductos({ initialValues, onSubmit, action }) {

    // Hook para la navegación
    const navigation = useNavigation();

    //aqui manejamos las validaciones
    const validaciones = Yup.object({
        NOMBRE_PRODUCTO: Yup.string().required('Este campo es obligatorio').min(3, 'Debe tener al menos 3 caracteres')
        .max(49, 'Debe tener máximo 49 caracteres'),
        PRECIO_COMPRA: Yup.number().required('El precio de compra es obligatorio')
        .positive('El precio debe ser mayor que cero'),
        PRECIO_VENTA: Yup.number().required('El precio de venta es obligatorio')
        .positive('El precio debe ser mayor que cero'),
        DESCRIPCION: Yup.string().min(3, 'Debe tener al menos 3 caracteres')
        .max(49, 'Debe tener máximo 49 caracteres')
        .required('Este campo es obligatorio'),
    });

    const handleButtonPress = (values, formikActions) => {
        console.log(action);
        if (action === accion.Agregar) {
            Alert.alert(
                'Confirmar',
                '¿Estás seguro de que deseas agregar este producto?',
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
                            navigation.navigate('SplashCatalogoProd', { accion: action });
                        },
                    },
                ],
                { cancelable: false }
            );
        } else if (action === accion.Editar) {
            Alert.alert(
                'Confirmar',
                '¿Estás seguro de que deseas editar este producto?',
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
                            navigation.navigate('SplashCatalogoProd', { accion: action });
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
                        <Text style={styles.titleInput}>Nombre del Producto</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('NOMBRE_PRODUCTO')}
                            onBlur={formikProps.handleBlur('NOMBRE_PRODUCTO')}
                            placeholder="Nombre del Producto"                            
                            value={formikProps.values.NOMBRE_PRODUCTO}
                        />
                        {formikProps.touched.NOMBRE_PRODUCTO && formikProps.errors.NOMBRE_PRODUCTO &&
                            <Text style={styles.error}>{formikProps.errors.NOMBRE_PRODUCTO}</Text>
                        }

                        <Text style={styles.titleInput}>Precio de Compra</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('PRECIO_COMPRA')}
                            onBlur={formikProps.handleBlur('PRECIO_COMPRA')}
                            value={formikProps.values.PRECIO_COMPRA}
                            keyboardType="numeric"
                            placeholder="Precio de Compra"
                        />
                        {formikProps.touched.PRECIO_COMPRA && formikProps.errors.PRECIO_COMPRA &&
                            <Text style={styles.error}>{formikProps.errors.PRECIO_COMPRA}</Text>
                        }

                        <Text style={styles.titleInput}>Precio de Venta</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('PRECIO_VENTA')}
                            onBlur={formikProps.handleBlur('PRECIO_VENTA')}
                            value={formikProps.values.PRECIO_VENTA}
                            keyboardType="numeric"
                            placeholder="Precio de Venta"
                        />
                        {formikProps.touched.PRECIO_VENTA && formikProps.errors.PRECIO_VENTA &&
                            <Text style={styles.error}>{formikProps.errors.PRECIO_VENTA}</Text>
                        }

                        <Text style={styles.titleInput}>Descripción</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={formikProps.handleChange('DESCRIPCION')}
                            onBlur={formikProps.handleBlur('DESCRIPCION')}
                            value={formikProps.values.DESCRIPCION}
                            placeholder="Descripción"
                            multiline
                        />
                        {formikProps.touched.DESCRIPCION && formikProps.errors.DESCRIPCION &&
                            <Text style={styles.error}>{formikProps.errors.DESCRIPCION}</Text>
                        }


                        <View style={styles.container4}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonRojo]}
                                onPress={() => navigation.replace('HomeCatalogoProd')}
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
