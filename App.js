import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { SetPage } from './components/SetPage'
import { ViewPage } from './components/ViewPage'
import { Menu } from './components/Menu'
import { styles } from './styles'

export default function Memento() {
  const [ repeat, setRepeat ] = useState(repeatOptions[0])
  const [ repeatTime, setRepeatTime ] = useState(48)
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

  const decreaseRepeat = () => setRepeatTime(repeatTime - 1)

  const increaseRepeat = () => setRepeatTime(repeatTime + 1)

  const timeHandler = (event, newTime) => {
    setShowTimePicker(false)
    setTime( newTime ? formatTime(newTime) : time)
  }

  const toggleRepeat = () => repeat == repeatOptions[repeatOptions.length - 1]
    ? setRepeat(repeatOptions[0])
    : setRepeat(repeatOptions[repeatOptions.findIndex(x => x == repeat) + 1])

  return(
    <View style={styles.main}>
      <Text style={styles.title}>Memento</Text>
      <Menu active={page} set={() => setPage('set')} view={() => setPage('view')} />
      {page == 'set' && <SetPage
        title={title}
        titleChange={newText => setTitle(newText)}
        text={text}
        textChange={newText => setText(newText)}
        repeat={repeat}
        repeatFunc={toggleRepeat}
        repeatTime={repeatTime}
        repeatTimeFunc={newTime => setRepeatTime(+newTime)}
        decreaseRepeat={decreaseRepeat}
        increaseRepeat={increaseRepeat}
        dateText={date}
        dateFunc={() => setShowDatePicker(true)}
        timeText={time}
        timeFunc={() => setShowTimePicker(true)}
      />}

      {page == 'view' && <ViewPage />}

      {showDatePicker && <DateTimePicker value={new Date(date)} minimumDate={now} onChange={dateHandler} />}
      {showTimePicker && <DateTimePicker mode='time' value={new Date(`${date} ${time}`)} minimumDate={now} minimumDate={now} onChange={timeHandler} />}
    </View>
  )
}

const formatMinutes = minutes => minutes.toString().length == 1 ? `0${minutes}` : minutes

const formatTime = time => `${time.getHours()}:${formatMinutes(time.getMinutes())}`

const now = new Date()

const repeatOptions = [
  { key: 'Never', value: undefined },
  { key: 'Monthly', value: 'month' },
  { key: 'Weekly', value: 'week' },
  { key: 'Daily', value: 'day' },
  { key: 'Custom', value: 'time' },
]
