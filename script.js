const menuIcons = document.querySelectorAll(".menu");
const sideBar = document.querySelector(".sidebar");
const celcius = document.getElementById("celcius")
const weather = document.getElementById("weather")
const precip = document.getElementById("Precipitation")
const humidityEle = document.getElementById("hum")
const windEle = document.getElementById("win")
const pressureEle = document.getElementById("pres")
const mainIcon = document.getElementById("mainIcon")
const foreIcon = document.querySelectorAll(".foreIcon")

const fore = document.querySelector(".forecast")
const toploc = document.getElementById("toploc")


window.addEventListener("DOMContentLoaded", function(){
    const savedLocation = localStorage.getItem("location")
    if (savedLocation){
        if(toploc){
            toploc.innerText = savedLocation
        }
        receive(savedLocation)
    }
    else{
        receive("Chennai")
    }
})

const dp = new Date()
let currentMonth = dp.getMonth()
let CurrentDate = dp.getDate()
let currentHour = dp.getHours()





menuIcons.forEach(menuIcon => {
    menuIcon.addEventListener("click", function() {
        if (sideBar.style.display === "none" || sideBar.style.display === "") {
            sideBar.style.display = "block";
            toploc.style.zIndex = -1
            setTimeout(()=>{
                sideBar.style.transform = "translateX(0%)"
            },1)
        } else {
            sideBar.style.transform = "translateX(-100%)"
            setTimeout(()=>{
                sideBar.style.display = "none";
                toploc.style.zIndex = 1
            },1000)
        }
    });
});

const locbtn = document.getElementById("searchbtn")
const input = document.getElementById("location")
locbtn.addEventListener("click", function(){
    const city = input.value;
    localStorage.setItem("location",city)
    toploc.innerText = city
    receive(city)
})
input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        const city = input.value;
        localStorage.setItem("location",city)
        toploc.innerText = city
        input.value= ''
        receive(city)
    }
})
const locbtn1 = document.getElementById("searchbtn1")
const input1 = document.getElementById("location1")
locbtn1.addEventListener("click", function(){
    const city = input1.value;
    localStorage.setItem("location",city)
    toploc.innerText = city
    receive(city)
})
input1.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        const city = input1.value;
        localStorage.setItem("location",city)
        toploc.innerText = city
        input1.value= ''
        receive(city)
    }
})

function receive(city){
    const apiKey = "08941362fa1d5df5c3e0a14e45361f99"
    const apiLink = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    toploc.innerText = city
    fetch(apiLink)
    .then(res => res.json())
    .then(data => getLocation(data,apiKey))
}

function getLocation(data,apiKey){

    const lat = data[0].lat
    const lon = data[0].lon
    const apicall = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const forecastcall = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    
    fetch(apicall)
    .then(res => res.json())
    .then(data => changeData(data))

    fetch(forecastcall)
    .then(wea => wea.json())
    .then(data2 => changeforecast(data2))
}

function changeData(data){


    const temperature = ((data.main.temp) - 273.15).toFixed(0);
    const mainDescData = data.weather[0]
    const mainDesc = mainDescData.description
    const humidity = data.main.humidity;
    const windSpeed =(( data.wind.speed)).toFixed(1);
    const pressure = ((data.main.pressure) * 0.02953).toFixed(2);
    const iconCode = mainDescData.icon
    mainIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    celcius.innerText = temperature +"°C"
    weather.innerText = mainDesc
    humidityEle.innerText = humidity + "%"
    windEle.innerText = windSpeed + "km/h"
    pressureEle.innerText = pressure + "in"

    // console.log(temperature + 273.15)
    // console.log(humidity)
    // console.log(windSpeed / 3.6)
    // console.log(pressure / 0.02953)

    if (data.rain) {
        const precipitationRate = data.rain["1h"] || 0;
        precip.innerText = precipitationRate + "mm"
    } else {
        precip.innerText = "No rain"
    }
}
//2024-10-15 06:00:00
function changeforecast(data2){
    data2.list.forEach(cast => {

        //date and time spliting
        const dateTime = cast.dt_txt;
        const [fulldate, time] = dateTime.split(" ");
        const [year, month, date] = fulldate.split("-");
        let [hour, mins, secs] = time.split(":");
        const temp = ((cast.main.temp) - 273.15).toFixed(0);
        let rain = "";
        const descdata = cast.weather[0]
        const desc = descdata.description
        const foreIconCode = descdata.icon
        const foreIconSrc = `https://openweathermap.org/img/wn/${foreIconCode}@2x.png`

        //to find no rains
        if (cast.rain){
            rain = cast.rain["3h"];
        }
        else{
            rain = 0;
        }

        //to convert into 12 hour format
        if (hour>12){
            hour = (hour-12)+" PM";
        }
        // else if(hour === 0){
        //     hour = 12+" AM";
        // }
        else if(hour === "00"){
            hour = 12+" AM";
        }
        else if (hour<10){
            hour = hour[1]
            hour = hour+" AM";        }
        else{
            hour = hour+" AM";
        }

        const monthName = getMonthName(month); //gets month name

        // console.log("date",date)
        // console.log("hours",hour)
        // console.log("month",month)
        // console.log("weather",temp)
        // console.log("rain",rain)
        
        const newData = document.createElement("div")
        newData.classList.add("hour")
        if (rain !=0){
            newData.innerHTML = `
            <p>${hour}</p>
            <p>${date} ${monthName}</p>
            <img src=${foreIconSrc} alt="" class="foreIcon">
            <p class = "displayWeather">${temp} °C</p>
            <p class = "displayWeather">${desc}</p>
            <p class = "displayRain">${rain}mm</p>`
        }
        else{
            newData.innerHTML = `
            <p>${hour}</p>
            <p>${date} ${monthName}</p>
            <img src=${foreIconSrc} alt="" class="foreIcon">
            <p class = "displayWeather">${temp} °C</p>
            <p class = "displayWeather">${desc}</p>`
        }

        fore.appendChild(newData);
        
    });
}

//to get monthname
function getMonthName(monthNumber) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[monthNumber - 1];
}

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// optional link prevent default
const optLink = document.querySelectorAll('.optional')
optLink.addEventListener("click", function(e){
    e.preventDefault();
});

document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        sideBar.style.transform = "translateX(-100%)"
        setTimeout(()=>{
            sideBar.style.display = "none";
            toploc.style.zIndex = 1
        },100)
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// document.querySelectorAll('.sidebar a').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//         e.preventDefault();
//         sideBar.style.transform = "translateX(-100%)"
//         setTimeout(()=>{
//             sideBar.style.display = "none";
//             toploc.style.zIndex = 1
//         },1000)
//     });
// });

// document.querySelectorAll("nav a").forEach(anchor =>{
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//     }
// });