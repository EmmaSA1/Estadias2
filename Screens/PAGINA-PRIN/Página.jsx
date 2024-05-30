/*
 EMMANUEL SANTOS APAEZ
 09 de mayo de 2024 - 18 hrs
 Descripcion: Contiene la pantalla principal de la applicacion
*/

import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../Styles/Styles';

export default function Login() {

  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('Catalogos');
  };

  const handleBack = () => {
    navigation.replace('Filter');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title2}>Áreas</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleButtonPress()}>
            <Image source={{ uri: 'https://arteint.com/wp-content/uploads/2017/12/web-catalogo_web-thegem-blog-default.png' }}
              style={styles.imagePag} />
            <Text style={styles.buttonText}>Catalogos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => null}>
            <Image source={{ uri: 'https://cdn-icons-png.freepik.com/512/3094/3094836.png' }}
              style={styles.imagePag} />
            <Text style={styles.buttonText}>Reportes</Text>
          </TouchableOpacity>
        </View>

        <Pressable style={styles.backButtonPrin} onPress={handleBack}>
          <Text style={styles.backButtonText}>Regresar</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
};