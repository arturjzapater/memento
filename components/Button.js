import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export { Button }

const Button = props => (
    <TouchableOpacity style={props.touchStyle} onPress={props.func}>
        <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
)