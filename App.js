import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//aqui se importan las pantallas que se usaran
import Login from './Screens/LOGIN/Login';
import Filter from './Screens/FILTRADO/Filtrado';
import PaginaPrin from './Screens/PAGINA-PRIN/Página';
import Catalogos from './Screens/CATALOGOS/Catalogos';

import HomeCatalogoPriv from "./Screens/CATALOGOS/PRIVILEGIO/Home";
import AgregarCatalogoPriv from "./Screens/CATALOGOS/PRIVILEGIO/Agregar";
import SplashCatalogoPriv from "./Screens/CATALOGOS/PRIVILEGIO/Splash";
import GrupPrivCatalogoPriv from "./Screens/CATALOGOS/PRIVILEGIO/GrupPriv";

import HomeCatalogoNeg from "./Screens/CATALOGOS/NEGOCIO/Home";
import AgregarCatalogoNeg from "./Screens/CATALOGOS/NEGOCIO/Agregar";
import SplashCatalogoNeg from "./Screens/CATALOGOS/NEGOCIO/Splash";

import HomeCatalogoLocal from "./Screens/CATALOGOS/LOCALIDADES/Home";
import AgregarCatalogoLocal from "./Screens/CATALOGOS/LOCALIDADES/Agregar";
import SplashCatalogoLocal from "./Screens/CATALOGOS/LOCALIDADES/Splash";


//import GrupPriv from "./Screens/GrupPriv";

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
          name="HomeCatalogoLoc"
          component={HomeCatalogoLocal}
          options={{
            title: "HomeCatalogoLocal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AgregarCatalogoLocal"
          component={AgregarCatalogoLocal}
          options={{
            title: "AgregarCatalogoLocal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SplashCatalogoLocal"
          component={SplashCatalogoLocal}
          options={{
            title: "SplashCatalogoLocal",
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
