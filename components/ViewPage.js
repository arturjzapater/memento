import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { styles } from '../styles'
import { find } from '../StoreService'

export { ViewPage }

const ViewPage = props => {
    const [ data, setData ] = useState({})

    useEffect(() => {
        find()
            .then(setData)
    }, [])

    return(
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item title={item.title} date={item.date} repeatType={item.repeatType} repeatTime={item.repeatTime} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const Item = props => (
    <View style={styles.item}>
        <View style={styles.description}>
            <Text style={{ ...styles.labelBold, ...styles.itemLabel }}>{props.title}</Text>
            <Text style={{ ...styles.label, ...styles.itemLabel }}>{props.date}</Text>
            <Text style={{ ...styles.label, ...styles.itemLabel }}>
                Repeat {props.repeatType == 'time'
                    ? `every ${props.repeatTime / 3600000} hours`
                    : getRepeatText(props.repeatType)}
            </Text>
        </View>
        <Text style={{ fontSize: 30 }}>D</Text>
    </View>
)

const getRepeatText = value => repeatOptions.find(x => x.value == value).key

const repeatOptions = [
    { key: 'Never', value: undefined },
    { key: 'Monthly', value: 'month' },
    { key: 'Weekly', value: 'week' },
    { key: 'Daily', value: 'day' },
    { key: 'Custom', value: 'time' },
]
