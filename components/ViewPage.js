import React, { useEffect, useReducer } from 'react'
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Button } from './Button'
import { FadeInView } from './FadeInView'
import { styles } from '../styles'
import { findAndRemoveold } from '../StoreService'
import { cancelAllNotifs, cancelNotif } from '../NotifService'
import { getRepeatText } from '../modules/repeat'

export { ViewPage }

const actions = {
    LOAD: (state, action) => ({
        ...state,
        status: 'loading',
    }),
    RESOLVE: (state, action) => ({
        ...state,
        status: 'success',
        data: action.data,
    }),
    REJECT: (state, action) => ({
        ...state,
        status: 'failure',
        error: action.error,
    }),
    default: state => state,
}

const reducer = (state, action) => {
    const handler = actions[action.type] || actions.default
    return handler(state, action)
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

    const cancel = id => cancelNotif(id)
            .then(_ => dispatch({ type: 'LOAD' }))
    
    const cancelAll = () => Alert.alert(
        'Are you sure?',
        'This action will cancel every single memo you have scheduled, including snoozed ones. Do you really want to do that?',
        [
            {
                text: 'Yes, proceed',
                onPress: () => cancelAllNotifs()
                    .then(_ => dispatch({ type: 'LOAD' })),
            },
            {
                text: 'I\'ve changed my mind',
            }
        ]
    )

    return(
        <FadeInView style={styles.container}>
            <FlatList
                style={{ alignSelf: 'stretch' }}
                data={state.data}
                renderItem={({ item }) => <Item cancel={() => cancel(item.id)} title={item.title} date={item.date} repeatType={item.repeatType} repeatTime={item.repeatTime} />}
                keyExtractor={item => `item-${item.id}`}
            />
            <Button
                textStyle={{ ...styles.bold, ...styles.label }}
                touchStyle={{ ...styles.touch, ...styles.touchDanger }}
                func={cancelAll}
                text='Cancel All Memos'
            />
        </FadeInView>
    )
}

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
            <Image style={{ width: 30, height: 30 }} source={require('./rubbish-bin.png')} /> 
            {/* from https://icons8.com */}
        </TouchableOpacity>
    </View>
)
