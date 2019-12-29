import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Button } from './Button'
import { FadeInView } from './FadeInView'
import { colours, styles } from '../styles'
import { getRepeatText } from '../modules/repeat'

export { ViewPage }

const ViewPage = props => (
    <FadeInView style={styles.container}>
        <FlatList
            style={{ alignSelf: 'stretch' }}
            data={props.list}
            renderItem={({ item }) => <Item cancel={() => props.cancelOne(item)} title={item.title} date={item.date} repeatType={item.repeatType} repeatTime={item.repeatTime} />}
            keyExtractor={item => `item-${item.id}`}
            ListEmptyComponent={<Empty />}
        />
        <Button
            textStyle={{ ...styles.bold, ...styles.label }}
            touchStyle={{ ...styles.touch, ...styles.touchAction }}
            func={props.newMemo}
            text='Create Memo'
        />
        <Button
            textStyle={{ ...styles.bold, ...styles.label }}
            touchStyle={{ ...styles.touch, ...styles.touchDanger }}
            func={props.cancelAll}
            text='Delete All Memos'
        />
    </FadeInView>
)

const Empty = () => (
    <View>
        <Text style={styles.label}>
            It looks like you have no memos.
        </Text>
        <Text style={styles.label}>
            Create new memos by tapping on the 'Create Memo' button!
        </Text>
    </View>
)

const Item = props => (
    <View style={styles.item}>
        <View style={styles.itemDesc}>
            <Text style={{ ...styles.bold, ...styles.label, ...styles.itemLabel }}>{props.title}</Text>
            <Text style={{ ...styles.label, ...styles.itemLabel }}>{props.date}</Text>
            <Text style={{ ...styles.label, ...styles.itemLabel }}>
                Repeat {props.repeatType == 'time'
                    ? `every ${getNumber('hour', getHours(props.repeatTime))}`
                    : getRepeatText(props.repeatType)}
            </Text>
        </View>
        <TouchableOpacity onPress={props.cancel}>
            <Icon name='md-trash' size={30} color={colours.lightMain} />
        </TouchableOpacity>
    </View>
)

const getHours = ms => ms / 3600000

const getNumber = (text, num) => num != 1 ? `${num} ${text}s` : text
