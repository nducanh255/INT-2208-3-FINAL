import React from 'react'
import { View, Text, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function DucksScreen(){
    return(
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Image 
                style={{height: '100%', width: '100%', position: 'absolute'}}
                source={require('../assets/images/background_ducks.jpg')}
                resizeMode={'stretch'}
            />
            <FlatList
                data={[{eq: '1+3=4'}, {eq: '1+3=4'}, {eq: '1+3=4'}, {eq: '1+3=4'}, {eq: '1+3=4'}]}
                renderItem ={({item, index}) => (
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <View style={{height: 50, width: 150, backgroundColor: 'white'}}>
                            <Text>{item.eq}</Text>
                        </View>
                        <Image 
                            style={{height: 150, width: 150}}
                            source={require('../assets/images/duck_0' + (index+2) +'.jpg')}
                            resizeMode={'cover'}
                        />
                    </View>
                )}
                horizontal={true}
            />
            <Text>Ducks Screen</Text>
        </View>
    )
}