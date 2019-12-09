import React, { useEffect, useReducer, useState } from 'react'
import { Alert, KeyboardAvoidingView, StatusBar } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Menu } from './components/Menu'
import { MessageBox } from './components/MessageBox'
import { SetPage } from './components/SetPage'
import { ViewPage } from './components/ViewPage'
import { styles } from './styles'
import { cancelAllNotifs, cancelNotif, scheduleNotif } from './NotifService'
import { findAndRemoveold } from './StoreService'
import { repeatOptions } from './modules/repeat'

const actions = {
  LOAD: (state, action) => ({
      ...state,
      status: 'loading',
  }),
  NEW: (state, action) => ({
    ...state,
    page: 'set',
    status: 'new',
  }),
  RESOLVE: (state, action) => ({
      ...state,
      page: 'view',
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
  page: 'view',
  status: 'loading',
  data: [],
  error: null,
}

export default () => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  useEffect(() => {
      if (state.status == 'loading') findAndRemoveold()
          .then(data => data.sort((a, b) => new Date(a.date) > new Date(b.date)))
          .then(data => dispatch({ type: 'RESOLVE', data }))
          .catch(err => dispatch({ type: 'REJECT', err }))
  }, [state.status])

  const cancel = (id, title) => cancelNotif(id)
          .then(_ => dispatch({ type: 'LOAD' }))
          .then(_ => setMessage(`${title} succesfully deleted.`))
  
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

  const [ notification, setNotification ] = useState(setInitialState())
  const [ showDatePicker, setShowDatePicker ] = useState(false)
  const [ showTimePicker, setShowTimePicker ] = useState(false)
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

  const submitHandler = () => {
    const error = validateInput()
    if (error == null) {
      scheduleNotif(notification.title, notification.text, `${notification.date} ${notification.time}`, notification.repeat.value, notification.repeatTime)
      setMessage(`I will remind you about ${notification.title}!`)
      setNotification({
          ...notification,
          title: '',
          text: '',
          repeat: repeatOptions[0]
        })
      dispatch({ type: 'LOAD' })
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

      {message != '' && <MessageBox text={message} close={() => setMessage('')} />}
      
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
      />}

      {state.page == 'view' && <ViewPage
        cancelAll={cancelAll}
        cancelOne={cancel}
        list={state.data}
        newMemo={() => dispatch({ type: 'NEW' })}
        setMessage={setMessage}
      />}

      {showDatePicker && <DateTimePicker value={new Date(notification.date)} minimumDate={now} onChange={dateHandler} />}
      {showTimePicker && <DateTimePicker mode='time' value={new Date(`${notification.date} ${notification.time}`)} onChange={timeHandler} />}
    </KeyboardAvoidingView>
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
