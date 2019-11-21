import { Alert } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { find, remove, update } from './StoreService'

export default class NotifService {

  constructor() {
    this.configure()
  }

  configure(gcm = "") {
    PushNotification.configure({
      onRegister: function(token) {
        console.log("TOKEN:", token)
      },
      onNotification: function(notification) {
        console.log("NOTIFICATION:", notification)
        Alert.alert(notification.title, notification.message)
      },
      senderID: gcm,
      popInitialNotification: true,
      requestPermissions: true,
    })
  }

  cancelNotif(id) {
    PushNotification.cancelLocalNotifications({ id: id.toString() })
    return remove(id)
      .catch(console.log)
  }

  scheduleNotif(title, text, date, repeatType, repeatTime) {
    getLastId()
      .then(id => {
        const newId = id + 1
        const newTime = repeatType == 'time' ? repeatTime * 3600000 : undefined
        pushNotif(newId, title, text, date, repeatType, newTime)
        update({ id: newId, title, date, repeatType, repeatTime : newTime })
        return({ id: newId, title, date, repeatType, repeatTime : newTime })
      })
      .catch(console.log)
  }
}

const getLastId = () => find()
  .then(data => data.reduce((a, b) => b.id > a ? b.id : a, 0))

const pushNotif = (id, title, text, date, repeatType, repeatTime) =>
  PushNotification.localNotificationSchedule({
    date: new Date(date),
    id: id.toString(),
    ticker: "Memento Notification Ticker",
    autoCancel: true,
    largeIcon: "ic_launcher",
    smallIcon: "ic_notification",
    subText: "Remember, remember!",
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
