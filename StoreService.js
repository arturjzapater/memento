import AsyncStorage from '@react-native-community/async-storage'

export { find, findAndRemoveold, findOne, remove, update }

const KEY = '@notifications'

const find = () => AsyncStorage.getItem(KEY)
    .then(data => data != null ? JSON.parse(data).items : [])

const findAndRemoveold = () => {
    const now = new Date()
    return find()
        .then(items => items.filter(x => x.repeatType != undefined || new Date(x.date) >= now))
        .then(items => ({ items }))
        .then(JSON.stringify)
        .then(data => AsyncStorage.setItem(KEY, data))
        .then(find)
}

const findOne = id => find()
    .then(data => data.find(x => x.id == id))

const remove = id => find()
    .then(items => items.filter(x => x.id != id))
    .then(items => ({ items }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(KEY, data))

const update = item => find()
    .then(data => data.concat([ item ]))
    .then(items => ({ items }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(KEY, data))

