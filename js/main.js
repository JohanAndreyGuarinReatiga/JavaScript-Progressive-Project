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

// ip search feature

async function handleSearch() {
  const ipAddress = ipInput.value.trim()
  try{
    setLoadingState(true)

    const locationData = await 
    fetchIPData(ipAddress)

    displayResults(locationData)

    saveToHistory(locationData)
  }catch(error){
    console.error("error fetching ip data", error)
    alert("failed to fetch data. Try again")
  }finally{
    setLoadingState(false)
  }
}

// get  current location
// this is cleaning input field to inidicate thjat were gettin current ip
function getCurrentLocation(){
  ipInput.value = ""
  handleSearch()
}

// fetch 
async function fetchIPData(ipAddress) {
  try{
    let url = `${API_URL}?apiKey=${KEY}`
    if (ipAddress){
      url += `&ipAddress=${ipAddress}`
    }

    const response = await fetch(url)

    if(!response.ok){
      const errorData = await response.json()
      throw new Error(errorData.message || `api request failed, status: ${response.status}`)
    }

    const data = await response.json()
    
  return {
      ip: data.ip,
      country: data.location.country || "-",
      region: data.location.region || "-",
      state: data.location.region || "-",
      city: data.location.city || "-",
      latitude: data.location.lat?.toString() || "-",
      longitude: data.location.lng?.toString() || "-",
      timezone: data.location.timezone || "-",
      isp: data.isp || "-",
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error in fetching:", error)
    throw error
  }
}

// show results in the page
function displayResults(data) {
  
  ipDisplay.textContent = `IP: ${data.ip}`

  // Update all information fields
  countryElement.textContent = data.country || "-"
  regionElement.textContent = data.region || "-"
  stateElement.textContent = data.state || "-"
  cityElement.textContent = data.city || "-"
  latitudeElement.textContent = data.latitude || "-"
  longitudeElement.textContent = data.longitude || "-"
  timezoneElement.textContent = data.timezone || "-"

  // Show the result 
  resultCard.classList.remove("hidden")
  resultCard.style.animation = "none"
  resultCard.offsetHeight 
  resultCard.style.animation = "fadeIn 0.8s ease-in-out"
}


function saveToHistory(data) {
  // Get existing history from localStorage
  let history = JSON.parse(localStorage.getItem("ipSearchHistory")) || []

  // Addat the beginning
  history.unshift({
    ip: data.ip,
    country: data.country,
    city: data.city,
    timestamp: data.timestamp || new Date().toISOString(),
  })

  // limit 10 items
  if (history.length > 10) {
    history = history.slice(0, 10)
  }

  // Save
  localStorage.setItem("ipSearchHistory", JSON.stringify(history))

  // Update
  loadSearchHistory()
}
// load and show history
function loadSearchHistory() {
  const history = JSON.parse(localStorage.getItem("ipSearchHistory")) || []

  // clear
  historyList.innerHTML = ""

  if (history.length === 0) {
    historyList.innerHTML = '<div class="history-item"><p>No search history yet</p></div>'
    return
  }

  // Add each item 
  history.forEach((item, index) => {
    const historyItem = document.createElement("div")
    historyItem.className = "history-item"
    historyItem.dataset.ip = item.ip

    //  date
    const date = new Date(item.timestamp)
    const formattedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString()

    historyItem.innerHTML = `
            <div>
                <span class="history-ip">${item.ip}</span>
                <div class="history-details">${item.city}, ${item.country}</div>
            </div>
            <span class="history-date">${formattedDate}</span>
        `
    historyItem.addEventListener("click", () => {
      ipInput.value = item.ip
      handleSearch()
    })

    historyItem.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.1}s both`

    historyList.appendChild(historyItem)
  })
}

//  clear history
function clearSearchHistory() {
  if (confirm("Are you sure you want to clear your search history?")) {
    localStorage.removeItem("ipSearchHistory")
    loadSearchHistory()
  }
}

//  loading state
function setLoadingState(isLoading) {
  if (isLoading) {
    searchBtn.disabled = true
    currentLocationBtn.disabled = true
    searchBtn.textContent = "Searching..."
  } else {
    searchBtn.disabled = false
    currentLocationBtn.disabled = false
    searchBtn.textContent = "Search"
  }
}