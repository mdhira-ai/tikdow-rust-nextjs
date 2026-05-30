import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";

// Do you have permission to send a notification?

export async function check_permission_notification_send_notification(
  body: string,
  title: string,
) {
  let permissionGranted = await isPermissionGranted();
  // If not we need to request it
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === "granted";
  }

  if (permissionGranted) {
    sendNotification({
      title: title,
      body: body,
      sound: "Default",
    });
  }
}
