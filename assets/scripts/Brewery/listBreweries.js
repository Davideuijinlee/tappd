function getBreweriesByCityName(storedCityName) {
  $.ajax({
    method: "GET",
    url: `https://api.openbrewerydb.org/breweries?by_city=${storedCityName}`,
    success: (breweriesInCity) => {
      if (breweriesInCity.length < 1) {
        localStorage.clear()
        const userErrorMessage = renderErrorMessageForUser()
        containerForBreweryContainers.appendChild(userErrorMessage)
        webpageBg.classList.add("error-msg-bg")
      } else {
        for (let i = 0; i < 10; i++) {
          let renderBreweryOutput = renderBrewery(breweriesInCity[i])
          containerForBreweryContainers.appendChild(renderBreweryOutput)
        }
        cityNameTitle.textContent = breweriesInCity[0].city
      }
    },
    error: (error) => {
      console.error(error)
      const userErrorMessage = renderErrorMessageForUser()
      containerForBreweryContainers.appendChild(userErrorMessage)
      webpageBg.classList.add("error-msg-bg")
    }
  })
}

function renderBrewery(breweryInfo) {
  const breweryContainer = document.createElement("div")
  const breweryName = document.createElement("h3")
  const websiteTitle = document.createElement("h4")
  const breweryUrl = document.createElement("a")
  const addressTitle = document.createElement("h4")
  const breweryAddress = document.createElement("div")
  const breweryStreet = document.createElement("p")
  const addressBlock = document.createElement("p")
  const breweryCity = document.createElement("span")
  const breweryState = document.createElement("span")
  const breweryPostal = document.createElement("span")
  const phoneTitle = document.createElement("h4")
  const breweryPhone = document.createElement("p")

  breweryContainer.className = "bg-color-white width-100 padding-1 mb-2rem opacity-95"
  websiteTitle.className = "info-title drink-text"
  addressTitle.className = "info-title drink-text"
  phoneTitle.className = "info-title drink-text"

  websiteTitle.textContent = "WEBSITE"
  addressTitle.textContent = "ADDRESS"
  phoneTitle.textContent = "PHONE"
  breweryName.textContent = breweryInfo.name
  breweryUrl.textContent = breweryInfo.website_url
  breweryStreet.textContent = breweryInfo.street
  breweryCity.textContent = `${breweryInfo.city}, `
  breweryState.textContent = `${breweryInfo.state} `
  breweryPostal.textContent = breweryInfo.postal_code
  breweryPhone.textContent = breweryInfo.phone

  breweryUrl.setAttribute("href", breweryInfo.website_url)
  breweryUrl.setAttribute("target", "_blank")

  addressBlock.append(breweryCity, breweryState, breweryPostal)
  breweryAddress.append(breweryStreet, addressBlock)
  breweryContainer.append(
    breweryName,
    websiteTitle,
    breweryUrl,
    addressTitle,
    breweryAddress,
    phoneTitle,
    breweryPhone
  )

  return breweryContainer
}

function renderErrorMessageForUser() {
  const errorMessageContainer = document.createElement("div")
  const tryAgainBtn = document.createElement("a")
  errorMessageContainer.className = "mt-3rem"
  tryAgainBtn.className = "try-again-btn color-dark-gray"
  tryAgainBtn.textContent = "Try Again"
  cityNameTitle.textContent = "No"
  errorMsgTitle.textContent = "Found"
  tryAgainBtn.setAttribute("href", "lets-go-out.html")
  errorMessageContainer.append(tryAgainBtn)

  return errorMessageContainer
}


const cityNameOnForm = localStorage.getItem("breweryCityName")
const containerForBreweryContainers = document.querySelector(".brewery-content")
const cityNameTitle = document.getElementById("city-name")
const errorMsgTitle = document.getElementById("error-msg")
const webpageBg = document.querySelector("brewery-bg")

getBreweriesByCityName(cityNameOnForm)

const body = document.querySelector("body")
window.addEventListener("load", function () {
  body.className = "loaded"
})