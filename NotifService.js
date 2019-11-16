import { Alert } from 'react-native'
import PushNotification from 'react-native-push-notification'

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

  scheduleNotif(title, text, date, repeat) {
    this.lastId++
    PushNotification.localNotificationSchedule({
      date: new Date(date),

      id: `${this.lastId}`,
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
      repeatType: repeat,
      //repeatTime: repeat == 'time' ? 10000 : undefined,
    })
  }
}