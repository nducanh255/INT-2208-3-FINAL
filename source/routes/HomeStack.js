import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import OddDucksOutScreen from '../screens/OddDucksOutScreen'
import OddShapesOutScreen from '../screens/OddShapesOutScreen'

const Stack = createStackNavigator()

export default function HomeStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{
                title: 'Luyện tập phép tính trừ',
                headerStyle: {backgroundColor: '#004731'},
                headerTintColor: 'white',
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen 
              name="Ducks" 
              component={OddDucksOutScreen}
              options={{
                title: 'Gạch những chú vịt sai',
                headerStyle: {backgroundColor: '#004731'},
                headerTintColor: 'white',
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen 
              name="Shapes" 
              component={OddShapesOutScreen}
              options={{
                title: 'Gạch bớt theo yêu cầu',
                headerStyle: {backgroundColor: '#004731'},
                headerTintColor: 'white',
                headerTitleAlign: 'center'
              }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}