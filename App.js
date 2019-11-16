import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import NotifService from './NotifService'
import { styles } from './styles'

const notif = new NotifService()

export default function Memento() {
  const now = new Date()

  const [ repeat, setRepeat ] = useState(repeatOptions[0])
  const [ date, setDate ] = useState(now.toDateString())
  const [ time, setTime ] = useState(formatTime(now))
  const [ showDatePicker, setShowDatePicker ] = useState(false)
  const [ showTimePicker, setShowTimePicker ] = useState(false)

  const [ text, setText ] = useState('')
  const [ title, setTitle ] = useState('')

  const [ page, setPage ] = useState('set')

  const dateHandler = (event, newDate) => {
    setShowDatePicker(false)
    setDate(newDate ? newDate.toDateString() : date)
  }

  const timeHandler = (event, newTime) => {
    setShowTimePicker(false)
    setTime( newTime ? formatTime(newTime) : time)
  }

  const toggleRepeat = () => repeat == repeatOptions[repeatOptions.length - 1]
    ? setRepeat(repeatOptions[0])
    : setRepeat(repeatOptions[repeatOptions.findIndex(x => x == repeat) + 1])

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Memento</Text>
      <Menu active={page} set={() => setPage('set')} view={() => setPage('view')} />
      {page == 'set' && <Settings
        title={title}
        titleChange={newText => setTitle(newText)}
        text={text}
        textChange={newText => setText(newText)}
        repeat={repeat}
        repeatFunc={toggleRepeat}
        dateText={date}
        dateFunc={() => setShowDatePicker(true)}
        timeText={time}
        timeFunc={() => setShowTimePicker(true)}
      />}

      {showDatePicker && <DateTimePicker value={new Date(date)} minimumDate={now} onChange={dateHandler} />}
      {showTimePicker && <DateTimePicker mode='time' value={new Date(`${date} ${time}`)} minimumDate={now} minimumDate={now} onChange={timeHandler} />}
    </View>
  )
}

const Button = props => (
  <TouchableOpacity style={props.touchStyle} onPress={props.func}>
    <Text style={props.textStyle}>{props.text}</Text>
  </TouchableOpacity>
)

const Menu = props => (
  <View style={styles.menu}>
    <Button
      textStyle={styles.label}
      touchStyle={props.active == 'set' ? styles.touchMenuActive : styles.touchMenu}
      func={props.set}
      text='Set Memo'
    />
    <Button
      textStyle={styles.label}
      touchStyle={props.active == 'view' ? styles.touchMenuActive : styles.touchMenu}
      func={props.view}
      text='View Memos'
    />
  </View>
)

const Settings = props => (
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
    </View>
    <View styles={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={props.repeatFunc}>
        <Text style={styles.label}>Repeat: </Text>
        <Text style={styles.labelBold}>{props.repeat.key}</Text>
      </TouchableOpacity>

      {props.repeatText == 'Custom' && <Button textStyle={styles.labelBold} touchStyle={styles.touchable} text='Coming Soon!' />}

      <Button textStyle={styles.labelBold} touchStyle={styles.touchable} func={props.dateFunc} text={props.dateText} />
      <Button textStyle={styles.labelBold} touchStyle={styles.touchable} func={props.timeFunc} text={props.timeText} />
    </View>
    <View>
      <Button
        textStyle={styles.labelBold}
        touchStyle={styles.touchableActive}
        text='Set Notification'
        func={() => notif.scheduleNotif(props.title, props.text, `${props.dateText} ${props.timeText}`, props.repeat.value)}
      />
    </View>
  </>
)

const formatMinutes = minutes => minutes.toString().length == 1 ? `0${minutes}` : minutes

const formatTime = time => `${time.getHours()}:${formatMinutes(time.getMinutes())}`

const repeatOptions = [
  { key: 'Never', value: undefined },
  { key: 'Monthly', value: 'month' },
  { key: 'Weekly', value: 'week' },
  { key: 'Daily', value: 'day' },
  { key: 'Custom', value: undefined }, //Change value to 'time'
]
