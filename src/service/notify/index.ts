/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { LocalNotifications } from "@capacitor/local-notifications";

export class Notify {
  /**
   * Checks permission from the user to show notifications
   * and requests them if not already granted.
   *
   * Permission required to use the sendNotification method.
   */
  isAuthorized = async (): Promise<boolean> => {
    const status = await LocalNotifications.checkPermissions();
    switch (status.display) {
      case "denied":
        return false;
      case "prompt":
      case "prompt-with-rationale": {
        const rsp = await LocalNotifications.requestPermissions();
        return rsp.display === "granted";
      }
      case "granted":
        return true;
    }
  };

  /**
   * Send a local notification to the user
   * @param title - the title of the notification
   * @param body - the body of the notification
   * @param schedule - when to send the notification, defaults to `new Date()`
   * @param id - the notification id, use to update existing notifications. Defaults to `Math.random()`.
   */
  async sendNotification(
    title: string,
    body: string,
    schedule: Date = new Date(),
    id: number = Math.random(),
  ): Promise<void> {
    const hasPermission = await this.isAuthorized();
    if (hasPermission) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: title,
            body: body,
            id: id,
            schedule: { at: schedule },
            sound: undefined,
            attachments: undefined,
            actionTypeId: "",
            extra: null,
          },
        ],
      });
    }
  }
}
