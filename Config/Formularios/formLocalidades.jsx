import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';

import { styles } from "../../Styles/Styles";

import { Formik } from 'formik';
import * as Yup from 'yup';

const estadosDeMexico = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", 
    "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero", 
    "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", 
    "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", 
    "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

const accion = {
    Consultar: 10,
    Alta: 11,
    Baja: 12,
    Agregar: 13,
    Editar: 14,
    GrupPriv: 15
  };

export default function FormLocalidades({ initialValues, onSubmit, action }) {
    // Hook para la navegación
    const navigation = useNavigation();

    // Aquí manejamos las validaciones
    const validaciones = Yup.object({
        LOCALIDAD: Yup.string().min(3, 'Debe tener al menos 3 caracteres')
        .max(49, 'Debe tener máximo 49 caracteres')
        .required('Este campo es obligatorio'),
        ESTADOS: Yup.string().min(3, 'Debe tener al menos 3 caracteres')
        .max(29, 'Debe tener máximo 29 caracteres')
        .required('Este campo es obligatorio'),
    });

    const handleButtonPress = (values, formikActions) => {
        console.log(action);
        if (action === accion.Agregar ) {
            Alert.alert(
                'Confirmar',
                `¿Estás seguro de que deseas agregar esta localidad?`,
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
                            navigation.navigate('SplashCatalogoLoc', { accion: action });
                        },
                    },
                ],
                { cancelable: false }
            );
        } else if (action === accion.Editar ) {
            Alert.alert(
                'Confirmar',
                `¿Estás seguro de que deseas editar esta localidad?`,
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
                            navigation.navigate('SplashCatalogoLoc', { accion: action });
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
                        <Text style={styles.titleInput}>Nombre de la localidad</Text>
                        <TextInput
                            style={styles.inputNombre}
                            onChangeText={formikProps.handleChange('LOCALIDAD')}
                            onBlur={formikProps.handleBlur('LOCALIDAD')}
                            placeholder="Nombre de la localidad"
                            value={formikProps.values.LOCALIDAD}
                        />
                        {formikProps.touched.LOCALIDAD && formikProps.errors.LOCALIDAD && (
                            <Text style={styles.error}>{formikProps.errors.LOCALIDAD}</Text>
                        )}

                        <Text style={styles.titleInput}>Estado de la localidad</Text>
                        <View style={styles.inputNombre}>
                            <Picker
                                selectedValue={formikProps.values.ESTADOS}
                                onValueChange={(itemValue) => formikProps.setFieldValue('ESTADOS', itemValue)}
                            >
                                <Picker.Item label="Selecciona un estado" value="" />
                                {estadosDeMexico.map((estado, index) => (
                                    <Picker.Item key={index} label={estado} value={estado} />
                                ))}
                            </Picker>
                        </View>
                        {formikProps.touched.ESTADOS && formikProps.errors.ESTADOS && (
                            <Text style={styles.error}>{formikProps.errors.ESTADOS}</Text>
                        )}

                        <View style={styles.container4}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonRojo]}
                                onPress={() => navigation.replace("HomeCatalogoLoc")}
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
