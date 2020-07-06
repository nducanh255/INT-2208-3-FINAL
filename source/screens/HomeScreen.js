import React from 'react' 
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default function HomeScreen(props){
    return(
        <View style={styles.container}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    style={styles.bgImg}
                    source={require('../assets/images/shapes_home_background.jpg')}
                    resizeMode={'repeat'}
                />
                <View style={styles.subContainer}>
                    <Text style={styles.headerTitle}>Gạch bớt theo yêu cầu</Text>
                    <Text style={styles.content}>Khi chơi, người chơi nhấn vào các hình để bỏ bớt những sao cho đủ số lượng theo yêu cầu của mỗi màn chơi.</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <AntDesign name='heart' size={80} color={'#E55982'}/>
                        <AntDesign name='arrowright' size={60} style={{paddingHorizontal: 20}}/>
                        <AntDesign name='hearto' size={80} color={'#E881A6'}/>
                    </View>
                    <Text style={styles.content}>Khi kết thúc, người chơi nhận được tất cả kết quả của các màn chơi.</Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Shapes')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Bắt đầu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    style={styles.bgImg}
                    source={require('../assets/images/duck_home_background.jpg')}
                    resizeMode={'repeat'}
                />
                <View style={styles.subContainer}>
                    <Text style={styles.headerTitle}>Gạch những chú vịt sai</Text>
                    <Text style={styles.content}>Tại mỗi màn chơi, sẽ có những chú vịt đưa ra các phép tính có kết quả đúng hoặc sai theo yêu cầu.</Text>
                    <View style={[styles.row, {paddingVertical: 10}]}>
                        <Image 
                            source={require('../assets/images/duck_04.jpg')}
                            style={{width: 100, height: 100}}
                            resizeMode={'stretch'}
                        />
                        <Image 
                            source={require('../assets/images/duck_03.jpg')}
                            style={{width: 100, height: 100}}
                            resizeMode={'stretch'}
                        />
                        <Image 
                            source={require('../assets/images/duck_02.jpg')}
                            style={{width: 100, height: 100}}
                            resizeMode={'stretch'}
                        />
                        <Image 
                            source={require('../assets/images/duck_05.jpg')}
                            style={{width: 100, height: 100}}
                            resizeMode={'stretch'}
                        />
                        <Image 
                            source={require('../assets/images/duck_06.jpg')}
                            style={{width: 100, height: 100}}
                            resizeMode={'stretch'}
                        />
                    </View>
                    <Text style={styles.content}>Người chơi sẽ phải loại bỏ những câu trả lời sai bằng cách gạch những chú vịt sai.</Text>
                    <Text style={styles.content}>Khi kết thúc, người chơi nhận được tất cả kết quả của các màn chơi.</Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Ducks')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Bắt đầu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'center', 
    },
    subContainer: {
        width: 500, 
        height: 500, 
        borderRadius: 50, 
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bgImg: {
        height: '100%',
        width: '100%', 
        position: 'absolute',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#FF5800',
        textAlign: 'center',
        paddingVertical: 10
    },
    content: {
        fontSize: 20,
        marginHorizontal: 20,
    },
    button: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#004731',
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
        // align to the bottom
        position: 'absolute',
        bottom: 20,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})