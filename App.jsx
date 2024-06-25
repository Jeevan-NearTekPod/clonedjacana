import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeScreen from './screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UploadImageScreen from './screens/UploadImageScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import DrawerContent from './DrawerContent';
// import { Image } from '@rneui/themed';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home Screen',
          headerStyle: {
            backgroundColor: 'skyblue',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen name="UploadImage" component={UploadImageScreen} />
    </Stack.Navigator>
  );
};
const DrawerNavigatopn = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0163d2',
        },
        headerTintColor: '#fff',
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="UploadImage" component={UploadImageScreen} />
      <Drawer.Screen name="Logout" component={LoginScreen} />

      {/* <Drawer.Screen name="UploadImage" component={UploadImageScreen} /> */}
    </Drawer.Navigator>
  );
};

const App = () => {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, []);
  const Stack = createNativeStackNavigator();
  return (
    // <View style={styles.container}>
    //   {splash ? (
    //     <View>
    //       <Image style={styles.img} source={require('./Assets/logo.png')} />
    //     </View>
    //   ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Main" component={DrawerNavigatopn} />
      </Stack.Navigator>
    </NavigationContainer>
    //   )}
    // </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    width: 170,
    height: 50,
  },
});
export default App;
