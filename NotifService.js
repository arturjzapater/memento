import { Alert } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { find, remove, removeAll, update } from './StoreService'

PushNotification.configure({
  onNotification: notification => Alert.alert(
      notification.title,
      notification.message,
      [
        {
          text: 'Snooze',
          onPress: () => snoozeNotif(notification.title, notification.message),
        },
        {
          text: 'Dismiss',
        },
      ]
    ),
  senderID: '',
  popInitialNotification: true,
  requestPermissions: true,
})

export const cancelAllNotifs = () => {
  PushNotification.cancelAllLocalNotifications()
  return removeAll()
}

export const cancelNotif = id => {
  PushNotification.cancelLocalNotifications({ id: id.toString() })
  return remove(id)
    .catch(console.log)
}

export const scheduleNotif = (title, text, date, repeatType, repeatTime) => getLastId()
    .then(id => {
      const newId = id + 1
      const newTime = repeatType == 'time' ? repeatTime * 3600000 : undefined
      pushNotif(newId, title, text, date, repeatType, newTime)
      return { id: newId, title, date, repeatType, repeatTime : newTime }
      //return({ id: newId, title, date, repeatType, repeatTime : newTime })
    })
    .then(data => update(data))

const getLastId = () => find()
  .then(data => data.reduce((a, b) => b.id > a ? b.id : a, 0))

const pushNotif = (id, title, text, date, repeatType, repeatTime) =>
  PushNotification.localNotificationSchedule({
    date: new Date(date),
    id: id.toString(),
    ticker: 'Memento Notification Ticker',
    autoCancel: true,
    subText: 'Remember, remember!',
    vibrate: true,
    vibration: 1000,
    ongoing: false,
    title: title,
    message: text,
    playSound: true,
    soundName: 'default',
    repeatType: repeatType,
    repeatTime: repeatTime,
  })

const snoozeNotif = (title, text) => getLastId()
  .then(id => pushNotif(id + 1, title, text, new Date(Date.now() + 600000)))
