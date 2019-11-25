export { getRepeatText, repeatOptions }

const getRepeatText = value => repeatOptions.find(x => x.value == value).key

const repeatOptions = [
    { key: 'Never', value: undefined },
    { key: 'Monthly', value: 'month' },
    { key: 'Weekly', value: 'week' },
    { key: 'Daily', value: 'day' },
    { key: 'Custom', value: 'time' },
]
