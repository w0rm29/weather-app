
const body = document.querySelector("body");
const container = document.querySelector(".container");

/**
 * Switches CSS classes on an HTML element.
 * @param {HTMLElement} element - The HTML element to switch classes on.
 * @param {string} initialClass - The initial CSS class to remove.
 * @param {string} finalClass - The final CSS class to add.
 */
const switchClass = (element, initialClass, finalClass) => {
    element.classList.remove(initialClass);
    element.classList.add(finalClass);
};

/**
 * Removes all child elements from a container.
 */
const clearWeatherInfo = () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

/**
 * Creates a new HTML row element with specified classes.
 * @returns {HTMLDivElement} - The created row element.
 */
const createRow = () => {
    const row = document.createElement("div");
    row.classList.add("row", "row-cols-1", "row-cols-xs-2", "g-3");
    return row;
};

/**
 * Creates a new HTML element with specified tag, classes, and optional text content.
 * @param {string} tag - The HTML tag for the element.
 * @param {string[]} classes - An array of CSS classes to add to the element.
 * @param {string} text - Optional text content for the element.
 * @returns {HTMLElement} - The created HTML element.
 */
const createCustomElement = (tag, classes, text) => {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    if (text) element.textContent = text;
    return element;
};

/**
 * Gets formatted text for specific weather card titles.
 * @param {string} title - The title of the weather card.
 * @param {string} info - The corresponding weather information.
 * @returns {string} - The formatted text for the weather card.
 */
const getCardText = (title, info) => {
    switch (title) {
        case "Feels Like":
            return `${info}°C`;
        case "Wind":
            return `${info} km/h`;
        case "UV Index":
            return info;
        case "Precipitation":
            return `${info} mm`;
        case "Humidity":
            return `${info}%`;
        case "Visibility":
            return `${info} km`;
        case "Pressure":
            return `${info} mb`;
        case "Sunrise":
            return info.slice(1); // Remove leading zero character
        default:
            return "";
    }
};

/**
 * Gets the icon for specific weather card titles.
 * @param {string} title - The title of the weather card.
 * @returns {string[]} - An array containing the icon classes.
 */
const getCardIcon = (title) => {
    switch (title) {
        case "Feels Like":
            return ["bi", "bi-thermometer-sun", "me-2"];
        case "Wind":
            return ["bi", "bi-wind", "me-2"];
        case "UV Index":
            return ["bi", "bi-sun-fill", "me-2"];
        case "Precipitation":
            return ["bi", "bi-droplet-fill", "me-2"];
        case "Humidity":
            return ["bi", "bi-water", "me-2"];
        case "Visibility":
            return ["bi", "bi-eye-fill", "me-2"];
        case "Pressure":
            return ["bi", "bi-speedometer", "me-2"];
        case "Sunrise":
            return ["bi", "bi-sunrise-fill", "me-2"];
        default:
            return [];
    }
};

/**
 * Sets the theme (day or night) based on the provided flag.
 * @param {boolean} isDay - Flag indicating whether it is daytime.
 */
const setTheme = (isDay) => {
    const themeClass = isDay ? "day-theme" : "night-theme";
    switchClass(
        body,
        body.classList.contains("day-theme") ? "day-theme" : "night-theme",
        themeClass
    );
};

/**
 * Creates a header element with location information.
 * @param {string} location - The name of the location.
 * @param {string} region - The region of the location.
 * @param {string} country - The country of the location.
 * @returns {HTMLDivElement} - The created header element.
 */
const createHeader = (location, region, country) => {
    const header = document.createElement("div");
    const locationDiv = document.createElement("div");
    const locationIcon = document.createElement("i");

    const regionText = region ? `${region}, ` : "";
    locationDiv.textContent = `${location}, ${regionText}${country}`;

    header.classList.add("pb-3");
    locationIcon.classList.add("bi", "bi-house-door-fill", "me-2");
    locationDiv.prepend(locationIcon);
    header.append(locationDiv);

    return header;
};

/**
 * Creates a hero card element displaying current weather.
 * @param {string} icon - The URL of the weather icon.
 * @param {number} temperature - The current temperature.
 * @param {string} condition - The current weather condition.
 * @returns {HTMLDivElement} - The created hero card element.
 */
const createHeroCard = (icon, temperature, condition) => {
    const heroCard = document.createElement("div");
    const cardBody = document.createElement("div");
    const flexContainer = document.createElement("div");
    const iconImg = document.createElement("img");
    const temperatureDiv = document.createElement("div");
    const conditionDiv = document.createElement("div");

    heroCard.classList.add("card", "hero", "mb-3");
    cardBody.classList.add("card-body");
    flexContainer.classList.add("d-flex", "align-items-center");
    temperatureDiv.classList.add("fs-1");
    conditionDiv.classList.add("fs-5", "ps-2");

    const cardTitleText = "Current Weather";
    const cardTitle = createCustomElement(
        "div",
        ["card-title", "fw-medium"],
        cardTitleText
    );

    iconImg.src = icon;
    temperatureDiv.textContent = `${temperature}°C`;
    conditionDiv.textContent = condition;

    flexContainer.append(iconImg, temperatureDiv);
    cardBody.append(cardTitle, flexContainer, conditionDiv);
    heroCard.append(cardBody);

    return heroCard;
};

/**
 * Creates a weather info card element with specified title and information.
 * @param {string} title - The title of the weather information.
 * @param {string} info - The corresponding weather information.
 * @returns {HTMLDivElement} - The created weather info card element.
 */
const createWeatherInfoCard = (title, info) => {
    const cardContainer = document.createElement("div");
    const card = document.createElement("div");
    const cardBody = document.createElement("div");

    cardContainer.classList.add("col");
    card.classList.add("card");
    cardBody.classList.add("card-body");

    const cardTitle = createCustomElement(
        "div",
        ["card-title", "fw-medium"],
        title
    );
    const cardText = createCustomElement(
        "div",
        ["card-text", "fs-1"],
        getCardText(title, info)
    );
    const cardIcon = createCustomElement("i", getCardIcon(title));

    cardTitle.prepend(cardIcon);
    cardBody.append(cardTitle, cardText);
    card.append(cardBody);
    cardContainer.append(card);

    return cardContainer;
};

/**
 * Toggles the search icon in the search box.
 * @param {HTMLElement} searchBox - The search box element.
 */
export const toggleSearchIcon = (searchBox) => {
    const searchIcon = createCustomElement("i", ["bi", "bi-search"]);
    const spinner = createCustomElement("div", [
        "spinner-border",
        "spinner-border-sm",
    ]);
    const initialIcon = searchBox.firstElementChild;

    if (searchBox.classList.contains("search-btn"))
        searchIcon.classList.add("me-0", "me-lg-2");

    searchBox.removeChild(initialIcon);

    searchBox.prepend(
        initialIcon.classList.contains("spinner-border") ? searchIcon : spinner
    );
};

/**
 * Renders an error message on the page.
 * @param {string} error - The error message to display.
 */
export const renderErrorInfo = (error) => {
    clearWeatherInfo();

    const errorContainer = document.createElement("div");
    const errorIcon = createCustomElement("i", [
        "bi",
        "bi-exclamation-triangle",
        "fs-1",
        "me-2",
    ]);
    const errorText = createCustomElement("div", ["fs-3"], error);

    errorContainer.classList.add(
        "d-flex",
        "justify-content-center",
        "align-items-center",
        "h-100"
    );

    errorContainer.append(errorIcon, errorText);
    container.append(errorContainer);
};

/**
 * Renders weather information on the page.
 * @param {Object} weatherInfo - The weather information object.
 */
export const renderWeatherInfo = (weatherInfo) => {
    clearWeatherInfo();

    setTheme(weatherInfo.isDay);
    const header = createHeader(
        weatherInfo.location,
        weatherInfo.region,
        weatherInfo.country
    );
    const heroCard = createHeroCard(
        weatherInfo.icon,
        weatherInfo.temperature,
        weatherInfo.condition
    );
    const row = createRow();

    const cardsData = [
        { title: "UV Index", info: weatherInfo.uvIndex },
        { title: "Sunrise", info: weatherInfo.sunrise },
        { title: "Wind", info: weatherInfo.windSpeed },
        { title: "Precipitation", info: weatherInfo.precipitation },
        { title: "Feels Like", info: weatherInfo.apparentTemperature },
        { title: "Humidity", info: weatherInfo.humidity },
        { title: "Visibility", info: weatherInfo.visibility },
        { title: "Pressure", info: weatherInfo.pressure },
    ];

    cardsData.forEach((data) => {
        const card = createWeatherInfoCard(data.title, data.info);
        row.append(card);
    });

    container.append(header, heroCard, row);
};
