import React, { useEffect, useReducer, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../styles'
import { find, findAndRemoveold } from '../StoreService'
import NotifService from '../NotifService'

export { ViewPage }

const notif = new NotifService()

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD':
            return {
                ...state,
                status: 'loading',
            }
        case 'RESOLVE':
            return {
                ...state,
                status: 'success',
                data: action.data,
            }
        case 'REJECT':
            return {
                ...state,
                status: 'failure',
                error: action.error,
            }
        default:
            return state
    }
}

const initialState = {
    status: 'loading',
    data: [],
    error: null,
}

const ViewPage = props => {
    const [ state, dispatch ] = useReducer(reducer, initialState)

    useEffect(() => {
        if (state.status == 'loading') findAndRemoveold()
            .then(data => data.sort((a, b) => new Date(a.date) > new Date(b.date)))
            .then(data => dispatch({ type: 'RESOLVE', data }))
            .catch(err => dispatch({ type: 'REJECT', err }))
    }, [state.status])

    const cancel = id => notif.cancelNotif(id)
            .then(d => dispatch({ type: 'LOAD' }))
    

    return(
        <View style={styles.container}>
            <FlatList
                data={state.data}
                renderItem={({ item }) => <Item cancel={() => cancel(item.id)} title={item.title} date={item.date} repeatType={item.repeatType} repeatTime={item.repeatTime} />}
                keyExtractor={item => `item-${item.id}`}
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
        <TouchableOpacity onPress={props.cancel}>
            <Text style={{ fontSize: 30 }}>D</Text>
        </TouchableOpacity>
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
