import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default function Shape(props){
    switch(props.shape){
        case 'heart':
        return(
            <AntDesign 
                name={props.isCross ? 'hearto' : 'heart'} size={50}
                style={styles.shape}
            />
        )
        case 'camera':
        return(
            <AntDesign 
                name={props.isCross ? 'camerao' : 'camera'} size={50}
                style={styles.shape}
            />
        )
        case 'clock':
        return(
            <AntDesign 
                name={props.isCross ? 'clockcircleo' : 'clockcircle'} size={50}
                style={styles.shape}
            />
        )
        case 'star':
        return(
            <AntDesign 
                name={props.isCross ? 'staro' : 'star'} size={50}
                style={styles.shape}
            />
        )
        case 'tag':
        return(
            <AntDesign 
                name={props.isCross ? 'tagso' : 'tags'} size={50}
                style={styles.shape}
            />
        )
        case 'cloud':
        return(
            <AntDesign 
                name={props.isCross ? 'cloudo' : 'cloud'} size={50}
                style={styles.shape}
            />
        )
        case 'pin':
        return(
            <AntDesign 
                name={props.isCross ? 'pushpino' : 'pushpin'} size={50}
                style={styles.shape}
            />
        )
        case 'smile':
        return(
            <AntDesign 
                name={props.isCross ? 'smileo' : 'smile-circle'} size={50}
                style={styles.shape}
            />
        )
        case 'frown':
        return(
            <AntDesign 
                name={props.isCross ? 'frowno' : 'frown'} size={50}
                style={styles.shape}
            />
        )
    }
    
}

const styles = StyleSheet.create({ 
    shape: {
        margin: 8
    },
})