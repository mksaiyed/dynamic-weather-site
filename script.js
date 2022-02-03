// Today's Date
const today = new Date();
const dd = today.getDate();
const mm = today.getMonth();
const yy = today.getFullYear();
const day = today.getDay();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
document.querySelector(".dd").innerText = dd;
document.querySelector(".mm").innerText = monthNames[mm];
document.querySelector(".yy").innerText = yy;
document.querySelector(".day").innerText = dayNames[day];

const dateBox = document.getElementById("date-box");
// to get value="2022-01-03"in this formate
let date = `${yy}-${(mm + 1).toString().padStart(2, "0")}-${dd
  .toString()
  .padStart(2, "0")}`;
dateBox.value = date;

const cityNameList = document.querySelector(".place-list");
const cardContainer = document.querySelector(".card-container");
const cityName = document.querySelectorAll(".city-name");
const cityWeather = document.querySelector(".city-weather");
const dayName = document.querySelector(".day-name");
const tempIcon = document.getElementById("temp-icon");

(async function () {
  // Onload Display weather of default city
  if (cityName[0].innerText == "All Places") {
    const defaultCity = "Ahmedabad";
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=40db66e9bde6163ca2558b11696fd725`
    ).then((response) => response.json());

    const temp = (parseFloat(weatherData.main.temp) - 273.15).toFixed(2);
    cityWeather.innerHTML = `${temp}&deg;`;
    cityName[1].innerText = defaultCity;

    if (temp < 15) {
      tempIcon.innerHTML = `<i class="fas fa-snowflake"></i>`;
    } else if ((temp > 15) & (temp < 25)) {
      tempIcon.innerHTML = `<i class="fas fa-cloud-sun"></i `;
    } else {
      tempIcon.innerHTML = `<i class="fas fa-sun"></i>`;
    }
  }

  // Fetch City Names
  const cityNames = await fetch(
    "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/india-popular-city.json"
  ).then((response) => response.json());

  // Add Cities in HTML
  for (let i = 0; i < cityNames.city.length; i++) {
    const div = document.createElement("div");
    // div.addEventListener("click", updateCity(this));
    div.setAttribute("onclick", "updateCity(this)");
    div.innerText = cityNames.city[i].name;
    cityNameList.append(div);
  }

  // Fetch Card Details
  const cards = await fetch(
    "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/make-your-trip-package.json"
  ).then((response) => response.json());

  // Add Card in HTML
  for (let i = 0; i < cards.length; i++) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <i class="${
      cards[i].isBookmark === true ? "fas" : "far"
    } fa-bookmark bookmark" onclick="bookmarkChange(this)"></i>
    <!-- Card Header -->
    <div>
      <p class="card-heading">${cards[i].cityName}</p>
      <p class="card-date">${cards[i].tourDate}</p>
      <p class="card-category silver">${cards[i].category}</p>
    </div>

    <!-- Card Temperature -->
    <div class="card-temperature">
      <p class="label">Average Temperature</p>
      <div class="line"></div>
      <p class="temperature-text">
        + ${cards[i].temp}&deg;
        <i class="fas fa-sun sun"></i>
      </p>
    </div>

    <!-- Image -->
    <img
      class="card-image"
      src="${cards[i].cityImg}"
    />

    <!-- Card Bottom prize & button -->
    <div class="card-bottom">
      <div>
        <p class="label silver">Total Price</p>
        <p class="price">${cards[i].price}</p>
      </div>
      <button class="explore-btn">Explore</button>
    </div>`;
    cardContainer.append(div);
  }
})();

// Show events on click
const listBox = document.querySelectorAll(".list-box");
const placeList = document.querySelector(".place-list");
const dayList = document.querySelector(".day-list");
window.addEventListener("click", (e) => {
  // console.log(e.target.parentNode.matches(".place-box"));
  // console.log(e.target.parentNode.classList.contains("place-box"));
  if (
    e.target.classList.contains("place-box") ||
    e.target.parentNode.classList.contains("place-box")
  ) {
    placeList.style.display === "block"
      ? (placeList.style.display = "none")
      : (placeList.style.display = "block");
    dayList.style.display = "none";
  } else if (
    e.target.classList.contains("day-box") ||
    e.target.parentNode.classList.contains("day-box")
  ) {
    dayList.style.display === "block"
      ? (dayList.style.display = "none")
      : (dayList.style.display = "block");
    placeList.style.display = "none";
  } else {
    placeList.style.display = "none";
    dayList.style.display = "none";
  }
});

// Capture Updated city and Update The Weather
async function updateCity(e) {
  const name = (cityName[0].innerText = e.innerText);
  cityName[1].innerText = name;
  const loader = document.querySelector(".loader");
  const weather = document.querySelector(".weather");
  if (name != "All Places") {
    loader.style.display = "block";
    weather.style.display = "none";
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=40db66e9bde6163ca2558b11696fd725`
    )
      .then((response) => response.json())
      .catch((e) => alert("Sorry This city's data not found !"));

    const temp = (parseFloat(weatherData.main.temp) - 273.15).toFixed(2);
    cityWeather.innerHTML = `${temp}&deg;`;

    if (temp < 15) {
      tempIcon.innerHTML = `<i class="fas fa-snowflake"></i>`;
    } else if ((temp > 15) & (temp < 25)) {
      tempIcon.innerHTML = `<i class="fas fa-cloud-sun"></i `;
    } else {
      tempIcon.innerHTML = `<i class="fas fa-sun"></i>`;
    }

    if (weatherData != null) {
      weather.style.display = "flex";
      weather.style.animation = "weather 1s linear";
      loader.style.display = "none";
    }
  }
}

function updateDay(e) {
  dayName.innerText = e.innerText;
}

function bookmarkChange(e) {
  if (e.classList.contains("far")) {
    e.classList.remove("far");
    e.classList.add("fas");
  } else {
    e.classList.remove("fas");
    e.classList.add("far");
  }
}
