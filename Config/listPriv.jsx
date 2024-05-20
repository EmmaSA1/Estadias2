/*
 EMMANUEL SANTOS APAEZ 
 11 de mayo de 2024 - 14 hrs
 Descripcion: Contiene el la lista de los privilegios
*/

import React, { useState } from 'react';
import { Text, View, Switch, TouchableOpacity } from "react-native";
import { styles } from "../Styles/Styles";
import { useNavigation } from '@react-navigation/native';

export default function listPriv() {
    // Hook para la navegación
    const navigation = useNavigation();
    
    const [data, setData] = useState([
        { cod_privilegio: '01', nombre: 'Privilegio 1', status: 'null' },
        { cod_privilegio: '02', nombre: 'Privilegio 2', status: 'null' },
        { cod_privilegio: '03', nombre: 'Privilegio 3', status: 'null' },
        { cod_privilegio: '04', nombre: 'Privilegio 4', status: 'null' },
        { cod_privilegio: '05', nombre: 'Privilegio 5', status: 'null' },
        { cod_privilegio: '06', nombre: 'Privilegio 6', status: 'null' },
    ]);

    const [switchStates, setSwitchStates] = useState({});

    const toggleSwitch = (cod_privilegio) => {
        setSwitchStates(prevState => ({
            ...prevState,
            [cod_privilegio]: !prevState[cod_privilegio]
        }));
    };

    return (
        <View style={{flex: 1}}>
            <View style={styles.table}>
                <View style={styles.Encabezados}>
                    <Text style={styles.Titulo}>NOMBRE</Text>
                    <Text style={styles.TituloAcciones}>Permitido</Text>
                </View>
                {data.map((item, index) => (
                    <View key={index} style={styles.Contenido}>
                        <Text style={styles.cell}>{item.nombre}</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={switchStates[item.cod_privilegio] ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(item.cod_privilegio)}
                            value={switchStates[item.cod_privilegio]}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.container4}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonRojo]}
                    onPress={() => navigation.replace("GrupPrivCatalogoPriv")}
                >
                    <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buttonVerde]}
                    onPress={null}
                >
                    <Text style={styles.textStyle}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

