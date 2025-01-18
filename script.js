const weatherform=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="f2f8a23d5f802a2d8a14508c1251471a";

weatherform.addEventListener("submit",async event  =>{
    event.preventDefault();
    const city=cityInput.value;
    if(city){
        try {
            const weatherData=await getweatherData(city);
            displayWeatherInfo(weatherData);
        } 
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else{ 
    displayError("Please enter a city");
    }

});
async function getweatherData(city) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("Could not Fetch weather data");
    }
    return await response.json();
}
function displayWeatherInfo(data){
    const{name:city,
        main:{temp,humidity},
        weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humiditydisplay=document.createElement("p");
    const descdisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");
   
    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    humiditydisplay.textContent=`Humidity:${humidity}`;
    descdisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);
    

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descdisplay.classList.add("descdisplay");
    weatherEmoji.classList.add("weatherEmoji");


   
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descdisplay);
    card.appendChild(weatherEmoji);

}
function getWeatherEmoji(weatherId){ 
    switch(true){

        case (weatherId >= 200 && weatherId < 300):
        return "⛈️";
        
        case (weatherId >= 300 && weatherId < 400):
        return "🌧️";
        
        case (weatherId >= 500 && weatherId < 600):
        return "🌧️";
        
        case (weatherId >= 600 && weatherId < 700):
        return "❄️";
        
        case (weatherId >= 700 && weatherId < 800):
        return "🌫️";
        
        case (weatherId === 800):
        return "☀️";
        
        case (weatherId >= 801 && weatherId < 810):
        return "☁️";

        default:
         return "?";

}
}
function displayError(message){ 
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errordisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}