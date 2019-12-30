import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colours, styles } from '../styles'

export { Toolbar }

const Toolbar = props => (
    <View style={styles.toolbar}>
        {props.items.map(x => <Item icon={x.icon} label={x.label} key={`tool-${x.label}`} action={x.action} />)}
    </View>
)

const Item = props => (
    <TouchableOpacity style={styles.toolItem} onPress={props.action}>
        <Icon name={props.icon} size={30} color={colours.lightMain} />
        <Text style={styles.toolLabel}>{props.label}</Text>
    </TouchableOpacity>
)