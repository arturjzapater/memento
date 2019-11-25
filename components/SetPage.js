import React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from './Button'
import { styles } from '../styles'

export { SetPage }

const SetPage = props => (
    <>
        <View styles={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={props.titleChange}
                placeholder='Write your title'
                value={props.notification.title}
                maxLength={30}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={props.textChange}
                placeholder='Write your text'
                value={props.notification.text}
                maxLength={240}
                multiline={true}
                numberOfLines={3}
            />
    
            <TouchableOpacity style={styles.touchable} onPress={props.repeatFunc}>
            <Text style={styles.label}>Repeat: </Text>
            <Text style={styles.labelBold}>{props.notification.repeat.key}</Text>
            </TouchableOpacity>
    
            {props.notification.repeat.value == 'time' && <RepeatTile 
                repeatTime={props.notification.repeatTime}
                repeatTimeFunc={props.repeatTimeFunc}
                decreaseRepeat={props.decreaseRepeat}
                increaseRepeat={props.increaseRepeat}
            />}
    
            <Button
                textStyle={styles.labelBold}
                touchStyle={styles.touchable}
                func={props.dateFunc}
                text={props.notification.date}
            />
            <Button
                textStyle={styles.labelBold}
                touchStyle={styles.touchable}
                func={props.timeFunc}
                text={props.notification.time}
            />
    
            <Button
                textStyle={styles.labelBold}
                touchStyle={styles.touchableActive}
                func={props.submitHandler}
                text='Set Notification'
            />
            <Button
                textStyle={styles.labelBold}
                touchStyle={styles.touchDanger}
                func={props.reset}
                text='Reset Fields'
            />
        </View>
    </>
)

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
