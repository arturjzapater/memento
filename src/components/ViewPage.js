import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FadeInView } from './FadeInView'
import { colours, styles } from '../styles'
import { getRepeatText } from '../modules/repeat'

export { ViewPage }

const ViewPage = props => (
    <FadeInView style={styles.container}>
        {props.status == 'loading'
            ? <Text style={styles.label}>Loading...</Text>
            : props.list.length > 0
            ? <FlatList
                style={{ alignSelf: 'stretch' }}
                data={props.list}
                renderItem={({ item }) => <Item delete={() => props.delete(item)} title={item.title} date={item.date} repeatType={item.repeatType} repeatTime={item.repeatTime} />}
                keyExtractor={item => `item-${item.id}`}
            />
            : <Empty />}
    </FadeInView>
)

const Empty = () => (
    <View style={styles.empty}>
        <Text style={{ ...styles.label, ...styles.emptyText }}>
            It looks like you have no memos.
        </Text>
        <Text style={{ ...styles.label, ...styles.emptyText }}>
            Create new memos by tapping on the 'New Memo' button!
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
        <TouchableOpacity onPress={props.delete}>
            <Icon name='md-trash' size={30} color={colours.lightMain} />
        </TouchableOpacity>
    </View>
)

const getHours = ms => ms / 3600000

const getNumber = (text, num) => num != 1 ? `${num} ${text}s` : text
