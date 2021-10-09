//https://wttr.in/chicago?format=j1


//grab the input value from the text box

const input = document.querySelector("form input");
const city = input.value;
const form = document.querySelector("form");
// const BASEURL = `http://wttr.in/${city}?format=j1`


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = input.value
    fetch(`http://wttr.in/${city.toLowerCase()}?format=j1`)
        .then((response) => response.json())
        .then((cityData) => {
            const updatedCity = city[0].toUpperCase() + city.slice(1).toLowerCase()
            document.querySelector(".display p").innerHTML = `
            <h2> ${updatedCity} </h2> <br>
            <b> Area: </b> ${cityData.nearest_area[0].areaName[0].value} <br>
            <b> Region: </b> ${cityData.nearest_area[0].region[0].value} <br>
            <b> Country: </b> ${cityData.nearest_area[0].country[0].value}<br>
            <b> Currently: </b> ${cityData.current_condition[0].FeelsLikeF}°F`;

            //remove the first bullet
            const initialBullet = document.querySelector(".noSearchesMade");
            if (initialBullet) {
                initialBullet.remove()
            }
            //create an li to the ul
            const li = document.createElement("li")
            li.innerHTML = `<a href= http://wttr.in/${city.toLowerCase()}?format=j1> ${updatedCity} - ${cityData.current_condition[0].FeelsLikeF}°F`
            document.querySelector("aside ul").append(li)
            form.reset()

            document.querySelector(".todaysWeather").innerHTML = `
            <h2> Today </h2>
            <b> Average Temperature: </b> ${cityData.weather[0].avgtempF}°F <br>
            <b> Min Temperature: </b> ${cityData.weather[0].mintempF}°F <br>
            <b> Max Temperature: </b> ${cityData.weather[0].mintempF}°F <br>
            `

            document.querySelector(".tomorrowsWeather").innerHTML = `
            <h2> Tomorrow </h2>
            <b> Average Temperature: </b> ${cityData.weather[1].avgtempF}°F <br>
            <b> Min Temperature: </b> ${cityData.weather[1].mintempF}°F <br>
            <b> Max Temperature: </b> ${cityData.weather[1].mintempF}°F <br>
            `
            document.querySelector(".dayAfterTomorrowsWeather").innerHTML = `
            <h2> Day After Tomorrow </h2>
            <b> Average Temperature: </b> ${cityData.weather[1].avgtempF}°F <br>
            <b> Min Temperature: </b> ${cityData.weather[1].mintempF}°F <br>
            <b> Max Temperature: </b> ${cityData.weather[1].mintempF}°F <br>
            `
            form.reset()

        })
})

