// Add these direct routes right after the "/" route in each route config section in App.js
// For the first section with hostname.startsWith('stay-') || hostname.startsWith('uat-stay-')
<Route path="/" element={<DefaultLanguageRedirect />} />

{/* Direct routes for hub navigation with language redirect */}
<Route path="/info" element={<DefaultLanguageRedirect />} />
<Route path="/info/wifi" element={<DefaultLanguageRedirect />} />
<Route path="/nearby-restaurants" element={<DefaultLanguageRedirect />} />
<Route path="/nearby-attractions" element={<DefaultLanguageRedirect />} />
<Route path="/tours" element={<DefaultLanguageRedirect />} />
<Route path="/tours/*" element={<DefaultLanguageRedirect />} />

// And similarly for the "else" section
<Route path="/" element={<DefaultLanguageRedirect />} />
          
{/* Direct routes for hub navigation with language redirect */}
<Route path="/info" element={<DefaultLanguageRedirect />} />
<Route path="/info/wifi" element={<DefaultLanguageRedirect />} />
<Route path="/nearby-restaurants" element={<DefaultLanguageRedirect />} />
<Route path="/nearby-attractions" element={<DefaultLanguageRedirect />} />
<Route path="/tours" element={<DefaultLanguageRedirect />} />
<Route path="/tours/*" element={<DefaultLanguageRedirect />} />
