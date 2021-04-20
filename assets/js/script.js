let url = "https://jsonplaceholder.typicode.com/users";
const usersection = document.querySelector(".usersection");
const searchField = document.querySelector(".searchField");
const select = document.querySelector(".select");
let users = [];
let filteredUsers = [];
//Fetch data
const requestdata = (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => console.log(err));
  });
};
const showResults = async (url) => {
  users = await requestdata(url);
  createCards(users);
};

// Create the userCars
const createCards = (results) => {
  usersection.querySelector(".userRow").innerHTML = "";
  usersection.querySelector(".userRow").innerHTML += [...results]
    .map((user) => {
      return `<div class="col-4 mt-5">
                  <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">${user.username}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${user.name}</h6>
                        <p class="card-text">${user.email}</p>
                      </div>
                    </div>
                </div>`;
    })
    .join("");
};

//Filters for the users choice
function filterUser(value) {
  const filterIndex = select.selectedIndex;
  let filter = "";
  switch (true) {
    case filterIndex === 1:
      filter = "name";
      break;
    case filterIndex === 2:
      filter = "username";
      break;
    case filterIndex === 3:
      filter = "email";
      break;
  }
  if (value.length >= 3) {
    filteredUsers = users.filter((user) => {
      // console.log("value:", value, user[filter].toLowerCase());
      if (user[filter].toLowerCase().includes(value.toLowerCase())) {
        return user[filter];
      }
    });
    createCards(filteredUsers);
  } else if (value.length === 0) {
    createCards(users);
  }
}

let makeAddress = () => {
  let arrayOfAddress = users.map((user) => user.address);
  console.log(arrayOfAddress);
};

window.onload = () => {
  showResults(url);
  searchField.addEventListener("keyup", function () {
    filterUser(this.value);
  });
};
