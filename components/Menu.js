import React from 'react'
import { View } from 'react-native'
import { Button } from './Button'
import { styles } from '../styles'

export { Menu }

const Menu = props => {
  const [ align, func, label ] = props.active == 'set'
    ? [ 'flex-end', props.view, 'View Memos' ]
    : [ 'flex-start', props.set, 'Create New Memo' ]
  return(
    <View style={{ ...styles.menu, justifyContent: align }}>
      <Button
        textStyle={styles.label}
        touchStyle={{ ...styles.touch }}
        func={func}
        text={label}
      />
    </View>
  )
}