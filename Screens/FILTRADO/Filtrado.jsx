/*
 EMMANUEL SANTOS APAEZ
 09 de mayo de 2024 - 18 hrs
 Descripcion: Contiene la pantalla que filtra los negocios

EMMANUEL SANTOS APAEZ
 09 de mayo de 2024 - 18 hrs
 Descripcion: Actualización del filtrado para el nombre del negocio 

*/
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../Styles/Styles';
import { useNavigation } from '@react-navigation/native';
import { nombreNegocio, setNombreNegocio } from '../../Config/Comun';

export default function FilterScreen() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();

  // Función para manejar la navegación a la página principal
  const handleNext = () => {
    setNombreNegocio(selectedOption);  // Actualizar el nombreNegocio
    navigation.replace('PaginaPrin', { selectedOption });
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


/*
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../Styles/Styles';
import { useNavigation } from '@react-navigation/native'


export default function FilterScreen() {

  const [filter, setFilter] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();


  const handleNext = () => {
    navigation.replace('PaginaPrin');

  };
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
              <Picker.Item label="Perfumes Ian" value="Perfumes Ian" />
              <Picker.Item label="Soluciones en TI" value="Soluciones en TI" />
              <Picker.Item label="Prueba" value="Prueba" />
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
  //aagregar un data 
  );
}; 


/*
const styles = StyleSheet.create({
  containerFilter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  
    },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  IconContainer: {
    position: 'absolute', 
    right: 20, 
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#707070',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
});
*/
