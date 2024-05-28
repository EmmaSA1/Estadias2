/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK
 23 de abril de 2024 - 14 hrs
 Descripcion: Contiene la pantalla de carga de la aplicación
*/

import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { Text, View } from 'react-native';

import { styles } from "../../../Styles/Styles";

export default function Splash() {
  // Hook para la navegación
  const navigation = useNavigation();

  // Hook para la ruta
  const route = useRoute();

  useEffect(() => {
    const redirect = setTimeout(() => {
      navigation.replace('HomeCatalogoMov');
    }, 1500);
    return () => clearTimeout(redirect);
  }, []);

  // Obtener la acción de la ruta
  const { params } = route;
  const accion = params ? params.accion : null;

  // Función para obtener el mensaje de acuerdo a la acción
  const getMessage = (action) => {
    console.log(action);
    switch (action) {
      case 13:
        return 'Movimiento Agregado!!';
      case 14:
        return 'Movimiento Editado!!';
      case 12:
        return 'Movimiento Dado de Baja!!';
      case 11:
        return 'Movimiento Dado de Alta!!';
      default:
        return '¡Listo!';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container7}>
        <LottieView
          source={require('../../../assets/listo.json')}
          autoPlay={true}
          loop={true}
          style={styles.loadingAnimation}
        />
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 20,
            color: '#002e60'
          }}>
          {getMessage(accion)}
        </Text>
      </View>
    </View>
  );
}
