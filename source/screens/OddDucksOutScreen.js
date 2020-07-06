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
        diffs.push({...makeDiff(), isCross: false, id: i, isAnswer: false})
    }
    for(let i = 3; i < 5; i++){
        diffs.push({...makeAnswer(), isCross: false, id: i, isAnswer: true})
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
                    style={{marginHorizontal: 20}}
                >
                    <AntDesign name='arrowleft' size={25} color={'white'}/>
                </TouchableOpacity>
            ),
        })
    }, [navigation])

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
            {
            (!isSubmit) ?
            <FlatList
                data={Diffs}
                renderItem ={({item, index}) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.speakingBubble}>
                            <Text style={styles.eq}>{item.eq}</Text>
                        </View>
                        <View style={styles.triangle}></View>
                        <Text>{result}</Text>
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
            /> :
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
                            <View style={item.isAnswer && {borderColor: 'green', borderWidth: 5, padding: -15}}>
                                <Image 
                                    style={styles.duckImg}
                                    source={require('../assets/images/duck_0' + (index+2) +'.jpg')}
                                    resizeMode={'stretch'}
                                />
                                {item.isCross && <View style={styles.crossLine}></View>}
                            </View>
                        </TouchableOpacity>   
                    </View>
                )}
                horizontal={true}
                style={{width: '100%'}}
            />
            }
            <View>
                {
                    (!isSubmit) ?
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setSubmit(true)
                            bkgrMusic.stopAsync()
                        }}
                    >
                        <Text style={styles.buttonText}>Nộp bài</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setSubmit(false)
                            setDiffs(diffs)
                            bkgrMusic.stopAsync()
                        }}
                    >
                        <Text style={styles.buttonText}>Tiếp Theo</Text>
                    </TouchableOpacity>
                }
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
        borderColor: '#FF5800',
        borderWidth: 5,
        backgroundColor: 'white',
        marginVertical: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    requestNum : {
        fontSize: 50,
        color: '#FF5800',
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
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#004731',
        marginTop: 20,
        alignSelf: 'center',
        // align content to the center
        justifyContent: 'center',
        alignItems: 'center',
        // make shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        // align button to the end
        position: 'absolute',
        bottom: 50
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