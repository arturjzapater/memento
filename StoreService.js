import AsyncStorage from '@react-native-community/async-storage'

export { findAll, findOne, remove, update }

const KEY = '@notifications'

const findAll = () => AsyncStorage.getItem(KEY)
    .then(data => data != null ? JSON.parse(data).items : [])

const findOne = id => findAll()
    .then(data => data.find(x => x.id == id))

const remove = id => findAll()
    .then(items => items.filter(x => x.id != id))
    .then(items => ({ items }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(KEY, data))

const update = item => findAll()
    .then(data => data.concat([ item ]))
    .then(items => ({ items }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(KEY, data))

