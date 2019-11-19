import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import NotifService from '../NotifService'
import { Button } from './Button'
import { styles } from '../styles'

export { SetPage }

const notif = new NotifService()

const SetPage = props => (
    <>
        <View styles={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={props.titleChange}
                placeholder='Write your title'
                value={props.title}
                maxLength={30}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={props.textChange}
                placeholder='Write your text'
                value={props.text}
                maxLength={240}
                multiline={true}
                numberOfLines={4}
            />
    
            <TouchableOpacity style={styles.touchable} onPress={props.repeatFunc}>
            <Text style={styles.label}>Repeat: </Text>
            <Text style={styles.labelBold}>{props.repeat.key}</Text>
            </TouchableOpacity>
    
            {props.repeat.value == 'time' && <RepeatTile 
                repeatTime={props.repeatTime}
                repeatTimeFunc={props.repeatTimeFunc}
                decreaseRepeat={props.decreaseRepeat}
                increaseRepeat={props.increaseRepeat}
            />}
    
            <Button
                textStyle={styles.labelBold}
                touchStyle={styles.touchable}
                func={props.dateFunc}
                text={props.dateText}
            />
            <Button
                textStyle={styles.labelBold}
                touchStyle={styles.touchable}
                func={props.timeFunc}
                text={props.timeText}
            />
    
            <Button
                textStyle={styles.labelBold}
                touchStyle={styles.touchableActive}
                func={() => notif.scheduleNotif(props.title, props.text, `${props.dateText} ${props.timeText}`, props.repeat.value, props.repeatTime)}
                text='Set Notification'
            />
        </View>
    </>
)
/*
const Button = props => (
    <TouchableOpacity style={props.touchStyle} onPress={props.func}>
        <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
)*/

const RepeatTile = props => (
    <View style={styles.row}>
        <SignButton style={styles.touchMinus} text='-' func={props.decreaseRepeat} />
        <Text style={styles.label}>Every </Text>
        <TextInput
            style={{ ...styles.labelBold, ...styles.timeInput }}
            onChangeText={props.repeatTimeFunc}
            value={props.repeatTime.toString()}
            keyboardType='numeric'
        />
        <Text style={styles.label}> hours</Text>
        <SignButton style={styles.touchPlus} text='+' func={props.increaseRepeat} />
    </View>
)

const SignButton = props => (
    <TouchableOpacity style={{ ...styles.touchButton, ...props.style}} onPress={props.func}>
      <Text style={styles.labelBold}>{props.text}</Text>
    </TouchableOpacity>
  )