import React, { useState, useLayoutEffect } from 'react'
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import { AntDesign } from '@expo/vector-icons'

export default function DucksScreen({navigation}){
    const [requestNum, setRequestNum] = useState(Math.floor(Math.random() * 15 + 5))
    const [isSubmit, setSubmit] = useState(false)
    const [result, setResult] = useState(false)

    const makeDiff = () => {
        const a = Math.floor(Math.random() * 20)
        const b = Math.floor(Math.random() * 20) 
        if(a > b) 
            return  {A: a, B: b, eq: a + '-' +  b} 
        else 
            return {A: a, B: b, eq: b + '-' +  a}   
    }

    const makeAnswer = () => {
        const a = Math.floor(Math.random() * 15)
        const b = requestNum + a
        return {A: a, B: b, eq: b + '-' +  a}   
    }

    const shuffle = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    
    let diffs = []
    for(let i = 0; i < 3; i++){
        diffs.push({...makeDiff(), isCross: false, id: i})
    }
    for(let i = 3; i < 5; i++){
        diffs.push({...makeAnswer(), isCross: false, id: i})
    }
    shuffle(diffs)

    const [Diffs, setDiffs] = useState(diffs)

    const quack = new Audio.Sound()
    quack.loadAsync(require('../assets/sounds/duck_quack.mp3'), {shouldPlay: false}, false)
    const bkgrMusic = new Audio.Sound()
    bkgrMusic.loadAsync(require('../assets/sounds/fluffing_duck.mp3'), {shouldPlay: true, isLooping: true}, false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                        bkgrMusic.stopAsync()
                    }} 
                >
                    <AntDesign name='arrowleft' size={25} color={'black'}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

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
                data={Diffs}
                renderItem ={({item, index}) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.speakingBubble}>
                            <Text style={styles.eq}>{item.eq}</Text>
                        </View>
                        <View style={styles.triangle}></View>
                        <TouchableOpacity
                            onPress={() => {
                                quack.playAsync()
                                setDiffs(Diffs.map(element => (
                                    (item.id === element.id) ?
                                    {...element, isCross: true} : 
                                    element
                                )))
                                bkgrMusic.pauseAsync()
                            }}
                        >
                            <Image 
                                style={styles.duckImg}
                                source={require('../assets/images/duck_0' + (index+2) +'.jpg')}
                                resizeMode={'stretch'}
                            />
                            {item.isCross && <View style={styles.crossLine}></View>}
                        </TouchableOpacity>   
                    </View>
                )}
                horizontal={true}
                style={{width: '100%'}}
            />
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setSubmit(true)
                        bkgrMusic.stopAsync()
                    }}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
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
    },
    button: {
        width: 150,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    crossLine: {
        position: 'absolute',
        transform: [ {rotate: '45deg'} ],
        top: -100,
        left: 50,
        width: 200,
        height: 200,
        borderBottomColor: 'red',
        borderBottomWidth: 20,
    }
})