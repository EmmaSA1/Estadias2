/*
 EMMANUEL SANTOS APAEZ
 09 de mayo de 2024 - 18 hrs
 Descripcion: Contiene la pantalla que filtra los negocios


*/
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../Styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { setNombreNegocio, setCodNegocio } from '../../Config/Comun';

export default function FilterScreen() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();

  const handleNext = () => {
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
          <Text style={styles.title}>Listado de negocios</Text>
          <View style={styles.UserContainer}>
            <TextInput
              style={styles.selectInput}
              placeholder="Seleccione una empresa"
              value={selectedOption}
              onFocus={() => setShowPicker(true)}
              onChangeText={(text) => setSelectedOption(text)}
            />
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.IconContainer}>
              <Ionicons name="caret-down" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Modal visible={showPicker} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={() => setShowPicker(false)}>
              <View style={styles.modalBackground}>
                <View style={styles.pickerContainer}>
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
            </TouchableWithoutFeedback>
          </Modal>
          <View style={styles.ButtonFil}>
            <Button title="Continuar" onPress={handleNext} />
          </View>
        </View>
      </View>
    </View>
  );
}
