# Laxy Hub PWA Requirements

| Requirement ID | Description | User Story | Expected Behavior / Outcome |
| --- | --- | --- | --- |
| R1 | Landing Page with WiFi Information | As a guest, I want to see the WiFi SSID and password immediately upon loading the PWA, so I can connect to the internet using mobile data and proceed to load additional content. | \- WiFi SSID and password are displayed prominently on the landing page.<br>- Only this section loads when using mobile data.<br>- Additional content (flat info, city tour redirection) is enabled once WiFi is connected. |
| R2 | Flat Information Display | As a guest, I want to view essential information about the flat provided by the host, so I can settle in comfortably. | \- Flat information (e.g., house rules, check-in/out instructions) is fetched from an S3 bucket and displayed in a card-based layout.<br>- Content loads only after WiFi is detected.<br>- Errors are handled with a fallback message ("Unable to load flat info"). |
| R3 | City Tour Redirection with Location Locking | As a guest, I want to be redirected to a city tour guide (separate project), so I can explore the city like a local. | \- A button/link for city tour redirection is visible.<br>- Redirection is locked based on GPS/IP location; enabled only if the user is within 100 meters of the Airbnb property.<br>- If locked, the button is disabled with a message ("Available only at Airbnb location").<br>- If enabled, clicking redirects to the city tour URL. |
| R4 | Homescreen Installation Prompt | As a guest, I want to install the PWA on my iOS or Android device, so I can access it easily like a native app. | \- A prompt appears if the PWA is not installed, with platform-specific instructions (iOS: "Tap Share &gt; Add to Home Screen"; Android: "Tap Menu &gt; Add to Home Screen").<br>- The prompt can be dismissed, and dismissal is saved in `localStorage`.<br>- The PWA is installable with a proper icon, name, and standalone mode. |


# Copilot Instructions for Laxy Hub PWA Development

## Application Name and Description

- **Name**: Laxy Hub PWA
- **Description**: Laxy Hub is a Progressive Web App (PWA) designed as a landing page for Airbnb guests, accessible via QR code scan upon arrival or before their trip. It provides essential flat information (e.g., WiFi SSID and password), host-provided details, and a redirection to a city tour guide (separate project). The app aims to help travelers "travel like a local" with a playful, mobile-first user experience. For the MVP, the focus is on basic functionality, WiFi-based content loading, location-locked redirection, and homescreen installation prompts.

## Technologies Used

- **Frontend Framework**: React (using Create React App with PWA template)
- **Styling**: Tailwind CSS (for rapid development and consistency)
- **Data Fetching**: AWS SDK for JavaScript (`@aws-sdk/client-s3`) to fetch read-only data from an S3 bucket
- **Deployment**: Netlify (for hosting and HTTPS)
- **Browser APIs**:
  - Geolocation API (for GPS-based location locking)
  - IP-based geolocation fallback (e.g., via `https://ipapi.co/json/`)
  - `navigator.connection` (for detecting mobile data vs. WiFi)
  - `beforeinstallprompt` event (for homescreen installation prompts)
- **Fonts**: Google Fonts (Poppins or Montserrat for a playful look)

## Best Practices

- **Code Quality**:
  - Follow React best practices: use functional components, hooks (e.g., `useState`, `useEffect`), and proper state management.
  - Write modular, reusable components with clear props and separation of concerns.
  - Use consistent naming conventions (e.g., PascalCase for components, camelCase for variables/functions).
  - Add comments for complex logic (e.g., distance calculation, connection detection).
- **Performance**:
  - Minimize initial load on mobile data by conditionally rendering only the WiFi info section.
  - Optimize images (if any) and use lazy loading for non-critical assets.
  - Avoid unnecessary re-renders using React.memo or useCallback where applicable.
- **Accessibility**:
  - Ensure semantic HTML (e.g., use `<button>` for buttons, not `<div>` with `onClick`).
  - Add ARIA attributes where necessary (e.g., `aria-label` for buttons, `aria-disabled` for disabled states).
  - Ensure touch targets are at least 48px for mobile usability.
  - Use high-contrast colors from the provided palette (e.g., Primary: `#215458` text on `#a39ddd` background).
- **Error Handling**:
  - Gracefully handle API failures (e.g., S3 fetch errors) with user-friendly messages.
  - Handle Geolocation API permission denials with a fallback to IP-based geolocation.
- **Version Control**:
  - Use Git for version control with meaningful commit messages (e.g., "feat: add WiFi info component", "fix: handle S3 fetch error").
  - Organize commits by feature/task (e.g., one commit per major task like "T1: Set up React project").

## Project Structure

Organize the project using the following structure for clarity and scalability:

```
laxy-hub/
├── public/
│   ├── index.html          # Entry point HTML file
│   ├── manifest.json       # PWA manifest for homescreen installation
│   ├── favicon.ico         # Favicon placeholder
│   └── logo512.png         # PWA icon (512x512 placeholder)
├── src/
│   ├── assets/             # Static assets (e.g., images, fonts)
│   │   └── logo.png
│   ├── components/         # Reusable React components
│   │   ├── LandingPage.js  # WiFi info landing page component
│   │   ├── FlatInfo.js     # Flat information display component
│   │   ├── CityTourRedirect.js # City tour redirection component
│   │   └── InstallPrompt.js # Homescreen installation prompt component
│   ├── utils/              # Utility functions
│   │   ├── api.js          # S3 fetch logic
│   │   ├── geolocation.js  # Geolocation and distance calculation logic
│   │   └── connection.js   # WiFi vs. mobile data detection logic
│   ├── styles/             # Global styles
│   │   └── tailwind.css    # Tailwind CSS configuration
│   ├── App.js              # Main App component
│   ├── index.js            # React entry point
│   └── serviceWorker.js    # PWA service worker (minimal for MVP)
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Rules

- **React and JSX**:
  - Use functional components with hooks; avoid class components.
  - Use JSX syntax (not `React.createElement`).
  - Use `className` instead of `class` for JSX attributes.
  - Avoid inline styles; use Tailwind CSS classes for styling.
- **PWA Requirements**:
  - Ensure the app works in standalone mode (`display: "standalone"` in `manifest.json`).
  - Do not implement offline caching for the MVP (service worker should be registered but minimal).
- **Data Handling**:
  - Fetch all data (flat info, property coordinates) from an S3 bucket using `@aws-sdk/client-s3`.
  - Assume S3 data is publicly readable for the MVP (e.g., `s3://laxy-hub/flat-info.json`).
  - Do not implement write operations to S3.
- **Mobile-First Design**:
  - Design for mobile screens (375px to 768px) using Tailwind’s mobile-first approach (e.g., `text-base md:text-lg`).
  - Ensure all components are touch-friendly (minimum 48px for interactive elements).
- **WiFi Detection**:
  - Use `navigator.connection` to detect mobile data (`type: "cellular"`) vs. WiFi (`type: "wifi"`).
  - Load only the WiFi info section on mobile data; enable other content on WiFi.
- **Location Locking**:
  - Use `navigator.geolocation.getCurrentPosition` for GPS; fallback to `fetch('https://ipapi.co/json/')` for IP-based geolocation.
  - Calculate distance using the Haversine formula (implement in `geolocation.js`).
  - Lock city tour redirection if the user is more than 100 meters from the property coordinates.
- **Color Scheme**:
  - Use the provided palette:
    - Primary: `#a39ddd` (100), `#5fbcc4` (200), `#46b2bb` (300), `#328188` (400), `#215458` (500), `#133033` (600)
    - Secondary: `#fc6dcd` (100), `#f9ad9b` (200), `#f57c5f` (300), `#f24b24` (400), `#cb310c` (500), `#a82209` (600)
    - Third: `#fd4ee8` (100), `#fd87ac` (200), `#f2ba6f` (300), `#ed9d33` (400), `#cd8d12` (500), `#90580d` (600)
  - Apply colors via Tailwind config (e.g., `bg-primary-300`, `text-secondary-600`).
- **Animations**:
  - Add subtle, playful animations using Tailwind (e.g., `animate-fade-in`, `animate-scale-in`, `animate-slide-in`).
  - Define custom animations in `tailwind.config.js` if needed (e.g., `fade-in: { '0%': { opacity: 0 }, '100%': { opacity: 1 } }`).
- **Deployment**:
  - Deploy to Netlify with HTTPS enabled.
  - Use `npm run build` for the build command and `build/` as the publish directory.
- **Restrictions**:
  - Do not use `<form>` elements (sandbox restrictions in the frame).
  - Do not implement analytics or tracking for the MVP.
  - Do not cache content offline for the MVP.