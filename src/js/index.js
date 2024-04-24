
import "../scss/style.scss";
import "bootstrap/js/dist/button";
import Modal from "bootstrap/js/dist/modal";
import getWeatherInfo from "./weather";
import { toggleSearchIcon, renderErrorInfo, renderWeatherInfo } from "./ui";

// Selectors
const weatherForm = document.querySelector(".weather-form");
const searchBtn = document.querySelector(".search-btn");
const searchModal = document.querySelector("#search-modal");
const searchLabel = document.querySelector(".search-label");
const modal = new Modal(searchModal);

/**
 * Renders weather information for a given location.
 * @param {string} location - The location for which weather information is requested.
 * @param {HTMLElement} target - The target element to toggle search icon.
 */
const renderInfo = async (location, target) => {
    toggleSearchIcon(target);
    const weatherInfo = await getWeatherInfo(location);
    toggleSearchIcon(target);

    if (weatherInfo.error) {
        renderErrorInfo(weatherInfo.error);
    } else {
        renderWeatherInfo(weatherInfo);
    }
};

/**
 * Handles form submission to fetch weather information.
 * @param {Event} e - The form submission event.
 */
const handleFormSubmit = async (e) => {
    e.preventDefault();

    const location = e.target.location.value;
    await renderInfo(location, searchLabel);
    modal.hide();
    e.target.reset();
};

// Event listener for form submission
weatherForm.addEventListener("submit", handleFormSubmit);

// Immediately invoked function to fetch weather information for user's location
(async () => {
    await renderInfo("auto:ip", searchBtn);
})();
