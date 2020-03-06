const BASEURL = 'http://localhost:3000/beers'

document.addEventListener('DOMContentLoaded', ()=>{
    getBeers()
    editBeer()
})

/////// fetch beers and turn them into json ///////
function getBeers(){
    fetch(BASEURL)
    .then(resp=>resp.json())
    .then(loadBeers)
}


/////// take all beers and do a foreach to create a list of all on left hand side ///////
function loadBeers(beers){
    // debugger
    let listGroup = document.getElementById('list-group')
    beers.forEach(beer => {
        let li = document.createElement('li')
        li.className = 'list-group-item'
        li.dataset.id = beer.id
        li.innerText = beer.name 
        listGroup.append(li)
        // debugger
    });
    showBeer(beers)
}
///// add event listener on click to then fetch the beer from the db //////
function showBeer(beers){
    document.addEventListener('click', function(e){
        if(e.target.className === 'list-group-item'){
            // debugger
            let thisBeersId = e.target.dataset.id
            fetch(BASEURL+`/${thisBeersId}`)
            .then(resp=>resp.json())
            .then(beer=>showDetails(beer))
// debugger
        }
    })
}

////// once beer comes back from db, create the html to show it on the DOM ////
function showDetails(beer){
    // debugger
    // console.log(beer.id)
    let beerDetail = document.getElementById('beer-detail')
    // let ul = document.createElement('ul')
    // ul.innerHTML = ``
    beerDetail.innerHTML = `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea data-id=${beer.id} id='text-area'>${beer.description}</textarea>
    <button data-id=${beer.id} id="edit-beer" class="btn btn-info">
    Save
    </button>
    `
    // debugger
    // beerDetail.append(ul)
}

///// add event listener on save button, get value of text area, and send updates to db through fetch PATCH ////////
function editBeer(){
    document.addEventListener('click', function(e){
        if(e.target.id === 'edit-beer'){
            let thisBeersText = document.getElementById('text-area').value
            let beerId = e.target.dataset.id
            // debugger
            // console.log(thisBeersText)
            fetch(BASEURL+`/${beerId}`, {
                method: 'PATCH',
                headers:   {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                body: JSON.stringify(  {description: thisBeersText}
                )
            })
        }
    })
}