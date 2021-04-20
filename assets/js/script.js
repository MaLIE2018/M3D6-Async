let url = "https://jsonplaceholder.typicode.com/users"
const usersection = document.querySelector(".usersection")
const searchField = document.querySelector(".searchField")
const select = document.querySelector(".select")
let users = []
let filteredUsers = []
let ascending = true
    //Fetch data
const requestdata = (url) => {
    return new Promise((resolve) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((err) => console.log(err))
    })
}
const showResults = async(url) => {
    users = await requestdata(url)
    createCards(users)
    makeAddress()
}

// Create the userCars
const createCards = (results) => {
    usersection.querySelector(".userRow").innerHTML = ""
    usersection.querySelector(".userRow").innerHTML += [...results].map((user) => {
        return `<div class="col-4 mt-1">
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
        // switch (true) {
        //     case filterIndex === 1:
        //         filter = "name"
        //         break;
        //     case filterIndex === 2:
        //         filter = "username"
        //         break;
        //     case filterIndex === 3:
        //         filter = "email"
        //         break;
        // }
    if (value.length >= 3) {
        filteredUsers = users.filter((user) => {
            // console.log("value:", value, user[filter].toLowerCase());
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
    console.log(arrayOfAddress)
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
    document.querySelector(".sort").addEventListener("click", () => { sort() })
}