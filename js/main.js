const ipInput = document.getElementById("ip-input")
const searchBtn = document.getElementById("search-btn")
const currentLocationBtn = document.getElementById("current-location-btn")
const resultCard = document.getElementById("result-card")
const ipDisplay = document.getElementById("ip-display")
const historyList = document.getElementById("history-list")
const clearHistoryBtn = document.getElementById("clear-history-btn")

// Data vars
const countryElement = document.getElementById("country")
const regionElement = document.getElementById("region")
const stateElement = document.getElementById("state")
const cityElement = document.getElementById("city")
const postalElement = document.getElementById("postal")
const latitudeElement = document.getElementById("latitude")
const longitudeElement = document.getElementById("longitude")
const timezoneElement = document.getElementById("timezone")

const KEY = "at_JJ1eX1RGQCZ6t8hElZf6EB5iPrI3x"
const API_URL = "https://geo.ipify.org/api/v2/country,city"

document.addEventListener("DOMContentLoaded", () => {
  loadSearchHistory()

  searchBtn.addEventListener("click", handleSearch)
  currentLocationBtn.addEventListener("click", getCurrentLocation)
  clearHistoryBtn.addEventListener("click", clearSearchHistory)

  ipInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  })
})
