// Haversine formula for distance (in meters)
export function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const toRad = deg => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Get user location (GPS first, fallback to IP)
export async function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          source: 'gps',
        }),
        () => {
          // Fallback to IP-based geolocation
          fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => resolve({ lat: data.latitude, lon: data.longitude, source: 'ip' }))
            .catch(reject);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      // No geolocation API, fallback to IP
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => resolve({ lat: data.latitude, lon: data.longitude, source: 'ip' }))
        .catch(reject);
    }
  });
}