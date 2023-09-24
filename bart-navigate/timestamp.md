# Timestamp of each task perform

### 9/15/2023

- [x] 1:00 pm - 1:30 pm: Set up NPM ReactRouter, initialized APP.js skeleton, and added directories for Pages, Components, and Router-Routes.
- [x] 1:30 pm - 2:30 pm: Created the Header.js component with navigation links. Applied CSS styling to the Header component and added basic CSS to App.js.
- [x] 2:30 pm - 3:00 pm: Created AppRoutes component with links to header pages. Home page now displays general information. Added Home CSS and removed Logo import from header, using CSS instead.

### 9/16/2023

- [x] 6:00 am - 8:00 am: the code in "services/bartService.js" imports dependencies, sets up a BART API key and URL, and exports a "fetchBartRealTimeInfo" function to retrieve real-time BART data. Additionally, a React component named "About" is included to fetch and display this data using state variables and the "useEffect" hook.

- [x] 9:00 am - 3:00 pm: The React component "About" performs a series of tasks, including importing dependencies, initializing multiple state variables like "loading," "stations," "selectedStation," and others. It defines functions to handle user interactions such as selecting stations and dates, fetching real-time BART data, and checking if both stations are selected. The component utilizes the "useEffect" hook to trigger actions when specific variables change, such as updating available time options based on the selected date. It also provides a user interface with dropdowns to select stations, dates, and times and displays real-time BART information, including closest trains and their departure times, when both stations are selected and matching routes are found.

- [x] 8:00 pm - 10:00 pm: Add route page RouteInfo I transferred the logic from About.js to RouteInfo.js. Added RouteInfo.CSS. Enhanced CSS to include a person user experience. Component Footer.js/Footer.css. Added to give visibility to user interface.

### 9/18/2023
- [x] 9:00 am - 11:00 am: Added JSDOC to all components / files in the application to give better fluid workflow for reading the codebase.

### 9/19/2023
- [x] 12:00 pm - 3:00 pm: Removed from home page static BART API image. Added dependency library leaflet. Added a interactive MAP to the home page letting users click on Train emoji icons that will display details regarding the station on a accurate visual map. Updated CSS. Added a stationInfoService file to interact with a fetch to the API to get information on the station using longitude and latitude.

### 9/21/2023
- [x] 10:00 am - 12:00 pm: Added dynamic UX css to pages to give users better friendly experience when browsing through application. Being able to use any device. Updated index.html to include a google font to give more eye-catching modern look.

### 9/23/2023
- [x] 2:30 pm - 3:30 pm: Contact.js file. Contact form implemented EmailJS API backend server to allow users to submit emails to contact the creator.

- [x] 10:00 pm - 12:00 pm: Refactored RouteInfo.js file to RealTimeDepartures. Page is dynamic and re-renders component when time has passed to reflect real-time. Enhancing user functionality. CSS improved for header and RealTimeDepartures.

# Total time spent: 23 hours