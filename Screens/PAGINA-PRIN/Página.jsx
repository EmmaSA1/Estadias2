/*
 EMMANUEL SANTOS APAEZ
 09 de mayo de 2024 - 18 hrs
 Descripcion: Contiene la pantalla principal de la applicacion
*/

import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Button, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../Styles/Styles';

export default function Login() {

  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.replace('Catalogos');

  };

  return (
  
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title2}>Áreas</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleButtonPress()}>
            <Image source={{ uri: 'https://arteint.com/wp-content/uploads/2017/12/web-catalogo_web-thegem-blog-default.png' }}
              style={styles.image} />
            <Text style={styles.buttonText}>Catalogos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={() => null}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3093/3093748.png' }} style={styles.image} />
            <Text style={styles.buttonText}>Reportes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => null}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1087/1087806.png' }} style={styles.image} />
            <Text style={styles.buttonText}>Deuda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={() => null}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4334/4334662.png' }} style={styles.image} />
            <Text style={styles.buttonText}>Nueva Deuda</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => null}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7132/7132915.png' }} style={styles.image} />
            <Text style={styles.buttonText}>Pedidos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    
  );

};
