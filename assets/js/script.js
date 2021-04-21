import * as module from '../modules/getdata.js';
import * as test from '../verge'

let url = "https://jsonplaceholder.typicode.com/users"
const usersection = document.querySelector(".usersection")
const searchField = document.querySelector(".searchField")
const select = document.querySelector(".select")
const sortButton = document.querySelector(".sort")

let cordinates = [];
let users = []
let filteredUsers = []
let ascending = true
let map

//Fetch data
const showResults = async(url) => {
    users = await module.requestdata(url)
    createCards(users)
    makeAddress()
    module.createGoogleMapScript(map, users)
}

// Create the userCars
const createCards = (results) => {
    usersection.querySelector(".userRow").innerHTML = ""
    usersection.querySelector(".userRow").innerHTML += [...results].map((user) => {
        return `<div class="col-sm-12 col-md-4 mt-1">
                  <a href='person.html?id="${user.id}"'>
                    <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">${user.username}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${user.name}</h6>
                          <p class="card-text">${user.email}</p>
                        </div>
                      </div>
                  </a>
                </div>`
    }).join("")

}

//Filters for the users choice
function filterUser(value) {
    const filterIndex = select.selectedIndex
    let filter = select.options[select.selectedIndex].text
    if (value.length >= 3) {
        filteredUsers = users.filter((user) => {
            if (user[filter].toLowerCase().includes(value.toLowerCase())) {
                return user[filter]
            }
        })
        createCards(filteredUsers)
    } else if (value.length === 0) {
        createCards(users)
    }

}

const makeAddress = () => {
    let arrayOfAddress = users.map((user) => {
        return `${user.address.street}, ${user.address.suite}, ${user.address.city}, (${user.address.zipcode})`
    });
    //console.log(arrayOfAddress)
};

// users sort()
const sort = () => {
    if (ascending) {
        users.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1
            }
            return 0
        })
        ascending = false
    } else {
        users.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1
            }
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1
            }
            return 0
        })
        ascending = true
    }

    createCards(users)
}

window.onload = () => {
    showResults(url)
    searchField.addEventListener("keyup", function() { filterUser(this.value) })
    sortButton.addEventListener("click", () => { sort() });
}