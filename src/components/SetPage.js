import React from 'react'
import { Picker, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Button } from './Button'
import { FadeInView } from './FadeInView'
import { styles } from '../styles'
import { repeatOptions } from '../modules/repeat'

export { SetPage }

const SetPage = props => (
    <FadeInView style={styles.container}>
        <ScrollView style={{ alignSelf: 'stretch' }}>
            <TextInput
                style={{ ...styles.label, ...styles.textInput }}
                onChangeText={props.titleChange}
                placeholder='Write your title (required)'
                placeholderTextColor='hsl(270, 80%, 80%)'
                value={props.memo.title}
                maxLength={40}
            />
            <TextInput
                style={{ ...styles.label, ...styles.textInput}}
                onChangeText={props.textChange}
                placeholder='Write your text (optional)'
                placeholderTextColor='hsl(270, 80%, 80%)'
                value={props.memo.text}
                maxLength={240}
                multiline={true}
                numberOfLines={3}
            />

            <Setting label='Repeat'>
                <Picker
                    style={{ ...styles.label, flex: 1, marginLeft: 40 }}
                    selectedValue={props.memo.repeat.value}
                    onValueChange={props.repeatFunc}
                >
                    {repeatOptions.map(x => <Picker.Item label={x.key} value={x.value} key={`repeat-${x.value}`} />)}
                </Picker>
            </Setting>
            {props.memo.repeat.value === 'time' && <Setting label='Every'>
                <TextInput
                    style={{ ...styles.bold, ...styles.label, flex: 1, textAlign: 'center' }}
                    onChangeText={props.repeatTimeFunc}
                    onEndEditing={props.controlNumber}
                    value={props.memo.repeatTime.toString()}
                    keyboardType='numeric'
                />
                <Text style={{ ...styles.label, marginRight: 25 }}>{props.memo.repeatTime == 1 ? 'hour' : 'hours'}</Text>
            </Setting>}

            <Setting label='Date'>
                <Button
                    func={props.dateFunc}
                    text={props.memo.date}
                    textStyle={{ ...styles.bold, ...styles.label }}
                    touchStyle={styles.touchOption}
                />
            </Setting>

            <Setting label='Time'>
                <Button
                    func={props.timeFunc}
                    text={props.memo.time}
                    textStyle={{ ...styles.bold, ...styles.label }}
                    touchStyle={styles.touchOption}
                />
            </Setting>
        </ScrollView>
        <View style={styles.group}>
            <Button
                textStyle={{ ...styles.bold, ...styles.label }}
                touchStyle={{ ...styles.touch, ...styles.touchAction }}
                func={props.submitHandler}
                text='Set Memo'
            />
            <Button
                textStyle={{ ...styles.bold, ...styles.label }}
                touchStyle={{ ...styles.touch, ...styles.touchDanger }}
                func={props.reset}
                text='Reset Fields'
            />
            <Button
                textStyle={{ ...styles.bold, ...styles.label }}
                touchStyle={styles.touch}
                func={props.cancel}
                text='Go Back'
            />
        </View>
    </FadeInView>
)

const Setting = props => (
    <View style={styles.picker}>
        <Text style={styles.label}>{props.label}</Text>
        <View style={styles.pickerOption}>
            {props.children}
        </View>
    </View>
)
