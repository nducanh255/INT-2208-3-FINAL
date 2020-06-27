import React from 'react'
import { View, Text, Button } from 'react-native'

export default function HomeScreen(props){
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button 
                title='Odd Ducks'
                onPress={() => props.navigation.navigate('Ducks')}
            />
            <Button 
                title='Odd Shapes'
                onPress={() => props.navigation.navigate('Shapes')}
            />
        </View>
    )
}