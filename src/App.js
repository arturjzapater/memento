import React, { useEffect, useReducer } from 'react'
import { Alert, KeyboardAvoidingView, StatusBar } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Menu } from './components/Menu'
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
		'This action will cancel every single memo, including snoozed ones. Do you want to proceed?',
		[
			{
				text: 'Yes, proceed',
				onPress: () => dispatch({ type: 'DELETE_MEMO', toDelete: 'all' })
			},
			{
				text: 'No, I\'ve changed my mind',
			}
		]
	)

	const dateHandler = (event, newDate) => dispatch({
		type: 'CHANGE_DATE',
		date: newDate ? newDate.toDateString() : state.memo.date
	})

	const decreaseRepeat = () => dispatch({ type: 'CHANGE_REPEAT_TIME', repeatTime: state.memo.repeatTime - 1 })

	const increaseRepeat = () => dispatch({ type: 'CHANGE_REPEAT_TIME', repeatTime: state.memo.repeatTime + 1 })

	const submitHandler = () => {
		const error = validateInput()
		if (error == null) dispatch({ type: 'SCHEDULE_MEMO' })
		else Alert.alert('Wait a moment!', error.join('\n'))
	}

	const timeHandler = (event, newTime) => dispatch({
		type: 'CHANGE_TIME',
		time: newTime ? formatTime(newTime) : state.memo.time
	})

	const toggleRepeat = () => state.memo.repeat == repeatOptions[repeatOptions.length - 1]
		? dispatch({ type: 'CHANGE_REPEAT', repeat: repeatOptions[0] })
		: dispatch({ type: 'CHANGE_REPEAT', repeat: repeatOptions[repeatOptions.findIndex(x => x == state.memo.repeat) + 1] })

	const validateInput = () => {
		const error = []
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
				close={() => dispatch({ type: 'LOAD', toDelete: null })}
				toDelete={state.toDelete}
				undo={() => dispatch({ type: 'RESTORE_MEMO' })}
			/>}
			
			{state.page == 'set' && <SetPage
				memo={state.memo}
				titleChange={newTitle => dispatch({ type: 'CHANGE_TITLE', title: newTitle })}
				textChange={newText => dispatch({ type: 'CHANGE_TEXT', text: newText })}
				repeatFunc={toggleRepeat}
				repeatTimeFunc={newTime => dispatch({ type: 'CHANGE_REPEAT_TIME', repeatTime: +newTime })}
				decreaseRepeat={decreaseRepeat}
				increaseRepeat={increaseRepeat}
				dateFunc={() => dispatch({ type: 'DISPLAY_POPUP', popup: 'calendar' })}
				timeFunc={() => dispatch({ type: 'DISPLAY_POPUP', popup: 'clock' })}
				submitHandler={submitHandler}
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
