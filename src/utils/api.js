// MOCKED fetchFlatInfo for development (replace with S3 logic when ready)
export async function fetchFlatInfo() {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));
  // Example flat info data
  return {
    rules: 'No smoking. No parties. Quiet hours after 10pm.',
    checkin: 'After 3:00 PM',
    checkout: 'Before 11:00 AM',
    wifi: {
      ssid: 'LaxyHub-WiFi',
      password: 'laxy2025'
    },
    // Add more fields as needed
  };
}

// Fetch config.json from S3 (replace URL with your S3 bucket URL)
let configCache = null;
const DEFAULT_CONFIG = {
  wifi_ssid: 'LaxyHub-WiFi',
  wifi_password: 'laxy2025',
  gps_lat: 48.137154,
  gps_lon: 11.576124,
};

export async function fetchConfig(setConfigError) {
  if (configCache) return configCache;
  try {
    const res = await fetch('https://YOUR_S3_BUCKET.s3.amazonaws.com/config.json');
    if (!res.ok) throw new Error('Network response was not ok');
    const config = await res.json();
    configCache = config;
    return config;
  } catch (err) {
    if (setConfigError) setConfigError('Unable to load configuration');
    await new Promise(res => setTimeout(res, 2000));
    configCache = DEFAULT_CONFIG;
    return DEFAULT_CONFIG;
  }
}

// --- Restore this when @aws-sdk/client-s3 is installed ---
// import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
// const REGION = 'us-east-1';
// const BUCKET = 'laxy-hub';
// const KEY = 'flat-info.json';
// const s3 = new S3Client({ region: REGION });
// export async function fetchFlatInfo() {
//   try {
//     const command = new GetObjectCommand({ Bucket: BUCKET, Key: KEY });
//     const response = await s3.send(command);
//     const body = await response.Body.transformToString();
//     return JSON.parse(body);
//   } catch (err) {
//     throw new Error('Unable to load flat info');
//   }
// }