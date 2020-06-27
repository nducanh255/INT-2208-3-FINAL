import * as React from 'react'
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
                headerStyle: {backgroundColor: '#61BF1A'}
              }}
            />
            <Stack.Screen name="Ducks" component={OddDucksOutScreen}/>
            <Stack.Screen name="Shapes" component={OddShapesOutScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
