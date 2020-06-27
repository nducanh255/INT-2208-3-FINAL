import React from 'react' 
import { View, Button, StyleSheet, Image } from 'react-native'

export default function HomeScreen(props){
    return(
        <View style={styles.container}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    style={{height: '100%', width: '100%', position: 'absolute'}}
                    source={require('../assets/images/shapes_home_background.jpg')}
                    resizeMode={'repeat'}
                />
                <Button 
                    title='Odd Shapes Out'
                    onPress={() => props.navigation.navigate('Shapes')}
                />
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    style={{height: '100%', width: '100%', position: 'absolute'}}
                    source={require('../assets/images/duck_home_background.jpg')}
                    resizeMode={'repeat'}
                />
                <Button 
                    title='Odd Ducks Out'
                    onPress={() => props.navigation.navigate('Ducks')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center', 
    }
})