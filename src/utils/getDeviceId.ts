// Create a new method that will generate a unique device ID for the user's browser tab.
// This method will check if the device ID is already stored in the session storage.
// If it is not, it will generate a new device ID and store it in the session storage.
// This method will return the device ID.
export function getOrCreateTabDeviceId() {
  let deviceId = sessionStorage.getItem("tab_device_id");
  if (!deviceId) {
    deviceId = crypto.randomUUID(); // or any UUID lib
    sessionStorage.setItem("tab_device_id", deviceId);
  }
  return deviceId;
}
