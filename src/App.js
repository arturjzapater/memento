import React, { useEffect, useReducer } from 'react'
import { Alert, AppState, KeyboardAvoidingView, StatusBar } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Header } from './components/Header'
import { MessageBox } from './components/MessageBox'
import { SetPage } from './components/SetPage'
import { Toolbar } from './components/Toolbar'
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
	deletionTimeout: undefined,
	error: null,
}

export default () => {
	const [ state, dispatch ] = useReducer(reducer, initialState)

	const sideEffectHandler = sideEffects(dispatch)
	useEffect(() => {
		if (Object.keys(sideEffectHandler).includes(state.status)) sideEffectHandler[state.status](state)
	}, [ state.status ])
	useEffect(() => {
		AppState.addEventListener('change', handleAppStateFocus)
		return () => AppState.removeEventListener('change', handleAppStateFocus)
	}, [])

	const cancel = memo => dispatch({ type: 'DELETE_ONE', toDelete: memo })
		
	const cancelAll = () => Alert.alert(
		'Are you sure?',
		'This action will cancel every single scheduled memo, including snoozed ones. Do you want to proceed?',
		[
			{
				text: 'Yes, proceed',
				onPress: () => dispatch({ type: 'DELETE_ALL' })
			},
			{
				text: 'No, I\'ll keep them',
			}
		]
	)

	const controlNumber = event => +event.nativeEvent.text < 1 && dispatch({
		type: 'CHANGE_REPEAT_TIME',
		repeatTime: 1
	})

	const dateHandler = (event, newDate) => dispatch({
		type: 'CHANGE_DATE',
		date: newDate ? newDate.toDateString() : state.memo.date
	})

	const handleAppStateFocus = appState => appState === 'active' && dispatch({ type: 'LOAD' })

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

	const toolbar = {
		view: [{
			icon: 'md-trash',
			label: 'Delete All',
			action: cancelAll,
		},{
			icon: 'md-create',
			label: 'New Memo',
			action: () => dispatch({ type: 'NEW' }),
		}],
		set: [{
			icon: 'md-refresh',
			label: 'Reset Fields',
			action: () => dispatch({ type: 'NEW' }),
		},{
			icon: 'md-menu',
			label: 'View Memos',
			action: () => dispatch({ type: 'LOAD' }),
		},{
			icon: 'md-checkmark-circle-outline',
			label: 'Save Memo',
			action: submitHandler,
		}],
	}

	return(
		<KeyboardAvoidingView style={styles.main} behavior='height' enabled>
			<StatusBar hidden={true} />
			<Header active={state.page} />

			{state.message != '' && <MessageBox
				text={state.message}
				close={() => dispatch({ type: 'CLOSE_MSG', toDelete: null })}
				toDelete={state.toDelete}
				undo={() => dispatch({ type: 'RESTORE_MEMO' })}
			/>}
			
			{state.page == 'set' && <SetPage
				memo={state.memo}
				titleChange={newTitle => dispatch({ type: 'CHANGE_TITLE', title: newTitle })}
				textChange={newText => dispatch({ type: 'CHANGE_TEXT', text: newText })}
				repeatChange={(value, index) => dispatch({ type: 'CHANGE_REPEAT', repeat: repeatOptions[index] })}
				repeatTimeChange={newTime => dispatch({ type: 'CHANGE_REPEAT_TIME', repeatTime: +newTime })}
				dateChange={() => dispatch({ type: 'DISPLAY_POPUP', popup: 'calendar' })}
				timeChange={() => dispatch({ type: 'DISPLAY_POPUP', popup: 'clock' })}
				controlNumber={controlNumber}
			/>}

			{state.page == 'view' && <ViewPage
				delete={cancel}
				list={state.data}
				status={state.status}
			/>}

			<Toolbar items={toolbar[state.page]} />

			{state.popup == 'calendar' && <DateTimePicker value={new Date(state.memo.date)} minimumDate={Date.now()} onChange={dateHandler} />}
			{state.popup == 'clock' && <DateTimePicker mode='time' value={new Date(`${state.memo.date} ${state.memo.time}`)} onChange={timeHandler} />}
		</KeyboardAvoidingView>
	)
}
