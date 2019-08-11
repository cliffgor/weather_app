window.addEventListener('load', ()=>{
    let long;
    let lat;

    let tepmeratureDescription = document.querySelector('.temperature-description');
    let tepmeratureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan =document.querySelector('.temperature span')
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/3211ea16d922d63f7ba698e1615486dc/${lat},${long}`; 
            
            fetch (api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;

                    // set DOM elements from the api
                    tepmeratureDegree.textContent = temperature;
                    tepmeratureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    // FORMULA FOR CELCIUS
                    let celcius = (temperature - 32) * (5 / 9);
                    // set icon
                    setIcons(icon, document.querySelector(".icon"));

                    // change temperature to celcius/farenheight
                    temperatureSection.addEventListener('click',() => {
                        if (temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            tepmeratureDegree.textContent = Math.floor(celcius);
                        }else {
                            temperatureSpan.textContent = "F";
                            tepmeratureDegree.textContent = temperature
                        }

                    })

                });

        });
    
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});