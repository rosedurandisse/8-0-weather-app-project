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
            const updatedCity = city[0].toUpperCase() + city.slice(1).toLowerCase();
            document.querySelector(".display").innerHTML = `
                <p> <b> ${updatedCity} </b> </p>
                <p> <b> Area: </b> ${cityData.nearest_area[0].areaName[0].value} </p>
                <p> <b> Region: </b> ${cityData.nearest_area[0].region[0].value} </p>
                <p> <b> Country: </b> ${cityData.nearest_area[0].country[0].value} </p>
                <p> <b> Currently: </b> ${cityData.current_condition[0].FeelsLikeF}°F </p>`;

            // remove the first bullet
            const initialBullet = document.querySelector(".noSearchesMade");
            if (initialBullet) {
                initialBullet.remove()
            }

            //remove the location paragraph
            const locationParagraph = document.querySelector("main span");
            if (locationParagraph) {
                locationParagraph.remove()
            }

            //create an li to the ul
            const li = document.createElement("li")
            li.innerHTML = `<a href=#> ${updatedCity}</a>- ${cityData.current_condition[0].FeelsLikeF}°F`
            li.addEventListener("click", (event) => {
                event.preventDefault();
                fetch(`https://wttr.in/${city}?format=j1`)
                    .then((response) => response.json())
                    .then((cityData) => {
                        const updatedCity = city[0].toUpperCase() + city.slice(1).toLowerCase();
                        document.querySelector(".display").innerHTML = `
                        <p> ${updatedCity} </p>
                        <p> <b> Area: </b> ${cityData.nearest_area[0].areaName[0].value} </p>
                        <p> <b> Region: </b> ${cityData.nearest_area[0].region[0].value} </p>
                        <p> <b> Country: </b> ${cityData.nearest_area[0].country[0].value} </p>
                        <p> <b> Currently: </b> ${cityData.current_condition[0].FeelsLikeF}°F </p>`;

                        let article = document.querySelectorAll(".details section")
                        let daysArray = ["Today", "Tomorrow", "Day After Tomorrow"]
                        for (let i = 0; i < article.length; i++) {
                            article[i].innerHTML = `<p><b>${daysArray[i]} </b> </p>
                            <p> <b> Average Temperature: </b> ${cityData.weather[i].avgtempF}°F </p>
                        <p> <b> Min Temperature: </b> ${cityData.weather[i].mintempF}°F </p>
                        <p> <b> Max Temperature: </b> ${cityData.weather[i].maxtempF}°F </p>
                        `
                        }


                    })
            })


            document.querySelector("aside ul").append(li)
            form.reset()

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

            form.reset()
        }).catch(console.log)
})

