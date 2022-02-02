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

const cityNameList = document.querySelector(".place-list");
const cardContainer = document.querySelector(".card-container");

(async function () {
  // Fetch City Names
  const cityNames = await fetch(
    "https://raw.githubusercontent.com/Dipen-Dedania/static-data/main/india-popular-city.json"
  ).then((response) => response.json());

  // Add Cities in HTML
  for (let i = 0; i < cityNames.city.length; i++) {
    const div = document.createElement("div");
    div.addEventListener("click", updateCity(this));
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
    const bookmark = cards[i].isBookmark;
    div.innerHTML = `
    <i class="${bookmark === true ? "fas" : "far"} fa-bookmark bookmark"></i>
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
const dateList = document.querySelector(".date-list");
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
    dateList.style.display = "none";
  } else if (
    e.target.classList.contains("day-box") ||
    e.target.parentNode.classList.contains("day-box")
  ) {
    dayList.style.display === "block"
      ? (dayList.style.display = "none")
      : (dayList.style.display = "block");
    placeList.style.display = "none";
    dateList.style.display = "none";
  } else if (
    e.target.classList.contains("date-box") ||
    e.target.parentNode.classList.contains("date-box")
  ) {
    dateList.style.display === "block"
      ? (dateList.style.display = "none")
      : (dateList.style.display = "block");
    placeList.style.display = "none";
    dayList.style.display = "none";
  } else {
    placeList.style.display = "none";
    dayList.style.display = "none";
    dateList.style.display = "none";
  }
});

function updateCity(e) {
  console.log("Hii");
  console.log(e);
}
