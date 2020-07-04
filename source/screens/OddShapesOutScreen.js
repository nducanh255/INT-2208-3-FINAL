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

    const shapes = ['camera', 'heart', 'clock', 'star', 'tag', 'cloud', 'pin', 'smile', 'frown']
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
                            <Shape shape={shape} isCross={item.isCross}/>
                        </TouchableOpacity>
                    )}
                    numColumns={5}
                />
            </View>
            <View style={styles.buttonContainer}>
                {
                    !isSubmit ?
                    <Button
                        title={'Nộp bài'}
                        onPress={() => {
                            checkResult()
                            setSubmit(true)
                        }}
                    /> :
                    <Button
                        title={'Tiếp theo'}
                        onPress={() => {
                            setSubmit(false)
                            setRequestNum(Math.floor(Math.random() * 20))
                            setBoard(initBoard)
                            setResult('')
                            setShape(shapes[Math.floor(Math.random() * shapes.length)])
                        }}
                    />
                }
                <Button
                    title='Kết thúc'
                    onPress={() => {
                        setComplete(true)
                        streakFX.playAsync()
                    }}
                />
            </View>
            {
                (isSubmit) &&
                (result === 'correct') ?
                <Text style={{color: 'green', fontSize: 50}}>Đúng rồi :) !!!</Text> :
                (result === 'wrong') &&
                <Text style={{color: 'red', fontSize: 50}}>Sai rồi :(</Text> 
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
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'center'
    }, 
    board: {
        borderColor: 'black',
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
        borderColor: 'black',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    requestNumTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    }, 
    buttonContainer: {
        height: 50,
        width: 300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})