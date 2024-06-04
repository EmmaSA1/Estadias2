/*
 EMMANUEL SANTOS APAEZ 
 5 de Mayo de 2024 - 13 hrs
 Descripcion: Contiene el las rutas de todas las pantallas que se utilizan
*/

import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//aqui se importan las pantallas que se usaran
import Login from './Screens/LOGIN/Login';
import Filter from './Screens/FILTRADO/Filtrado';
import PaginaPrin from './Screens/PAGINA-PRIN/Página';
import Catalogos from './Screens/CATALOGOS/Catalogos';

//pantallas del catalogo privilegios
import HomeCatalogoPriv from "./Screens/CATALOGOS/PRIVILEGIOS/Home";
import AgregarCatalogoPriv from "./Screens/CATALOGOS/PRIVILEGIOS/Agregar";
import SplashCatalogoPriv from "./Screens/CATALOGOS/PRIVILEGIOS/Splash";
import GrupPrivCatalogoPriv from "./Screens/CATALOGOS/PRIVILEGIOS/GrupPriv";

//pantallas del catalogo negocios
import HomeCatalogoNeg from "./Screens/CATALOGOS/NEGOCIOS/Home";
import AgregarCatalogoNeg from "./Screens/CATALOGOS/NEGOCIOS/Agregar";
import SplashCatalogoNeg from "./Screens/CATALOGOS/NEGOCIOS/Splash";

//pantallas del catalogo movimientos
import HomeCatalogoMov from "./Screens/CATALOGOS/MOVIMIENTOS/Home";
import AgregarCatalogoMov from "./Screens/CATALOGOS/MOVIMIENTOS/Agregar";
import SplashCatalogoMov from "./Screens/CATALOGOS/MOVIMIENTOS/Splash";

//pantallas del catalogo localidades
import HomeCatalogoLoc from "./Screens/CATALOGOS/LOCALIDADES/Home";
import AgregarCatalogoLoc from "./Screens/CATALOGOS/LOCALIDADES/Agregar";
import SplashCatalogoLoc from "./Screens/CATALOGOS/LOCALIDADES/Splash";

export default function App() {
  //se declara el stack navigator
  const Stack = createStackNavigator();

  function MyStack() {
    return (
      //esta es la ruta inicial
      <Stack.Navigator initialRouteName="Login">
        {/* se declaran las pantallas que se usaran */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Filter"
          component={Filter}
          options={{
            title: "Filter",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaginaPrin"
          component={PaginaPrin}
          options={{
            title: "PaginaPrin",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Catalogos"
          component={Catalogos}
          options={{
            title: "Catalogos",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="HomeCatalogoPriv"
          component={HomeCatalogoPriv}
          options={{
            title: "HomeCatalogoPriv",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AgregarCatalogoPriv"
          component={AgregarCatalogoPriv}
          options={{
            title: "AgregarCatalogoPriv",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SplashCatalogoPriv"
          component={SplashCatalogoPriv}
          options={{
            title: "SplashCatalogoPriv",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GrupPrivCatalogoPriv"
          component={GrupPrivCatalogoPriv}
          options={{
            title: "GrupPrivCatalogoPriv",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeCatalogoNeg"
          component={HomeCatalogoNeg}
          options={{
            title: "HomeCatalogoNeg",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AgregarCatalogoNeg"
          component={AgregarCatalogoNeg}
          options={{
            title: "AgregarCatalogoNeg",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SplashCatalogoNeg"
          component={SplashCatalogoNeg}
          options={{
            title: "SplashCatalogoNeg",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeCatalogoMov"
          component={HomeCatalogoMov}
          options={{
            title: "HomeCatalogoMov",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AgregarCatalogoMov"
          component={AgregarCatalogoMov}
          options={{
            title: "AgregarCatalogoMov",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SplashCatalogoMov"
          component={SplashCatalogoMov}
          options={{
            title: "SplashCatalogoMov",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeCatalogoLoc"
          component={HomeCatalogoLoc}
          options={{
            title: "HomeCatalogoLoc",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AgregarCatalogoLoc"
          component={AgregarCatalogoLoc}
          options={{
            title: "AgregarCatalogoLoc",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SplashCatalogoLoc"
          component={SplashCatalogoLoc}
          options={{
            title: "SplashCatalogoLoc",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}