import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FadeOutView } from './FadeOutView'
import { colours, styles } from '../styles'

export { MessageBox }

const MessageBox = props => (
  <FadeOutView style={styles.msgBox} onFadeOut={props.onFadeOut} onUnmount={props.onUnmount}>
    <Text style={styles.message}>{props.text}</Text>
    {props.toDelete != null && typeof props.toDelete != 'string' && <Undo undo={props.undo} />}
    <TouchableOpacity onPress={props.close}>
      <Icon name='md-close-circle-outline' size={28} color={colours.darkDetail} />
    </TouchableOpacity>
  </FadeOutView>
)

const Undo = props => (
  <TouchableOpacity onPress={props.undo}>
    <Text style={{ ...styles.message, ...styles.bold }}>Undo</Text>
  </TouchableOpacity>
)
