import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from '../styles'

export { Menu }

const Menu = props => {
  const label = props.active == 'set'
    ? 'Create New Memo'
    : 'View Memos'
  return(
    <>
      <View style={styles.menu}>
        <Text style={{ ...styles.label, ...styles.menuText }}>{label}</Text>
      </View>
      <View style={styles.logo}>
        <Image source={require('../icons/app.png')} />
      </View>
    </>
  )
}
