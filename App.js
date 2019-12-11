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

const formatMinutes = minutes => minutes.toString().length == 1 ? `0${minutes}` : minutes

const formatTime = time => `${time.getHours()}:${formatMinutes(time.getMinutes())}`

const initialState = {
  status: 'loading',
  data: [],
  memo: {
    title: '',
    text: '',
    repeat: repeatOptions[0],
    repeatTime: 48,
    date: new Date().toDateString(),
    time: formatTime(new Date())
  },
  message: '',
  page: 'view',
  popup: '',
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

  const dateHandler = (event, newDate) => dispatch({
    type: 'CHANGE_DATE',
    date: newDate ? newDate.toDateString() : state.memo.date
  })
  /*{
    setShowDatePicker(false)
    setNotification({
      ...notification,
      date: newDate ? newDate.toDateString() : notification.date,
    })
  }*/

  const decreaseRepeat = () => dispatch({ type: 'CHANGE_REPEAT_TIME', repeatTime: state.memo.repeatTime - 1 })
  /*setNotification({
    ...notification,
    repeatTime: notification.repeatTime - 1
  })*/

  const increaseRepeat = () => dispatch({ type: 'CHANGE_REPEAT_TIME', repeatTime: state.memo.repeatTime + 1 })
  /*setNotification({
    ...notification,
    repeatTime: notification.repeatTime + 1
  })*/

  const resetFields = () => setNotification(resetNotification())

  const submitHandler = () => {
    const error = validateInput()
    if (error == null) {
      scheduleNotif({
          ...state.memo,
          date: `${state.memo.date} ${state.memo.time}`,
          repeatType: state.memo.repeat.value,
        })
        .then(() => dispatch({ type: 'LOAD', message: `I will remind you about ${state.memo.title}!`}))
        .then(resetFields)
    } else Alert.alert('Wait a moment!', error.join('\n'))
  }

  const timeHandler = (event, newTime) => dispatch({
    type: 'CHANGE_TIME',
    time: newTime ? formatTime(newTime) : state.memo.time
  })
  /*{
    setShowTimePicker(false)
    setNotification({
      ...notification,
      time: newTime ? formatTime(newTime) : notification.time,
    })
  }*/

  const toggleRepeat = () => state.memo.repeat == repeatOptions[repeatOptions.length - 1]
    ? dispatch({ type: 'CHANGE_REPEAT', repeat: repeatOptions[0] })
    /*setNotification({
      ...notification,
      repeat: repeatOptions[0],
    })*/
    : dispatch({ type: 'CHANGE_REPEAT', repeat: repeatOptions[repeatOptions.findIndex(x => x == state.memo.repeat) + 1] })
    /*setNotification({
      ...notification,
      repeat: repeatOptions[repeatOptions.findIndex(x => x == notification.repeat) + 1],
    })*/

  const validateInput = () => {
    error = []
    if (state.memo.title == '') error.push('You must write a title')
    if (new Date(`${state.memo.date} ${state.memo.time}`) < new Date()) error.push('You must set a date in the future')
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
        notification={state.memo}
        //titleChange={newText => setNotification({ ...notification, title: newText })}
        titleChange={newTitle => dispatch({ type: 'CHANGE_TITLE', title: newTitle })}
        //textChange={newText => setNotification({ ...notification, text: newText })}
        textChange={newText => dispatch({ type: 'CHANGE_TEXT', text: newText })}
        repeatFunc={toggleRepeat}
        //repeatTimeFunc={newTime => setNotification({ ...notification, repeatTime: +newTime })}
        repeatTimeFunc={newTime => dispatch({ type: 'CHANGE_REPEAT_TIME', repeatTime: +newTime })}
        decreaseRepeat={decreaseRepeat}
        increaseRepeat={increaseRepeat}
        //dateFunc={() => setShowDatePicker(true)}
        dateFunc={() => dispatch({ type: 'DISPLAY_POPUP', popup: 'calendar' })}
        //timeFunc={() => setShowTimePicker(true)}
        timeFunc={() => dispatch({ type: 'DISPLAY_POPUP', popup: 'clock' })}
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

      {state.popup == 'calendar' && <DateTimePicker value={new Date(state.memo.date)} minimumDate={Date.now()} onChange={dateHandler} />}
      {state.popup == 'clock' && <DateTimePicker mode='time' value={new Date(`${state.memo.date} ${state.memo.time}`)} onChange={timeHandler} />}
    </KeyboardAvoidingView>
  )
}

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
