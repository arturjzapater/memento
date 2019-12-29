import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colours, styles } from '../styles'

export { Toolbar }

const Toolbar = props => (
    <View>
        {props.items.map(x => <Item icon={props.icon} label={props.label} key={`tool-${props.label}`} />)}
    </View>
)

const Item = props => (
    <View>
        <Icon name={props.icon} size={30} />
        <Text>{props.label}</Text>
    </View>
)