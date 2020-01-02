import AsyncStorage from '@react-native-community/async-storage'

export { clearToDelete, find, findAndRemoveold, remove, removeAll, restore, update }

const KEY = '@notifications'
const DEL_KEY = '@to-delete'

const clearToDelete = () => AsyncStorage.removeItem(DEL_KEY)

const find = (key=KEY) => AsyncStorage.getItem(key)
    .then(data => data != null ? JSON.parse(data).items : [])

const findAndRemoveold = () => {
    const now = new Date()
    return find()
        .then(items => items.filter(x => x.repeatType != undefined || new Date(x.date) >= now))
        .then(items => ({ items }))
        .then(JSON.stringify)
        .then(data => AsyncStorage.setItem(KEY, data))
        .then(() => find())
}

const setToDelete = id => find()
    .then(items => Promise.all([
        items.filter(x => x.id == id),
        find(DEL_KEY),
    ]))
    .then(([ item, data ]) => data.concat(item))
    .then(items => ({ items }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(DEL_KEY, data))

const remove = id => setToDelete(id)
    .then(() => find())
    .then(items => items.filter(x => x.id != id))
    .then(items => ({ items }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(KEY, data))

const removeAll = () => AsyncStorage.removeItem(KEY)

const removeToDelete = item => find(DEL_KEY)
    .then(items => items.filter(x => x.id != item.id))
    .then(items => ({ items }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(DEL_KEY, data))

const restore = item => find(DEL_KEY)
    .then(items => items.filter(x => x.id != item.id))
    .then(items => ({ items }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(DEL_KEY, data))
    .then(() => update(item))

const update = item => find()
    .then(data => data.concat([ item ]))
    .then(items => ({ items }))
    .then(JSON.stringify)
    .then(data => AsyncStorage.setItem(KEY, data))

