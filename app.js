

let unit = 'metric'
getWeather('algiers', unit)

function units(u){
   unit = u
getWeather('algiers', unit)

}

function getDay(n,o){
   let minvs =[] ,maxvs =[]
   for (let i = 8*n; i < 8*n + 8; i++) {
      console.log(i);
      minvs.push(o.list[i].main.temp_min)
      maxvs.push(o.list[i].main.temp_max)
      
   }
   
   let minv = Math.round(minvs.sort(function(a, b){return a - b})[0]),
   maxv = Math.round(maxvs.sort(function(a, b){return a - b})[7])
   let condition = {main: o.list[8*n].weather[0].main ,id: o.list[8*n].weather[0].id,description: o.list[8*n].weather[0].description ,clouds: o.list[8*n].clouds.all}
   let icon
   console.log(icon, condition);
   if (condition.main == 'Clear') {
      icon = './assets/clear.png'
   } else if(condition.main == 'Clouds' && condition.clouds <= 50){
      icon = './assets/LightCloud.png'
   }else if(condition.main == 'Clouds' && condition.clouds >= 50){
      icon = './assets/HeavyCloud.png'
   }else if(condition.main == 'Thunderstorm'){
      icon = './assets/Thunderstorm.png'
   }else if(condition.main == 'Drizzle'){
      icon = './assets/Shower.png'
   }else if(condition.main == 'Rain'){
      if(condition.description == 'moderate rain'|| condition.description == 'light rain'){
      icon = './assets/LightRain.png'
      }else{
      icon = './assets/HeavyRain.png'

      }
   }else if(condition.main == 'snow'){
      if (condition.id == 600||condition.id == 601||condition.id == 621) {
         icon = './assets/Snow.png'
         
      } else if (condition.id == 602||condition.id == 622) {
         icon = './assets/Hail.png'
         
      }else{
         icon = './assets/Sleet.png'

      }

   }
   return {condition:condition,icon:icon,minv:minv,maxv:maxv}

}
   
function getToday(o) {
   // let condition = o.weather.main,
   let condition = {main: o.weather[0].main ,id: o.weather[0].id,description: o.weather[0].description ,clouds: o.clouds.all},
   


   temp ={
      min : o.main.temp_min,
      max : o.main.temp_max,
      avg: o.main.temp
   }
  
   , visibility = o.visibility/1000
   , wind ={
      speed: o.wind.speed,
      deg : o.wind.deg
   } 
   , humidity = o.main.humidity
   , pressure = o.main.pressure, icon

   if (condition.main == 'Clear') {
      icon = './assets/clear.png'
   } else if(condition.main == 'Clouds' && condition.clouds <= 50){
      icon = './assets/LightCloud.png'
   }else if(condition.main == 'Clouds' && condition.clouds >= 50){
      icon = './assets/HeavyCloud.png'
   }else if(condition.main == 'Thunderstorm'){
      icon = './assets/Thunderstorm.png'
   }else if(condition.main == 'Drizzle'){
      icon = './assets/Shower.png'
   }else if(condition.main == 'Rain'){
      if(condition.description == 'moderate rain'|| condition.description == 'light rain'){
      icon = './assets/LightRain.png'
      }else{
      icon = './assets/HeavyRain.png'

      }
   }else if(condition.main == 'snow'){
      if (condition.id == 600||condition.id == 601||condition.id == 621) {
         icon = './assets/Snow.png'
         
      } else if (condition.id == 602||condition.id == 622) {
         icon = './assets/Hail.png'
         
      }else{
         icon = './assets/Sleet.png'

      }

   }

   // console.log('alsd')

   return {condition:condition,temp:temp,pressure:pressure,humidity:humidity,wind:wind,visibility:visibility,icon:icon}
}
   
const todayImg = document.querySelector('.side img')
const todayTemp = document.querySelector('.side .temp span')
const todayCondition = document.querySelector('.side p.condition')
const tdate = document.querySelector('p.tdate');
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const windSpeed = document.querySelector('.windstat .stat span.val')
const windDir = document.querySelector('.windstat span.dir') 
const humidity = document.querySelector('.humidity .humid span')
const humidityRange = document.querySelector('.humidity .range .fill');
const visibility = document.querySelector('.visibility .visible span.val')
const airPressure = document.querySelector('.airPressure .pressure span.val')
const dayCards = document.querySelectorAll('.daysContainer .day')
function getDate(d){
   if (d==1) {
      return'Tomorrow';
   }else{
      let t = new Date();
      t.setDate(t.getDate() + d);
      let date = {n : t.toString().slice(0,4),
         day: t.getDate(),
         month: monthNames[t.getMonth()]}
      return `${date.n}, ${date.day} ${date.month}`   
   }
}

console.log(
   getDate());
function getWeather(location,units) {

   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=0d269c5c4176af5653a5f783745732b1`)
   .then(res=> res.json())
   .then(s=> {
   // today scope
   
   let tdata =getToday(s)

   // console.log(tdata.condition);
   todayImg.src = tdata.icon;
   todayTemp.innerHTML = tdata.temp.avg;
   todayCondition.innerHTML = tdata.condition.main;
   tdate.innerHTML = getDate(0)
   windSpeed.innerHTML = tdata.wind.speed
   windDir.style.rotate = (tdata.wind.deg - 45) + 'deg'
   humidity.innerHTML = tdata.humidity
   humidityRange.style.width = tdata.humidity + '%'
   visibility.innerHTML = tdata.visibility
   airPressure.innerHTML = tdata.pressure

      console.log(tdata);
   if(units == 'metric'){
      windSpeed.innerHTML = Math.round(tdata.wind.speed* 3.6)
      
   }else {
      windSpeed.innerHTML = Math.round(tdata.wind.speed)

   }
})

let date,dayf,dayc;
   
fetch(`https://api.openweathermap.org/data/2.5/forecast?cnt=50&q=${location}&units=${units}&APPID=0d269c5c4176af5653a5f783745732b1`)
.then(res=> res.json())
.then(s=> {
   for (let i = 0; i < 5; i++) {
      // console.log(getDate(i), getDay(i,s),dayCards[i])
      date = getDate(i)
      dayf = getDay(i,s)
      dayc = dayCards[i]
      let cardDay = dayc.querySelector('p.date')
      let cardIcon = dayc.querySelector('img')
      let cardMaxv = dayc.querySelector('p.max span.val')
      let cardminv = dayc.querySelector('p.min span.val')

      if(i==0){
         date = 'Today'
      }
      console.log(date,dayf,dayc);
      cardDay.innerHTML = date
      cardIcon.src = dayf.icon
      cardminv.innerHTML = dayf.minv
      cardMaxv.innerHTML = dayf.maxv
   }

})
}


// function getDay(n,o){
//    let minvs =0 ,maxvs =0 
//  for (let i = 8*n; i < 8*n + 8; i++) {
//   minvs += o.list[i].temp_min
//   maxvs += o.list[i].temp_max
   
//  }
//  minvs = minvs /8
//  maxvs = maxvs /8

//  console.log(minvs, maxvs);
// }

// getDay(2)

const successCallback = (position) => {
   console.log(position);
 };
 
 const errorCallback = (error) => {
   console.log(error);
 };
 
 navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

