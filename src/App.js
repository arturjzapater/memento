import React, { useEffect, useReducer } from 'react'
import { Alert, KeyboardAvoidingView, StatusBar } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Header } from './components/Header'
import { MessageBox } from './components/MessageBox'
import { SetPage } from './components/SetPage'
import { ViewPage } from './components/ViewPage'
import { styles } from './styles'
import reducer from './StateService'
import { repeatOptions } from './modules/repeat'
import { formatTime } from './modules/time'
import sideEffects from './modules/sideEffects'

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
	toDelete: null,
	error: null,
}

export default () => {
	const [ state, dispatch ] = useReducer(reducer, initialState)

	const sideEffectHandler = sideEffects(dispatch)
	useEffect(() => {
		if (Object.keys(sideEffectHandler).includes(state.status)) sideEffectHandler[state.status](state)
	}, [ state.status ])

	const cancel = memo => dispatch({ type: 'DELETE_MEMO', toDelete: memo })
		
	const cancelAll = () => Alert.alert(
		'Are you sure?',
		'This action will cancel every single scheduled memo, including snoozed ones. Do you want to proceed?',
		[
			{
				text: 'Yes, proceed',
				onPress: () => dispatch({ type: 'DELETE_MEMO', toDelete: 'all' })
			},
			{
				text: 'No, I\'ll keep them',
			}
		]
	)

	const dateHandler = (event, newDate) => dispatch({
		type: 'CHANGE_DATE',
		date: newDate ? newDate.toDateString() : state.memo.date
	})

	const submitHandler = () => {
		const error = validateInput()
		if (error == null) dispatch({ type: 'SCHEDULE_MEMO' })
		else Alert.alert('Wait a moment!', error.join('\n'))
	}

	const timeHandler = (event, newTime) => dispatch({
		type: 'CHANGE_TIME',
		time: newTime ? formatTime(newTime) : state.memo.time
	})

	const validateInput = () => {
		const error = []
		if (state.memo.title == '') error.push('You must write a title')
		if (new Date(`${state.memo.date} ${state.memo.time}`) < new Date()) error.push('You must set a date in the future')
		if (state.memo.repeat.value === 'time' && state.memo.repeatTime == 0) error.push('You must set a repeat time above 0 hours')
		return error.length <= 0 ? null : error
	}

	const validateNumber = event => +event.nativeEvent.text < 1 && dispatch({
		type: 'CHANGE_REPEAT_TIME',
		repeatTime: 1
	})

	return(
		<KeyboardAvoidingView style={styles.main} behavior='height' enabled>
			<StatusBar hidden={true} />
			<Header active={state.page} />

			{state.message != '' && <MessageBox
				text={state.message}
				close={() => dispatch({ type: 'LOAD', toDelete: null })}
				toDelete={state.toDelete}
				undo={() => dispatch({ type: 'RESTORE_MEMO' })}
			/>}
			
			{state.page == 'set' && <SetPage
				memo={state.memo}
				titleChange={newTitle => dispatch({ type: 'CHANGE_TITLE', title: newTitle })}
				textChange={newText => dispatch({ type: 'CHANGE_TEXT', text: newText })}
				repeatFunc={(value, index) => dispatch({ type: 'CHANGE_REPEAT', repeat: repeatOptions[index] })}
				repeatTimeFunc={newTime => dispatch({ type: 'CHANGE_REPEAT_TIME', repeatTime: +newTime })}
				dateFunc={() => dispatch({ type: 'DISPLAY_POPUP', popup: 'calendar' })}
				timeFunc={() => dispatch({ type: 'DISPLAY_POPUP', popup: 'clock' })}
				submitHandler={submitHandler}
				validateNumber={validateNumber}
				reset={() => dispatch({ type: 'NEW' })}
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
