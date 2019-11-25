import React from 'react'
import { View } from 'react-native'
import { Button } from './Button'
import { styles } from '../styles'

export { Menu }

const Menu = props => (
    <View style={styles.menu}>
      <Button
        textStyle={styles.label}
        touchStyle={props.active == 'set'
          ? { ...styles.touch, ...styles.touchMenuActive }
          : { ...styles.touch, ...styles.touchMenu }}
        func={props.set}
        text='Set Memo'
      />
      <Button
        textStyle={styles.label}
        touchStyle={props.active == 'view'
          ? { ...styles.touch, ...styles.touchMenuActive }
          : { ...styles.touch, ...styles.touchMenu }}
        func={props.view}
        text='View Memos'
      />
    </View>
  )