import React, { useEffect, useReducer, useState } from 'react'
import { Alert, KeyboardAvoidingView, StatusBar } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Menu } from './components/Menu'
import { MessageBox } from './components/MessageBox'
import { SetPage } from './components/SetPage'
import { ViewPage } from './components/ViewPage'
import { styles } from './styles'
import { cancelAllNotifs, cancelNotif, scheduleNotif } from './NotifService'
import reducer from './StateService'
import { findAndRemoveold } from './StoreService'
import { repeatOptions } from './modules/repeat'

const initialState = {
  message: '',
  page: 'view',
  status: 'loading',
  data: [],
  error: null,
}

export default () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const [ showDatePicker, setShowDatePicker ] = useState(false)
  const [ showTimePicker, setShowTimePicker ] = useState(false)
  const [ notification, setNotification ] = useState(resetNotification())

  useEffect(() => {
      if (state.status == 'loading') findAndRemoveold()
          .then(data => data.sort((a, b) => new Date(a.date) > new Date(b.date)))
          .then(data => dispatch({ type: 'RESOLVE', data }))
          .catch(err => dispatch({ type: 'REJECT', err }))
  }, [state.status])

  const cancel = notification => cancelNotif(notification.id)
    .then(_ => dispatch({ type: 'LOAD', message: `${notification.title} succesfully deleted.` }))
  
  const cancelAll = () => Alert.alert(
      'Are you sure?',
      'This action will cancel every single memo you have scheduled, including snoozed ones. Do you really want to do that?',
      [
          {
              text: 'Yes, proceed',
              onPress: () => cancelAllNotifs()
                  .then(_ => dispatch({ type: 'LOAD', message: 'Deleted all memos.' })),
          },
          {
              text: 'I\'ve changed my mind',
          }
      ]
  )

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

  const resetFields = () => setNotification(resetNotification())

  const submitHandler = () => {
    const error = validateInput()
    if (error == null) {
      scheduleNotif({
          ...notification,
          date: `${notification.date} ${notification.time}`,
          repeatType: notification.repeat.value,
        })
        .then(() => dispatch({ type: 'LOAD', message: `I will remind you about ${notification.title}!`}))
        .then(resetFields)
    } else Alert.alert('Wait a moment!', error.join('\n'))
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

  const validateInput = () => {
    error = []
    if (notification.title == '') error.push('You must write a title')
    if (new Date(`${notification.date} ${notification.time}`) < new Date()) error.push('You must set a date in the future')
    return error.length <= 0 ? null : error
  }

  return(
    <KeyboardAvoidingView style={styles.main} behavior='height' enabled>
      <StatusBar hidden={true} />
      <Menu active={state.page} set={() => dispatch({ type: 'NEW' })} view={() => dispatch({ type: 'LOAD' })} />

      {state.message != '' && <MessageBox
        text={state.message}
        close={() => dispatch({ type: 'LOAD' })}
      />}
      
      {state.page == 'set' && <SetPage
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
        cancel={() => dispatch({ type: 'LOAD' })}
      />}

      {state.page == 'view' && <ViewPage
        cancelAll={cancelAll}
        cancelOne={cancel}
        list={state.data}
        newMemo={() => dispatch({ type: 'NEW' })}
      />}

      {showDatePicker && <DateTimePicker value={new Date(notification.date)} minimumDate={now} onChange={dateHandler} />}
      {showTimePicker && <DateTimePicker mode='time' value={new Date(`${notification.date} ${notification.time}`)} onChange={timeHandler} />}
    </KeyboardAvoidingView>
  )
}

const formatMinutes = minutes => minutes.toString().length == 1 ? `0${minutes}` : minutes

const formatTime = time => `${time.getHours()}:${formatMinutes(time.getMinutes())}`

const resetNotification = () => {
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
