import * as module from '../modules/getdata.js';



const usercol = document.querySelector(".usercol")
let user = []

const createPerson = async(url) => {
    user = await module.requestdata(url)
    document.querySelector("title").innerHTML = user.name
    usercol.innerHTML = `<div class="jumbotron vh-100">
    <h1 class="display-4 text-wrap">Hello, world! This is ${user.name}</h1>
    <p class="lead">${user.company.catchPhrase} @ ${user.company.name}</p>
    <hr class="mt-4">
    <div class="container">
        <div class="row flex-column">
            <div class="col my-2">
                <div class="card">
                    <div class="card-header">
                        Contact Details - ${user.username}
                    </div>
                    <ul class="list-group list-group-flush ">
                        <li class="list-group-item ">${user.name}</li>
                        <li class="list-group-item ">Mail: ${user.email}</li>
                        <li class="list-group-item ">Phone: ${user.phone.split(" ")[0]}</li>
                        <li class="list-group-item ">Address:<br> ${user.address.street},<br>${user.address.suite},<br>${user.address.city},<br>(${user.address.zipcode})</li>
                        <li class="list-group-item ">Website: ${user.website}</li>
                    </ul>
                </div>
            </div>
            <div class="col my-2">
                <div class="card">
                    <div class="card-header">
                        Company
                    </div>
                    <ul class="list-group list-group-flush ">
                        <li class="list-group-item ">${user.company.name}</li>
                        <li class="list-group-item ">${user.company.catchPhrase}</li>
                        <li class="list-group-item ">${user.company.bs}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>`
}


window.onload = () => {
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id').replace(/\D/g, '');

    let url = `https://jsonplaceholder.typicode.com/users/${id}`

    createPerson(url)
}