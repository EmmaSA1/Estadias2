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
        { COD_PRIVILEGIO: '01', NOMBRE_PRIVILEGIO: 'Privilegio 1', FECHA_BAJA: null },
        { COD_PRIVILEGIO: '02', NOMBRE_PRIVILEGIO: 'Privilegio 2', FECHA_BAJA: null },
        { COD_PRIVILEGIO: '03', NOMBRE_PRIVILEGIO: 'Privilegio 3', FECHA_BAJA: null },
        { COD_PRIVILEGIO: '04', NOMBRE_PRIVILEGIO: 'Privilegio 4', FECHA_BAJA: null },
        { COD_PRIVILEGIO: '05', NOMBRE_PRIVILEGIO: 'Privilegio 5', FECHA_BAJA: null },
        { COD_PRIVILEGIO: '06', NOMBRE_PRIVILEGIO: 'Privilegio 6', FECHA_BAJA: null },
    ]);

    const [switchStates, setSwitchStates] = useState({});

    const toggleSwitch = (COD_PRIVILEGIO) => {
        setSwitchStates(prevState => ({
            ...prevState,
            [COD_PRIVILEGIO]: !prevState[COD_PRIVILEGIO]
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
                        <Text style={styles.cell}>{item.NOMBRE_PRIVILEGIO}</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={switchStates[item.COD_PRIVILEGIO] ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch(item.COD_PRIVILEGIO)}
                            value={switchStates[item.COD_PRIVILEGIO]}
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

