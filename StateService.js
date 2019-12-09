export default (state, action) => {
    const handler = actions[action.type] || actions.default
    return handler(state, action)
}

const actions = {
    LOAD: (state, action) => ({
        ...state,
        message: action.message || '',
        status: 'loading',
    }),
    NEW: (state, action) => ({
      ...state,
      message: '',
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
