import {extractHourFromDate}  from "./extract";

let data=null;
// eslint-disable-next-line import/no-mutable-exports
let Current=null;
// eslint-disable-next-line import/no-mutable-exports
let Days=null;
// eslint-disable-next-line import/no-mutable-exports
let Hours=null;

// eslint-disable-next-line no-shadow
async function forecast (city,days){
    let response=await fetch(`http://api.weatherapi.com/v1/forecast.json?key=************************&q=${city}&days=${days}`
    );
    response=await response.json();
    data= response;
    // eslint-disable-next-line no-use-before-define
};


function getCurrent (){

     Current= {
        city:data.location.name,
        country:data.location.country,
        time:data.location.localtime,
        temp:data.current.temp_c,
        condition:data.current.condition.text,
        conditionIcon:data.current.condition.icon,
        humidity:data.current.humidity,
    }
}
function getDays(){
      // eslint-disable-next-line no-shadow
      const days=[]
      for(let i=0;i<7;i+=1){
         days.push({
            date:data.forecast.forecastday[i].date,
            maxTemp:data.forecast.forecastday[i].day.maxtemp_c,
            minTemp:data.forecast.forecastday[i].day.mintemp_c,
            rain:data.forecast.forecastday[i].day.daily_chance_of_rain,
            condition:data.forecast.forecastday[i].day.condition.text,
            conditionIcon:data.forecast.forecastday[i].day.condition.icon,
            humidity:data.forecast.forecastday[i].day.avghumidity
         })
      }
      Days= days
}
function getHours(){
    // eslint-disable-next-line no-shadow
    const hours=[];
    const currentHour=extractHourFromDate(data.location.localtime);

    // eslint-disable-next-line no-plusplus
    for(let i=currentHour;i<24;i++){
        hours.push({
            hour:i,
            temp: data.forecast.forecastday[0].hour[i].temp_c,
            conditionIcon: data.forecast.forecastday[0].hour[i].condition.icon

        })
    }
    for(let i=0;i<currentHour;i+=1){
        hours.push({
            hour:i,
            temp: data.forecast.forecastday[1].hour[i].temp_c,
            conditionIcon: data.forecast.forecastday[1].hour[i].condition.icon

        })
    }
    Hours= hours;
}
async function weather(city,numOfDays){
    await forecast(city,numOfDays);
    getCurrent();
    getDays();
    getHours();
}

export {weather,Current,Days,Hours }

// export {forecast}