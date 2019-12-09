import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Button } from './Button'
import { FadeInView } from './FadeInView'
import { styles } from '../styles'
import { getRepeatText } from '../modules/repeat'

export { ViewPage }

const ViewPage = props => (
    <FadeInView style={styles.container}>
        <FlatList
            style={{ alignSelf: 'stretch' }}
            data={props.list}
            renderItem={({ item }) => <Item cancel={() => props.cancelOne(item)} title={item.title} date={item.date} repeatType={item.repeatType} repeatTime={item.repeatTime} />}
            keyExtractor={item => `item-${item.id}`}
        />
        <Button
            textStyle={{ ...styles.bold, ...styles.label, ...styles.roundBtnText }}
            touchStyle={{ ...styles.roundButton, ...styles.touchAction }}
            func={props.newMemo}
            text='+'
        />
        <Button
            textStyle={{ ...styles.bold, ...styles.label }}
            touchStyle={{ ...styles.touch, ...styles.touchDanger }}
            func={props.cancelAll}
            text='Cancel All Memos'
        />
    </FadeInView>
)

const Item = props => (
    <View style={styles.item}>
        <View style={styles.itemDesc}>
            <Text style={{ ...styles.bold, ...styles.label, ...styles.itemLabel }}>{props.title}</Text>
            <Text style={{ ...styles.label, ...styles.itemLabel }}>{props.date}</Text>
            <Text style={{ ...styles.label, ...styles.itemLabel }}>
                Repeat {props.repeatType == 'time'
                    ? `every ${props.repeatTime / 3600000} hours`
                    : getRepeatText(props.repeatType)}
            </Text>
        </View>
        <TouchableOpacity onPress={props.cancel}>
            <Image style={{ width: 40, height: 40 }} source={require('../icons/bin.png')} />
        </TouchableOpacity>
    </View>
)
