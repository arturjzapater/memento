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
    <View style={{ ...styles.menu, justifyContent: align }}>
      <Image style={{ ...styles.touch, width: 40, height: 40 }} source={require('../icons/app.png')} />
      <Button
        textStyle={styles.label}
        touchStyle={{ ...styles.touch }}
        func={func}
        text={label}
      />
    </View>
  )
}
