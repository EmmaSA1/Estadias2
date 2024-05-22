/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK y EMMANUEL SANTOS APAEZ 
 11 de mayo de 2024 - 14 hrs
 Descripcion: Contiene el formulario de los privilegios
*/

import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { useNavigation } from '@react-navigation/native';

import { styles } from "../Styles/Styles";

import { Formik } from 'formik';
import * as Yup from 'yup';

const estadosDeMexico = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", 
    "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero", 
    "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", 
    "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", 
    "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

export default function formLocalidades({ initialValues, onSubmit, action }) {

    // Hook para la navegación
    const navigation = useNavigation();

    //aqui manejamos las validaciones
    const validaciones = Yup.object({
        Localidad: Yup.string().required('Este campo es obligatorio'),
        Estado: Yup.string().required('Este campo es obligatorio'),
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
                            navigation.navigate('SplashCatalogoLoc', { accion: action });
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
                onSubmit={(values) => handleButtonPress(values)}
                >
                {formikProps => (
                    <View>
                        <Text style={styles.titleInput}>Nombre de la localidad</Text>
                        <TextInput
                            style={styles.inputNombre}
                            onChangeText={formikProps.handleChange('Localidad')}
                            onBlur={formikProps.handleBlur('Localidad')}
                            placeholder="Nombre de la localidad"
                            value={formikProps.values.Localidad}
                        />
                        {formikProps.touched.Localidad && formikProps.errors.Localidad && (
                            <Text style={{ color: 'white' }}>{formikProps.errors.Localidad}</Text>
                        )}

                        <Text style={styles.titleInput}>Estado de la localidad</Text>
                        <View style={styles.inputNombre}>
                            <Picker
                                selectedValue={formikProps.values.Estado}
                                onValueChange={formikProps.handleChange('Estado')}
                            >
                                {estadosDeMexico.map((estado, index) => (
                                    <Picker.Item key={index} label={estado} value={estado} />
                                ))}
                            </Picker>
                        </View>
                        {formikProps.touched.Estado && formikProps.errors.Estado && (
                            <Text style={{ color: 'white' }}>{formikProps.errors.Estado}</Text>
                        )}

                        <View style={styles.container4}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonRojo]}
                                onPress={() => navigation.replace("HomeCatalogoLoc")}
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