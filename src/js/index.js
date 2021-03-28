const ipResult = document.querySelector("#ip_result");
const locationResult = document.querySelector("#location_result");
const timezoneResult = document.querySelector("#timezone_result");
const ispResult = document.querySelector("#isp_result");
const input = document.querySelector("#ip");
const button = document.querySelector("button");
const error = document.querySelector("#error");

ipResult.textContent = "192.212.174.101";
locationResult.textContent = "BUS, California 91770, Rosemead";
timezoneResult.textContent = "-07:00";
ispResult.textContent = "Southern California Edison";

let map = L.map("map");
map.setView([34.08057, -118.07285], 13);
L.marker([34.08057, -118.07285]).addTo(map);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
  {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

const locateInMap = (lat, lon) => {
  map.setView([lat, lon], 13);
  L.marker([lat, lon]).addTo(map);
};

const searchIp = (ip) => {
  fetch(
    ` https://geo.ipify.org/api/v1?apiKey=at_BboeTkob22HpNAnFeX7AAVkPTJsf6&ipAddress=${ip}`
  )
    .then((data) => data.json())
    .then((json) => {
      locationResult.textContent = `${json.location.country}, ${json.location.region} ${json.location.postalCode}, ${json.location.city}`;
      ipResult.textContent = json.ip;
      timezoneResult.textContent = `UTC ${json.location.timezone}`;
      ispResult.textContent = json.isp;
      locateInMap(json.location.lat, json.location.lng);
    })
    .catch((err) => {
      error.parentElement.classList.add("show");
      setTimeout(() => error.parentElement.classList.remove("show"), 2000);
      error.textContent = "Input a correct IPv4 or IPv6 address";
    });
};

const searchPlace = () => {
  const inputValue = input.value;
  searchIp(inputValue);
  input.value = "";
};
button.addEventListener("click", searchPlace);
