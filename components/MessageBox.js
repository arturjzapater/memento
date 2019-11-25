import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles'

export { MessageBox }

const MessageBox = props => (
    <View style={styles.msgBox}>
      <Text style={{ ...styles.bold, ...styles.message }}>{props.text}</Text>
      <TouchableOpacity onPress={props.close}>
        <Text style={{ fontSize: 20 }}>X</Text>
      </TouchableOpacity>
    </View>
  )