/*
 FRANCO HERNANDEZ ANGELUZ ABIMELEK Y EMMANUEL SANTOS APAEZ
 09 de mayo de 2024 - 18 hrs
 Descripcion: Contiene la pantalla que nos dirige a los ctalogos
*/

import { Pressable, View, Text, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Styles/Styles';
import * as Comun from '../../Config/Comun';

export default function Catalogos() {
    //hook para la navegacion
    const navigation = useNavigation();
    const handleCatalogos = (codCatalogo) => {
        console.log(codCatalogo);
        switch (codCatalogo) {
            case 100:
                navigation.replace('HomeCatalogoNeg', { codCatalogo });
                break;
            case 101:
                navigation.replace('HomeCatalogoPriv', { codCatalogo });
                break;
            case 102:
                navigation.replace('HomeCatalogoMov', { codCatalogo });
                break;
            case 103:
                navigation.replace('HomeCatalogoLoc', { codCatalogo });
                break;
            case 104:
                navigation.replace('HomeCatalogoProd', { codCatalogo });
                break;
            case 105:
                navigation.replace('HomeCatalogoUser', { codCatalogo });
                break;
           case 106:
                navigation.replace('HomeCatalogoClie', { codCatalogo });
                break;
             case 107:
                navigation.replace('HomeCatalogoConf', { codCatalogo });
                break;
            default:
                console.log("Acción no reconocida");
        }
    };

  
    const handleBack = () => {
        navigation.replace('PaginaPrin');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Text style={styles.title2}>Catalogos</Text>
                <View style={styles.buttonContainer1}>
                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleCatalogos(Comun.codCatalogo.Negocios)}>
                        <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/553/553983.png?semt=ais_hybrid' }} style={styles.image} />
                        <Text style={styles.textStyle}>Negocios</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleCatalogos(Comun.codCatalogo.Privilegios)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7439/7439918.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Privilegios</Text>
                    </Pressable>
                </View>

                <View style={styles.buttonContainer1}>
                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleCatalogos(Comun.codCatalogo.Movimientos)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4429/4429889.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Movimientos</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleCatalogos(Comun.codCatalogo.Localidades)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/854/854878.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Localidades</Text>
                    </Pressable>
                </View>


                <View style={styles.buttonContainer1}>
                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleCatalogos(Comun.codCatalogo.Productos)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1822/1822045.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Productos</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleCatalogos(Comun.codCatalogo.Usuarios)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1307/1307714.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Usuarios</Text>
                    </Pressable>
                </View>


                <View style={styles.buttonContainer1}>
                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleCatalogos(Comun.codCatalogo.Cliente)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4814/4814852.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Clientes</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleCatalogos(Comun.codCatalogo.Configuracion)}>
                        <Image source={{ uri: 'https://cdn-icons-png.freepik.com/512/5720/5720427.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Configuración</Text>
                    </Pressable>
                </View>


                <Pressable style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backButtonText}>Regresar</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
};
