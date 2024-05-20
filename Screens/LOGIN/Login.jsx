/*
 EMMANUEL SANTOS APAEZ
 09 de mayo de 2024 - 18 hrs
 Descripcion: Contiene la pantalla de login
*/

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../Styles/Styles';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.replace('Filter');

  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogi}>
        <View style={styles.table}>
          <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/016/680/055/non_2x/technology-solution-icon-suitable-for-a-wide-range-of-digital-creative-projects-happy-creating-vector.jpg' }}
            style={styles.logo}
          />
          <TextInput
            style={styles.inputUsuario}
            placeholder="Núrmero de usuario"
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => console.log('¿Olvidaste tu contraseña?')} style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <View style={styles.ButtonLogin}>
            <Button title="Iniciar sesión" onPress={handleLogin} />
          </View>
        </View>
      </View>
    </View>

  );
};

