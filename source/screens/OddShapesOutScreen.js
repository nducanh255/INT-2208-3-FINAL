import React, { useState } from 'react'
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
import Shape from '../components/Shape'

export default function ShapesScreen({navigation}){
    const [requestNum, setRequestNum] = useState(Math.floor(Math.random() * 20))
    const [result, setResult] = useState('')
    const [isSubmit, setSubmit] = useState(false)
    const [isComplete, setComplete] = useState(false)
    const [finish, setFinish] = useState({correct: 0, wrong: 0})

    const rightFX = new Audio.Sound()
    rightFX.loadAsync(require('../assets/sounds/right.mp3'), {shouldPlay: false}, false)
    const wrongFX = new Audio.Sound()
    wrongFX.loadAsync(require('../assets/sounds/wrong.mp3'), {shouldPlay: false}, false)
    const streakFX = new Audio.Sound()
    streakFX.loadAsync(require('../assets/sounds/streak.mp3'), {shouldPlay: false}, false)

    var initBoard = []
    for(let i = 0; i < 20; i++){
        initBoard.push({id: i, isCross: false})
    }
    const [board, setBoard] = useState(initBoard)

    const colors = ['#00239C', '#F93B22','#FFB81C', '#FF6C2F', '#A6192E', '#BF1932']
    const shapes = ['camera', 'heart', 'clock', 'star', 'tag', 'cloud', 'pin', 'smile', 'frown']
    const [color, setColor] = useState(colors[Math.floor(Math.random() * colors.length)])
    const [shape, setShape] = useState(shapes[Math.floor(Math.random() * shapes.length)])

    const checkResult = () => {
        let count = 0
        board.forEach(element => {
            if(element.isCross === false)
                count++
        })
        if(count === requestNum){
            setResult('correct')
            setFinish({...finish, correct: finish.correct + 1})
            rightFX.playAsync()
        } 
            
        else{
            setResult('wrong')
            setFinish({...finish, wrong: finish.wrong + 1})
            wrongFX.playAsync()
        } 
        setSubmit(true)   
    }

    const reset = () => {
        setSubmit(false)
        setRequestNum(Math.floor(Math.random() * 20))
        setBoard(initBoard)
        setResult('')
        setShape(shapes[Math.floor(Math.random() * shapes.length)])
        setColor(colors[Math.floor(Math.random() * colors.length)])
    }

    if(!isComplete)
    return(
        <View style={styles.container}>
            <View style={styles.requestNumContainer}>
                <Text style={styles.requestNumTitle}>{requestNum}</Text>
            </View>
            <View style={styles.board}>
                <FlatList 
                    data={board}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                setBoard(board.map((element) =>
                                    item.id !== element.id ? 
                                    element : 
                                    {...element, isCross: true}
                                ))
                            }}
                        >
                            <Shape shape={shape} color={color} isCross={item.isCross}/>
                        </TouchableOpacity>
                    )}
                    numColumns={5}
                />
            </View>
            <View style={styles.buttonContainer}>
                {
                    !isSubmit ?
                    <TouchableOpacity
                        onPress={() => checkResult()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Nộp bài</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        onPress={() => reset()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Tiếp theo</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={() => {
                        setComplete(true)
                        streakFX.playAsync()
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Kết thúc</Text>
                </TouchableOpacity>
            </View>
            {
                (isSubmit) &&
                (result === 'correct') ?
                <Text style={[{color: 'green'}, styles.resultText]}>Đúng rồi :) !!!</Text> :
                (result === 'wrong') &&
                <Text style={[{color: 'red'}, styles.resultText]}>Sai rồi :(</Text> 
            }
        </View>
    )
    else
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 50, color: 'green'}}>Số câu làm đúng: {finish.correct}</Text>
            <Text style={{fontSize: 50, color: 'red'}}>Số câu làm sai: {finish.wrong}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //flex: 1, 
        flexDirection: 'column',
        alignItems: 'center'
    }, 
    board: {
        borderColor: '#004731',
        borderWidth: 5,
        alignSelf: 'center',
        flexWrap: 'wrap'
    },
    shape: {
        margin: 8
    },
    requestNumContainer: {
        height: 75,
        width: 75,
        borderRadius: 75,
        borderColor: '#FF5800',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    requestNumTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF5800'
    }, 
    buttonContainer: {
        height: 50,
        width: 300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        elevation: 9
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    resultText: {
        fontSize: 40, 
        fontWeight: 'bold',
        paddingTop: 20
    }
})