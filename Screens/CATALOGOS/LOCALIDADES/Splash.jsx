/*
EMMANUEL SANTOS APAEZ
 21 de mayo de 2024 - 14 hrs
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

  const route = useRoute();

  //plazo de tiempo 
  useEffect(() => {
    const redirect = setTimeout(() => {
      navigation.replace('HomeCatalogoLoc');
    }, 1500);
    return () => clearTimeout(redirect);
  }, []);

  // Obtener la acción de la ruta
  const { params } = route;
  const accion = params ? params.accion : null;

  const getMessage = (accion) => { 
    console.log (accion);
    switch (accion) { 
    case 13:
      return 'Localidad Agregado!!';
    case 14:
      return 'Localidad Editado!!';
    case 12:
      return 'Localidad Dado de Baja!!';
    case 11:
      return 'Localidad Dado de Alta!!';
    default:
      return '¡Listo!';}
  }

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
            {getMessage (accion)}
        </Text>
      </View>
    </View>
  );
}
