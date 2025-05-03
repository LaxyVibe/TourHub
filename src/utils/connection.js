// Utility to detect connection type (WiFi or cellular)
export function getConnectionType() {
  if (navigator.connection && navigator.connection.type) {
    return navigator.connection.type; // 'wifi', 'cellular', etc.
  }
  // Fallback: assume WiFi if API not supported
  return 'wifi';
}

export function isOnWifi() {
  return getConnectionType() === 'wifi';
}

export function isOnCellular() {
  return getConnectionType() === 'cellular';
}