import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./components/Main"
import CameraScreen from "./components/CameraScreen"
import Gallery from "./components/Gallery"
import BigPhoto from "./components/BigPhoto"


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#FF5722',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF'
            },
          }}
        />
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{
            title: 'Gallery',
            headerStyle: {
              backgroundColor: '#FF5722',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF'
            },
          }}
        />
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{
            title: 'Camera',
            headerStyle: {
              backgroundColor: '#FF5722',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF'
            },
          }}
        />
        <Stack.Screen
          name="BigPhoto"
          component={BigPhoto}
          options={{
            title: 'Preview',
            headerStyle: {
              backgroundColor: '#FF5722',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF'
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
