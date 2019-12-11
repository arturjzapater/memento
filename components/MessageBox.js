import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles'

export { MessageBox }

const MessageBox = props => (
  <View style={styles.msgBox}>
    <Text style={styles.message}>{props.text}</Text>
    {props.toDelete != null && typeof props.toDelete != 'string' && <Undo undo={props.undo} />}
    <TouchableOpacity onPress={props.close}>
      <Image style={{ width: 20, height: 20 }} source={require('../icons/close.png')} />
    </TouchableOpacity>
  </View>
)

const Undo = props => (
  <TouchableOpacity onPress={props.undo}>
    <Text style={{ ...styles.message, ...styles.bold }}>Undo</Text>
  </TouchableOpacity>
)
