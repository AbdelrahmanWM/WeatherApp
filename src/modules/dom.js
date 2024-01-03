import {getWeekDay}  from "./extract";
import {weather,Current,Days,Hours} from './forecast';

function addSections(){
    const content=document.createElement('div');
    content.classList.add('content');
    document.body.append(content);
    const Header=document.createElement('header');
    Header.innerHTML=`<span class="material-symbols-outlined">
    partly_cloudy_day
    </span><h1>WeatherX</h1>`;
    const Main=document.createElement('main');
    const Footer=document.createElement('footer');
    Footer.innerHTML=`<p>copyright &copy;2023 Abdel-Rahman</p>`;
    content.append(Header,Main,Footer);
}
function addSearchBar() {
  const main = document.querySelector("main");

  const div = document.createElement("div");
  div.classList.add("search");
  const input = document.createElement("input");
  input.placeholder = "City";
  input.id="city"
  const button = document.createElement("button");
  button.textContent = "Search";
  button.id="search"
  div.append(input, button);
  main.append(div);
}
function addCurrentSection(current,hours) {
  const main = document.querySelector("main");
  // current div
  const div = document.createElement("div");
  div.classList.add("current");
  // current > generalData
  const generalData = document.createElement("div");
  generalData.classList.add("generalData");
  generalData.innerHTML = `
    <h2>${current.city} <small>${current.country}</small></h2>
    <div class="mainTemp">${current.temp}&deg;</div>
    <div class=condition><img src='${current.conditionIcon}'></div>
    `;
// current > hourlyData
  const hourlyData = document.createElement("div");
  hourlyData.classList.add("hourlyData");
  for(let i=0;i<hours.length;i+=1){
    const hourDiv=document.createElement('div');
    hourDiv.classList.add('hour');
    hourDiv.innerHTML=`
    <p>${hours[i].hour}:00</p>
    <img src=${hours[i].conditionIcon}>
    <p>${hours[i].temp}&deg;</p>
    `;
    hourlyData.append(hourDiv)
  }
  // adding to the parent element
  div.append(generalData, hourlyData);
  main.append(div);
}

function addDays(days){
    const main = document.querySelector("main");
    const daysTable=document.createElement('table');
    daysTable.classList.add('days');
    const headers=document.createElement('tr');
    headers.innerHTML=`
    <th>day</th>
    <th>condition</th>
    <th>high</th>
    <th>low</th>
    <th>humidity</th>
    <th>chance of rain</th>
    `
    daysTable.append(headers);
    for(let i=0;i<days.length;i+=1){
        const day=document.createElement('tr');
        day.innerHTML=`<td>${getWeekDay(days[i].date)}</td>
        <td><img src='${days[i].conditionIcon}'></td>
        <td>${days[i].maxTemp}&deg;</td>
        <td>${days[i].minTemp}&deg;</td>
        <td>${days[i].humidity}%</td>
        <td>${days[i].rain}%</td>
        `;
        daysTable.append(day);
    }
    main.append(daysTable);

}
function addStructure(current,hours,days) {
    document.body.innerHTML="";
    addSections();
    addSearchBar();
    addCurrentSection(current,hours);
    addDays(days);
}

function search() {
  const button=document.getElementById('search');
  const input=document.getElementById('city');
 
  button.addEventListener('click',async () =>{
    // event.preventDefault();
    
    const city=input.value.trim()!==""?input.value:'Montreal';
    await weather(`'${city}'`,7);
    addStructure(Current,Hours,Days);
    search();
  })

}
async function DOM(){
    await weather('Montreal',7);
 
    addStructure(Current,Hours,Days);
    search();
    
}
export default DOM;