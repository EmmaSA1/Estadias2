/*
 EMMANUEL SANTOS APAEZ 
 21 de mayo de 2024 - 18 hrs
 Descripcion: Es la actualizacón de filtrado para la muestra de codigo y nombre de negocio

*/
import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../Styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { setNombreNegocio, setCodNegocio } from '../../Config/Comun';

export default function FilterScreen() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    if (selectedOption === '') {
      Alert.alert('Error', 'Por favor, seleccione una empresa antes de continuar.');
      return;
    }
    // Establecer el nombre del negocio seleccionado
    setNombreNegocio(selectedOption);

    // Obtener el objeto de negocio seleccionado
    const selectedBusiness = data.find(item => item.Nombre === selectedOption);

    // Verificar si se encontró el negocio
    if (selectedBusiness) {
        // Establecer el código del negocio seleccionado
        setCodNegocio(selectedBusiness.codNegocio);
    } else {
        console.error("No se encontró el negocio para el nombre seleccionado:", selectedOption);
    }

    navigation.navigate('PaginaPrin', { selectedOption });
  };

  // Datos de ejemplo para mostrar en el Picker
  const data = [
    { codNegocio: '01', Nombre: 'Perfumes Ian' },
    { codNegocio: '02', Nombre: 'Soluciones TI' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.containerFil}>
        <View style={styles.table}>
        <Image
            source={{ uri: 'https://static.vecteezy.com/system/resources/previews/010/349/834/non_2x/digital-native-technology-color-icon-illustration-vector.jpg' }}
            style={styles.logo1}
          />
          <Text style={styles.title}>Listado de negocios</Text>
          <View style={styles.UserContainer}>
            <View style={styles.selectInput}>
              <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue) => setSelectedOption(itemValue)}
              >
                {data.map((item, index) => (
                  <Picker.Item key={index} label={item.Nombre} value={item.Nombre} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.ButtonFil}>
            <Button
              title="Continuar"
              onPress={handleNext}
              disabled={selectedOption === ''}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
