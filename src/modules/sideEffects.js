import { cancelAllNotifs, cancelNotif, removeDeleted, scheduleNotif } from '../NotifService'
import { findAndRemoveold, restore } from '../StoreService'

export default dispatch => ({
	loading: () => findAndRemoveold()
		.then(data => data.sort((a, b) => new Date(a.date) > new Date(b.date)))
		.then(data => dispatch({ type: 'RESOLVE', data }))
		.catch(err => dispatch({ type: 'REJECT', err })),
	scheduling: state => scheduleNotif({
			...state.memo,
			date: `${state.memo.date} ${state.memo.time}`,
			repeatType: state.memo.repeat.value,
		})
		.then(() => dispatch({
			type: 'LOAD',
			message: `I will remind you about ${state.memo.title}!`
		})),
	deleting: state => state.toDelete == 'all'
		? cancelAllNotifs()
			.then(() => dispatch({
				type: 'LOAD',
				message: 'All memos succesfully deleted.',
				toDelete: null
			}))
		: cancelNotif(state.toDelete.id)
			.then(() => dispatch({
				type: 'LOAD',
				message: `${state.toDelete.title} succesfully deleted.`
			})),
	restoring: state => restore(state.toDelete)
		.then(() => dispatch({
			type: 'LOAD',
			message: `${state.toDelete.title} is back!`,
			toDelete: null
		})),
	success: state => state.message.includes('deleted') && setTimeout(() => {
			removeDeleted()
			if (state.message != '') dispatch({ type: 'LOAD', toDelete: null })
		}, 30000),
})