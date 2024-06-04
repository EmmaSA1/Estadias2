import { Pressable, View, Text, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../Styles/Styles';
import * as Comun from '../../Config/Comun';

export default function Reportes() {
    const navigation = useNavigation();

    const handleReportes = (codReporte) => {
        console.log(codReporte);
        Comun.setCodigoReporte(codReporte);
        Comun.setNombreReporte(Comun.nombreReporte[codReporte]);
        switch (codReporte) {
            case 200:
                navigation.replace('HomeReporteVentas', { codReporte });
                break;
            case 201:
                navigation.replace('HomeReporteClientes', { codReporte });
                break;
            case 202:
                navigation.replace('HomeReporteProductos', { codReporte });
                break;
            case 203:
                navigation.replace('HomeReporteUsuarios', { codReporte });
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
                <Text style={styles.title2}>Reportes</Text>
                <View style={styles.buttonContainer1}>
                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleReportes(200)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170576.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Ventas</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleReportes(201)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Clientes</Text>
                    </Pressable>
                </View>

                <View style={styles.buttonContainer1}>
                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleReportes(202)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991108.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Productos</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.buttonCatalogo, styles.buttonAzul]}
                        onPress={() => handleReportes(203)}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1051/1051326.png' }} style={styles.image} />
                        <Text style={styles.textStyle}>Usuarios</Text>
                    </Pressable>
                </View>

                <Pressable style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backButtonText}>Regresar</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
};
