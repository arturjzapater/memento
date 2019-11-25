import React from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from './Button'
import { styles } from '../styles'

export { SetPage }

const SetPage = props => (
    <View style={styles.container}>
        <ScrollView style={{ alignSelf: 'stretch' }}>
            <TextInput
                style={{ ...styles.label, ...styles.textInput }}
                onChangeText={props.titleChange}
                placeholder='Write your title'
                value={props.notification.title}
                maxLength={30}
            />
            <TextInput
                style={{ ...styles.label, ...styles.textInput}}
                onChangeText={props.textChange}
                placeholder='Write your text'
                value={props.notification.text}
                maxLength={240}
                multiline={true}
                numberOfLines={3}
            />
            <TouchableOpacity style={styles.touch} onPress={props.repeatFunc}>
            <Text style={styles.label}>Repeat: </Text>
            <Text style={{ ...styles.bold, ...styles.label }}>{props.notification.repeat.key}</Text>
            </TouchableOpacity>

            {props.notification.repeat.value == 'time' && <RepeatTile 
                repeatTime={props.notification.repeatTime}
                repeatTimeFunc={props.repeatTimeFunc}
                decreaseRepeat={props.decreaseRepeat}
                increaseRepeat={props.increaseRepeat}
            />}

            <Button
                textStyle={{ ...styles.bold, ...styles.label }}
                touchStyle={styles.touch}
                func={props.dateFunc}
                text={props.notification.date}
            />
            <Button
                textStyle={{ ...styles.bold, ...styles.label }}
                touchStyle={styles.touch}
                func={props.timeFunc}
                text={props.notification.time}
            />
        </ScrollView>
        <View style={styles.group}>
            <Button
                textStyle={{ ...styles.bold, ...styles.label }}
                touchStyle={{ ...styles.touch, ...styles.touchAction }}
                func={props.submitHandler}
                text='Set Notification'
            />
            <Button
                textStyle={{ ...styles.bold, ...styles.label }}
                touchStyle={{ ...styles.touch, ...styles.touchDanger }}
                func={props.reset}
                text='Reset Fields'
            />
        </View>
    </View>
)

const RepeatTile = props => (
    <View style={styles.touchRow}>
        <SignButton style={styles.touchLeft} text='-' func={props.decreaseRepeat} />
        <Text style={styles.label}>Every </Text>
        <TextInput
            style={{ ...styles.bold, ...styles.label, ...styles.timeInput }}
            onChangeText={props.repeatTimeFunc}
            value={props.repeatTime.toString()}
            keyboardType='numeric'
        />
        <Text style={styles.label}> hours</Text>
        <SignButton style={styles.touchRight} text='+' func={props.increaseRepeat} />
    </View>
)

const SignButton = props => (
    <TouchableOpacity style={{ ...styles.touch, ...props.style}} onPress={props.func}>
      <Text style={{ ...styles.bold, ...styles.label }}>{props.text}</Text>
    </TouchableOpacity>
)
