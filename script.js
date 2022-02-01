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
