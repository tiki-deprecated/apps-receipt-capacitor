import { LocalNotifications } from '@capacitor/local-notifications';

export class NotificationService {
    /**
     * Request permission from the user to show notifications
     * It's necessary to use the sendNotification method
     */
    authorize = async () => {
        await LocalNotifications.requestPermissions()
    }

    /**
     * Send a local notification to the user after 5 seconds 
     * @param title - the title of the notification 
     * @param body - the body of the notification
     */
    sendNotification = async (title: string, body: string, schedule: Date = new Date(Date.now())) => {
        await LocalNotifications.schedule({
            notifications: [
                {
                  title: title,
                  body: body,
                  id: Math.random(),
                  schedule: { at: schedule},
                  sound: undefined,
                  attachments: undefined,
                  actionTypeId: '',
                  extra: null,
                },
              ],
        })
    }
}