//https://wttr.in/chicago?format=j1
//sort through CSS - figure out the overflow feature
//figure out how to wrap the event in a function
//and add the event to the bullet

//grab the input value from the text box

const input = document.querySelector("form input");
const city = input.value;
const form = document.querySelector("form");
// const BASEURL = `http://wttr.in/${city}?format=j1`


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = input.value //event.target.userInput.value;- same value
    fetch(`https://wttr.in/${city}?format=j1`)
        .then((response) => response.json())
        .then((cityData) => {
            if (city.length <= 0) {
                throw "Error!"
            }

            if (city.length > 0) {
                search(cityData, city)
                //create an li to the ul
                const newli = document.createElement("li")

                // remove the first bullet
                const initialBullet = document.querySelector(".noSearchesMade");
                if (initialBullet) {
                    initialBullet.remove()
                }
                const updatedCity = city[0].toUpperCase() + city.slice(1).toLowerCase();
                newli.innerHTML = `<a href=#> ${updatedCity}</a>- ${cityData.current_condition[0].FeelsLikeF}°F`

                newli.addEventListener("click", (event) => {
                    event.preventDefault();
                    fetch(`https://wttr.in/${city}?format=j1`)
                        .then((response) => response.json())
                        .then((cityData) => {
                            search(cityData, city)
                        })
                })
                console.log(document.querySelectorAll(".history ul li"))

                //loop through the list to determine if the anchor tag already exists
                const list = document.querySelectorAll(".history ul");
                console.log(list)
                list.forEach((eachListItem) => {
                    if (eachListItem !== newli) {
                        document.querySelector(".history ul").append(newli)
                    }
                })

            }

            form.reset()
        })

        .catch(() => {
            const errorParagraph = document.createElement("p")
            errorParagraph.innerHTML = "<b> Please enter a city!</b>"
            errorParagraph.setAttribute("class", "errorParagraph")
            const header = document.querySelector("#header")
            header.append(errorParagraph)
        })
})


const search = (cityData, city) => {
    //remove the location paragraph
    const locationParagraph = document.querySelector("main span");
    if (locationParagraph) {
        locationParagraph.remove()
    }


    const updatedCity = city[0].toUpperCase() + city.slice(1).toLowerCase();
    document.querySelector(".display").innerHTML = `
                <p> <b> ${updatedCity} </b> </p>
                <p> <b> Area: </b> ${cityData.nearest_area[0].areaName[0].value} </p>
                <p> <b> Region: </b> ${cityData.nearest_area[0].region[0].value} </p>
                <p> <b> Country: </b> ${cityData.nearest_area[0].country[0].value} </p>
                <p> <b> Currently: </b> ${cityData.current_condition[0].FeelsLikeF}°F </p>`;

    //loop through all the divs, update their html since they pull the same information
    let article = document.querySelectorAll(".details section")
    let daysArray = ["Today", "Tomorrow", "Day After Tomorrow"]
    for (let i = 0; i < article.length; i++) {
        article[i].innerHTML = `<p><b>${daysArray[i]} </b> </p>
                <p> <b> Average Temperature: </b> ${cityData.weather[i].avgtempF}°F </p>
            <p> <b> Min Temperature: </b> ${cityData.weather[i].mintempF}°F </p>
            <p> <b> Max Temperature: </b> ${cityData.weather[i].maxtempF}°F </p>
            `
    }
}

