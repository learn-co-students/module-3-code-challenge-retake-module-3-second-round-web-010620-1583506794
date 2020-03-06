window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
let listGroup = document.querySelector(".list-group")
console.log(listGroup)

    fetch('http://localhost:3000/beers')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    listBeers(data)
  });
  //FETCH GET TO GET ALL LIST OF PRODUCT NAMES
  //
  function listBeers(data){
    data.forEach(beer => {
        let eachBeer = document.createElement("li")
        eachBeer.className = "list-group-item"
        eachBeer.id = beer.id
        eachBeer.innerText = beer.name
        listGroup.append(eachBeer)        
    });



    ///event listener on list
    //each li needs to have id to identify what product(ADD ID IN INITIAL LIST)
    //when clicking on each list should show beer detail description 
    //
    listGroup.addEventListener("click", event=>{
        if (event.target.className === "list-group-item") {
            console.log(event.target.id)
            fetch(`http://localhost:3000/beers/${event.target.id}`)
            .then((response) => {
            return response.json();
             })
            .then((data) => {
                console.log(data)
            let beerDetail = document.querySelector("#beer-detail")
                console.log(beerDetail)
                beerDetail.innerHTML = `<h1>${data.name}</h1>
                <img src=${data.image_url}>
                <h3>${data.tagline}</h3>
                <textarea class= "beer-description">${data.description}</textarea>
                <button data-id = ${data.id} id="edit-beer" class="btn btn-info">
                  Save
                </button>`

            });
            
        }//if statement


        //event listener
        //if statemnt for button (button should have id to identify product)
        //find input value of the description box
        //fetch patch
        

        document.addEventListener('click', event =>{
            if (event.target.className === "btn btn-info") {
                console.log("this button works")
                let beerInput = document.querySelector(".beer-description").value
                console.log(beerInput)

                const data = { description: beerInput };

                fetch(`http://localhost:3000/beers/${event.target.dataset.id}`, {
                method: 'PATCH', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(data),
                })
                .then((response) => response.json())
                .then((data) => {
                console.log('Success:', data);//will check if data has patched successfuly
                })//fetch end

        }
        })


    })//foreach
  }//listbeers


});//dom loaded