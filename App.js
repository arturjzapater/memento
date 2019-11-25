import React, { useState } from 'react'
import { Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Menu } from './components/Menu'
import { MessageBox } from './components/MessageBox'
import { SetPage } from './components/SetPage'
import { ViewPage } from './components/ViewPage'
import { styles } from './styles'
import { scheduleNotif } from './NotifService'

export default () => {
  const [ notification, setNotification ] = useState(setInitialState())
  const [ showDatePicker, setShowDatePicker ] = useState(false)
  const [ showTimePicker, setShowTimePicker ] = useState(false)
  const [ page, setPage ] = useState('set')
  const [ message, setMessage ] = useState('')

  const dateHandler = (event, newDate) => {
    setShowDatePicker(false)
    setNotification({
      ...notification,
      date: newDate ? newDate.toDateString() : notification.date,
    })
  }

  const decreaseRepeat = () => setNotification({
    ...notification,
    repeatTime: notification.repeatTime - 1
  })

  const increaseRepeat = () => setNotification({
    ...notification,
    repeatTime: notification.repeatTime + 1
  })

  const resetFields = () => setNotification(setInitialState())

  const showSet = () => {
    setPage('set')
    setMessage('')
  }

  const showView = () => {
    setPage('view')
    setMessage('')
  }

  const submitHandler = () => {
    scheduleNotif(notification.title, notification.text, `${notification.date} ${notification.time}`, notification.repeat.value, notification.repeatTime)
    setMessage(`I will remind you about ${notification.title}!`)
    setNotification({
      ...notification,
      title: '',
      text: '',
      repeat: repeatOptions[0]
    })
  }

  const timeHandler = (event, newTime) => {
    setShowTimePicker(false)
    setNotification({
      ...notification,
      time: newTime ? formatTime(newTime) : notification.time,
    })
  }

  const toggleRepeat = () => notification.repeat == repeatOptions[repeatOptions.length - 1]
    ? setNotification({
      ...notification,
      repeat: repeatOptions[0],
    })
    : setNotification({
      ...notification,
      repeat: repeatOptions[repeatOptions.findIndex(x => x == notification.repeat) + 1],
    })

  return(
    <View style={styles.main}>
      {message != '' && <MessageBox text={message} close={() => setMessage('')} />}
      
      {page == 'set' && <SetPage
        notification={notification}
        titleChange={newText => setNotification({ ...notification, title: newText })}
        textChange={newText => setNotification({ ...notification, text: newText })}
        repeatFunc={toggleRepeat}
        repeatTimeFunc={newTime => setNotification({ ...notification, repeatTime: +newTime })}
        decreaseRepeat={decreaseRepeat}
        increaseRepeat={increaseRepeat}
        dateFunc={() => setShowDatePicker(true)}
        timeFunc={() => setShowTimePicker(true)}
        submitHandler={submitHandler}
        reset={resetFields}
      />}

      {page == 'view' && <ViewPage />}

      <Menu active={page} set={showSet} view={showView} />

      {showDatePicker && <DateTimePicker value={new Date(notification.date)} minimumDate={now} onChange={dateHandler} />}
      {showTimePicker && <DateTimePicker mode='time' value={new Date(`${notification.date} ${notification.time}`)} minimumDate={now} minimumDate={now} onChange={timeHandler} />}
    </View>
  )
}

const formatMinutes = minutes => minutes.toString().length == 1 ? `0${minutes}` : minutes

const formatTime = time => `${time.getHours()}:${formatMinutes(time.getMinutes())}`

const setInitialState = () => {
  const now = new Date()
  return {
    title: '',
    text: '',
    repeat: repeatOptions[0],
    repeatTime: 48,
    date: now.toDateString(),
    time: formatTime(now),
  }
}

const now = new Date()

const repeatOptions = [
  { key: 'Never', value: undefined },
  { key: 'Monthly', value: 'month' },
  { key: 'Weekly', value: 'week' },
  { key: 'Daily', value: 'day' },
  { key: 'Custom', value: 'time' },
]
