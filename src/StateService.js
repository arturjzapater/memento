import { repeatOptions } from './modules/repeat'
import { formatTime } from './modules/time'

export default (state, action) => {
    const handler = actions[action.type] || actions.default
    return handler(state, action)
}

const actions = {
    LOAD: (state, action) => ({
        ...state,
        message: action.message || '',
        status: 'loading',
        toDelete: typeof action.toDelete != 'undefined' ? action.toDelete : state.toDelete,
    }),
    LOAD2: (state, action) => state.page == 'view'
        ? actions.LOAD(state, action)
        : state,
    NEW: (state, action) => ({
        ...state,
        memo: {
            title: '',
            text: '',
            repeat: repeatOptions[0],
            repeatTime: 48,
            date: new Date().toDateString(),
            time: formatTime(new Date()),
        },
        message: '',
        page: 'set',
        status: 'new',
        toDelete: null,
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
    CHANGE_TITLE: (state, action) => ({
        ...state,
        memo: {
            ...state.memo,
            title: action.title,
        },
    }),
    CHANGE_TEXT: (state, action) => ({
        ...state,
        memo: {
            ...state.memo,
            text: action.text,
        },
    }),
    CHANGE_REPEAT: (state, action) => ({
        ...state,
        memo: {
            ...state.memo,
            repeat: action.repeat,
        },
    }),
    CHANGE_REPEAT_TIME: (state, action) => ({
        ...state,
        memo: {
            ...state.memo,
            repeatTime: Number.isNaN(action.repeatTime) ? state.memo.repeatTime : action.repeatTime,
        },
    }),
    CHANGE_DATE: (state, action) => ({
        ...state,
        memo: {
            ...state.memo,
            date: action.date,
        },
        popup: '',
    }),
    CHANGE_TIME: (state, action) => ({
        ...state,
        memo: {
            ...state.memo,
            time: action.time,
        },
        popup: '',
    }),
    DISPLAY_POPUP: (state, action) => ({
        ...state,
        popup: action.popup,
    }),
    DELETE_MEMO: (state, action) => ({
        ...state,
        status: 'deleting',
        toDelete: action.toDelete,
    }),
    RESTORE_MEMO: (state, action) => ({
        ...state,
        status: 'restoring',
    }),
    SCHEDULE_MEMO: (state, action) => ({
        ...state,
        status: 'scheduling',
    }),
    default: state => state,
}
