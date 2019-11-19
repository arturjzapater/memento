import { Alert } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { find, update } from './StoreService'
import AsyncStorage from '@react-native-community/async-storage'

export default class NotifService {

  constructor() {
    this.configure()
    this.lastId = 0
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

  scheduleNotif(title, text, date, repeatType, repeatTime) {
    //AsyncStorage.removeItem('@notifications')
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
    color: "purple",
    vibrate: true,
    vibration: 1000,
    tag: 'some_tag',
    group: "group",
    ongoing: false,
    title: title,
    message: text,
    playSound: true,
    soundName: 'default',
    repeatType: repeatType,
    repeatTime: repeatTime,
  })
