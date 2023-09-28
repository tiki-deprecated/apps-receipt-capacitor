import { LocalNotifications } from '@capacitor/local-notifications';

export class NotificationService {

    authorize = async () => {
        await LocalNotifications.requestPermissions()
    }

    sendNotification = async (title: string, body: string) => {
        await LocalNotifications.schedule({
            notifications: [
                {
                  title: title,
                  body: body,
                  id: 1,
                  schedule: { at: new Date(Date.now() + 1000 * 5) },
                  sound: undefined,
                  attachments: undefined,
                  actionTypeId: '',
                  extra: null,
                },
              ],
        })
    }
}