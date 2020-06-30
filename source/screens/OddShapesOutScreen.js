import React, { useState } from 'react'
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default function ShapesScreen(){
    const [requestNum, setRequestNum] = useState(Math.floor(Math.random() * 20))
    const [isSubmit, setSubmit] = useState(false)
    const [result, setResult] = useState('')

    var initBoard = []
    for(let i = 0; i < 20; i++){
        initBoard.push({id: i, isCross: false})
    }
    const [board, setBoard] = useState(initBoard)

    const checkResult = () => {
        setSubmit(true)
        let count = 0
        board.forEach(element => {
            if(element.isCross === false)
                count++
        })
        if(count === requestNum) 
            setResult('correct')
        else
            setResult('wrong')
        console.log(result)
    }

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
                            <AntDesign 
                                name={item.isCross ? 'hearto' : 'heart'} size={50}
                                style={styles.shape}
                            />
                        </TouchableOpacity>
                    )}
                    numColumns={5}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title='Nộp bài'
                    onPress={() => {
                        setSubmit(true)
                    }}
                />
                <Button
                    title='Kết thúc'
                    onPress={() => setSubmit(isSubmit)}
                />
            </View>
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