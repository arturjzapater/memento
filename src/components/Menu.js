import React from 'react'
import { Image, View } from 'react-native'
import { Button } from './Button'
import { styles } from '../styles'

export { Menu }

const Menu = props => {
  const [ align, func, label ] = props.active == 'set'
    ? [ 'space-between', props.view, 'View Memos' ]
    : [ 'flex-start', props.set, 'Create New Memo' ]
  return(
    <>
      <View style={{ ...styles.menu }}>
        <Button
          textStyle={styles.label}
          touchStyle={{ ...styles.touch, marginBottom: 0, paddingBottom: 3 }}
          func={func}
          text={label}
        />
      </View>
      <View style={styles.logo}>
        <Image source={require('../icons/app.png')} />
      </View>
    </>
  )
}
