import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FadeOutView } from './FadeOutView'
import { styles } from '../styles'

export { MessageBox }

const MessageBox = props => (
  <FadeOutView style={styles.msgBox}>
    <Text style={styles.message}>{props.text}</Text>
    {props.toDelete != null && typeof props.toDelete != 'string' && <Undo undo={props.undo} />}
    <TouchableOpacity onPress={props.close}>
      <Icon name='md-close-circle' size={28} color='rgba(0, 0, 0, 0.7)' />
    </TouchableOpacity>
  </FadeOutView>
)

const Undo = props => (
  <TouchableOpacity onPress={props.undo}>
    <Text style={{ ...styles.message, ...styles.bold }}>Undo</Text>
  </TouchableOpacity>
)
