# Task Duration: 3-5 hours

**Overview of task:**
After your mentor approves of your capstone project proposal, you’ll figure out where your data will come from by finding and using an existing API.

### Familiarizing with the BART Legacy API Data and Format with AJAX, JSON, and React Hooks:

After selecting the BART Legacy API for my project, I began the process of familiarizing myself with the data it contains and how it is formatted. This step is crucial in understanding how to efficiently retrieve, process, and display the information within my React-based travel planner web app, utilizing AJAX for data fetching and JSON for structured data handling with React Hooks.

Data Content:
The BART Legacy API provides a wealth of data related to the Bay Area Rapid Transit system. This includes information on:

- Stations: Details about BART stations, including their names, abbreviations, geographical coordinates, and information about connecting transit services.

- Routes: Information about different BART routes, including route names, line codes, and the stations they serve.

- Schedules: Real-time schedules for trains, including arrival and departure times for each station.

- Advisories: Updates on service advisories, which can include information about delays, disruptions, or other important announcements affecting BART service.

- Elevator Status: Information about the status of elevators and escalators at BART stations, including whether they are in service or undergoing maintenance.

Data Format:
The BART Legacy API primarily returns data in XML format. However, I will use AJAX to fetch this data and convert it into a structured JSON format that is more manageable within my React components.

Data Assessment:
In considering what data I'll need for my travel planner web app and what data in the API may be unnecessary, I've identified the following:

- Essential Data: I will need station information, including names and coordinates, real-time train schedules, and service advisories. This data is crucial for trip planning and providing users with accurate and up-to-date information.

- Potentially Unnecessary Data: Some data provided by the API, such as elevator status, may not be directly relevant to trip planning and could be considered unnecessary for my project. However, it might be valuable for enhancing the user experience in future iterations.

Data Cleanliness and Manipulation:
While reviewing the data, I noticed that some of it could be considered messy or require manipulation before it's usable. Here's how I might handle this with React Hooks:

- Parsing XML Response with useEffect: I'll use the useEffect hook in React to fetch data from the API using AJAX when the component mounts. The data will be received in XML format.

- Converting XML to JSON: Within the useEffect hook, I'll use JavaScript libraries like DOMParser to convert the XML response into a structured JSON format. This JSON data will be stored in the component's state using the useState hook.

- Data Cleaning and Transformation: After converting to JSON, I can apply any necessary data cleaning and transformation operations, such as filtering out unnecessary fields, reformatting timestamps, or extracting relevant information.

- Rendering Data with React Components: Once the JSON data is clean and structured, I'll use React components and React Hooks like map to dynamically render UI elements based on the retrieved data. For example, I can display station options in a dropdown menu or list real-time train schedules.

Incorporating AJAX, JSON, and React Hooks will allow me to efficiently manage the data retrieval and rendering process while maintaining a responsive and user-friendly travel planner web app.