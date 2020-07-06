import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default function Shape(props){
    const size = 60
    switch(props.shape){
        case 'heart':
        return(
            <AntDesign 
                name={props.isCross ? 'hearto' : 'heart'} size={size}
                style={styles.shape}
                color={props.color}
            />
        )
        case 'camera':
        return(
            <AntDesign 
                name={props.isCross ? 'camerao' : 'camera'} size={size}
                style={styles.shape}
                color={props.color}
            />
        )
        case 'clock':
        return(
            <AntDesign 
                name={props.isCross ? 'clockcircleo' : 'clockcircle'} size={size}
                style={styles.shape}
                color={props.color}
            />
        )
        case 'star':
        return(
            <AntDesign 
                name={props.isCross ? 'staro' : 'star'} size={size}
                style={styles.shape}
                color={props.color}
            />
        )
        case 'tag':
        return(
            <AntDesign 
                name={props.isCross ? 'tagso' : 'tags'} size={size}
                style={styles.shape}
                color={props.color}
            />
        )
        case 'cloud':
        return(
            <AntDesign 
                name={props.isCross ? 'cloudo' : 'cloud'} size={size}
                style={styles.shape}
                color={props.color}
            />
        )
        case 'pin':
        return(
            <AntDesign 
                name={props.isCross ? 'pushpino' : 'pushpin'} size={size}
                style={styles.shape}
                color={props.color}
            />
        )
        case 'smile':
        return(
            <AntDesign 
                name={props.isCross ? 'smileo' : 'smile-circle'} size={size}
                style={styles.shape}
                color={props.color}
            />
        )
        case 'frown':
        return(
            <AntDesign 
                name={props.isCross ? 'frowno' : 'frown'} size={size}
                style={styles.shape}
                color={props.color}
            />
        )
    }
    
}

const styles = StyleSheet.create({ 
    shape: {
        margin: 8
    },
})