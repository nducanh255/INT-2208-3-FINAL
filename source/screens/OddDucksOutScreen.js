import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'

export default function DucksScreen(){
    const [requestNum, setRequestNum] = useState(Math.floor(Math.random() * 20))

    const quack = new Audio.Sound()
    quack.loadAsync(require('../assets/sounds/duck_quack.mp3'), {shouldPlay: false}, false)
    const bkgrMusic = new Audio.Sound()
    bkgrMusic.loadAsync(require('../assets/sounds/fluffing_duck.mp3'), {shouldPlay: true, isLooping: true}, false)

    return(
        <View style={styles.container}>
            <Image 
                style={styles.img}
                source={require('../assets/images/background_ducks.jpg')}
                resizeMode={'stretch'}
            />
            <View style={styles.requestContainer}>
                <Text style={styles.requestNum}>{requestNum}</Text>
            </View>
            <FlatList
                data={[{eq: '1+3=4'}, {eq: '1+3=4'}, {eq: '1+3=4'}, {eq: '1+3=4'}, {eq: '1+3=4'}]}
                renderItem ={({item, index}) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.speakingBubble}>
                            <Text style={styles.eq}>{item.eq}</Text>
                        </View>
                        <View style={styles.triangle}></View>
                        <TouchableOpacity
                            onPress={() => quack.playAsync()}
                        >
                            <Image 
                                style={styles.duckImg}
                                source={require('../assets/images/duck_0' + (index+2) +'.jpg')}
                                resizeMode={'stretch'}
                            />
                        </TouchableOpacity>
                        
                    </View>
                )}
                horizontal={true}
            />
            <Text>Ducks Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'space-around',
    },
    img: {
        height: '100%', 
        width: '100%', 
        position: 'absolute'
    },
    itemContainer: {
        flexDirection: 'column', 
        alignItems: 'center', 
        marginHorizontal: 50
    },
    speakingBubble: {
        height: 50, 
        width: 150, 
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        transform: [
            {rotate: '180deg'}
        ]
    },
    requestContainer: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: 'white',
        marginVertical: 100, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    requestNum : {
        fontSize: 50,
        fontWeight: 'bold'
    },
    eq: {
        fontSize: 20,
    },
    duckImg: {
        height: 150, 
        width: 150
    }
})