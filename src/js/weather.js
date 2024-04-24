
/**
 * Fetches weather information for a given location using the WeatherAPI.
 * @param {string} location - The location for which weather information is requested.
 * @returns {Promise<Object>} - A promise that resolves to an object containing weather information.
 */
const getWeatherInfo = async (location) => {
    // Replace 'API_KEY' with your actual WeatherAPI key
    const apiKey = "b354cda19a2249fd8cc131405242304";
    // Construct the URL for the WeatherAPI request
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`;

    try {
        // Fetch weather data from the WeatherAPI
        const response = await fetch(apiUrl, { mode: "cors" });
        // Parse the response as JSON
        const data = await response.json();

        // Check if the response contains an error
        if (data.error) {
            // If error exists, return an object with the error message
            return { error: data.error.message };
        }

        // Extract relevant weather information from the response
        const { current } = data;
        // Get the forecast for the current day
        const forecast = data.forecast.forecastday[0].astro;

        // Construct and return an object with the extracted weather information
        return {
            location: data.location.name,
            region: data.location.region,
            country: data.location.country,
            isDay: current.is_day,
            icon: current.condition.icon,
            temperature: current.temp_c,
            condition: current.condition.text,
            uvIndex: current.uv,
            sunrise: forecast.sunrise, // Sunrise time
            windSpeed: current.wind_kph,
            precipitation: current.precip_mm,
            apparentTemperature: current.feelslike_c,
            humidity: current.humidity,
            visibility: current.vis_km,
            pressure: current.pressure_mb,
        };
    } catch (error) {
        // If an error occurs during the fetch operation, return an error object
        return { error: "An error occurred while fetching the weather data" };
    }
};

// Export the getWeatherInfo function as the default export
export default getWeatherInfo;
