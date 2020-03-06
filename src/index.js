document.addEventListener("DOMContentLoaded", e => {
    let beerUl = document.getElementsByClassName("list-group")[0]
    let baseUrl = "http://localhost:3001/beers/"
    
    
    fetch("http://localhost:3001/beers")
    .then(resp => resp.json())
    .then(beers => listBeers(beers))//FETCH GET BEERS

    function listBeers(beers) {
        beers.forEach(beer => {
            beerUl.innerHTML += `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
            
        }) //FOR EACH
    }//listbeers()

    document.addEventListener("click", e => {
        switch(e.target.className) {
            case "list-group-item":
            getBeerInfo(e.target)
            break;
            case "btn btn-info":
            editDescription(e.target)
            default:
            break;
        }//SWITCH
    })//CLICK EVENT LISTENER

    function getBeerInfo(beerLi) {
        fetch(`${baseUrl}/${beerLi.dataset.id}`)
        .then(resp => resp.json())
        .then(beer => displayBeerInfo(beer))// FETCH GET 1 BEER
    }//GET_BEER_INFO()

    function displayBeerInfo(beer) {
        let beerCard = document.getElementById("beer-detail")   //BEERCARD
        beerCard.dataset.id = `${beer.id}`
        beerCard.innerHTML = `
        <h1>${beer.name}</h1>
        <img src="${beer.image_url}">
        <h3>${beer.tagline}</h3>
        <textarea class="decsription-box">${beer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">
          Save
        </button>
        `
    }//DISPLAY_BEER_INFO()

    function editDescription(beer) {
        let descriptionBox = document.getElementsByClassName("decsription-box")[0]
        let data = {description: descriptionBox.value}
        fetch(`${baseUrl}/${beer.parentNode.dataset.id}`,{
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(console.log)
        
        

    }//EDIT_DESCRIPTION()




    



    
})//DOMcontent