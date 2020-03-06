let baseUrl = "http://localhost:3000/beers"

document.addEventListener("DOMContentLoaded", function(){

fetch(baseUrl)
.then(resp => resp.json())
.then(beers => getBeers(beers))

function getBeers(beers){
let ul = document.getElementsByClassName("list-group")[0]

beers.forEach(beer => {
    let li = document.createElement("li")
    li.className = "list-group-item"
    li.dataset.id = beer.id

    li.innerHTML = 
    `
    ${beer.name}
    `

    ul.append(li)
}) // ends foreach beer
} // ends getBeers

document.addEventListener("click", function(e){
    if(e.target.className === "list-group-item"){
        fetch(`${baseUrl}/${e.target.dataset.id}`)
        .then(resp => resp.json())
        .then(beer => postBeer(beer))
    }// ends if

    if(e.target.className === "edit-beer"){
        let textarea = document.querySelector("textarea")
        let data = {"description": textarea.value}

        fetch(`${baseUrl}/${e.target.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })// ends patch
    } // ends edit button
}) // ends document event listener

function postBeer(beer){
    let showDiv = document.getElementById("beer-detail")

    showDiv.innerHTML = 
    `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea class = "description">${beer.description}</textarea>
    <button class="edit-beer" id= ${beer.id}>
    Save
    </button>
    `
}// ends Postbeer
}) // ends DOM content Loaded