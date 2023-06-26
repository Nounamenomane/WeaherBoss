let key = "2cfda1f27f8f18422038c85cc30073ad";

//ключи для областей
let urlB = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`;
let urlBa = `https://api.openweathermap.org/data/2.5/onecall?lat=${40.06259}&lon=${70.81939}&lang=ru&units=metric&appid=${key}`;
let urlD = `https://api.openweathermap.org/data/2.5/onecall?lat=${40.9312}&lon=${73.0025}&lang=ru&units=metric&appid=${key}`;
let urlI = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.5639}&lon=${77.0419}&lang=ru&units=metric&appid=${key}`;
let urlO = `https://api.openweathermap.org/data/2.5/onecall?lat=${40.5257}&lon=${72.7998}&lang=ru&units=metric&appid=${key}`;
let urlH = `https://api.openweathermap.org/data/2.5/onecall?lat=${41.428}&lon=${75.9916}&lang=ru&units=metric&appid=${key}`;
let urlT = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.5174}&lon=${72.2429}&lang=ru&units=metric&appid=${key}`;
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position.coords.latitude, position.coords.longitude);
  });
//доступ к элементам DOM
let $city = document.querySelector("#city");
let $currentTemp = document.querySelector("#currentTemp");
let $currentDesc = document.querySelector("#currentDesc");
let $select = document.querySelector("select");
let $h2 = document.querySelector("h2");
let $hourly = document.querySelector(".hourly");
let $currentImg = document.querySelector("#currentImg");
let $daily = document.querySelector(".daily");

//изменение $h2
$select.addEventListener("change", function () {
  let selectedOption = this.options[this.selectedIndex];
  // $city.innerHTML = "";
  //Бишкек
  if (selectedOption.value === "Бишкек") {
    $h2.textContent = "Бишкек";
    getData(urlB);
  }

  //Баткен
  else if (selectedOption.value === "Баткен") {
    $h2.textContent = "Баткен";
    getData(urlBa);
  }

  if (selectedOption.value === "Джала-Абад") {
    $h2.textContent = "Джала-Абад";
    getData(urlD);
  }
  if (selectedOption.value === "Иссык-Кол") {
    $h2.textContent = "Иссык-Кол";
    getData(urlI);
  }
  if (selectedOption.value === "Ош") {
    $h2.textContent = "Ош";
    getData(urlO);
  }
  if (selectedOption.value === "Нарын") {
    getData(urlH);
    $h2.textContent = "Нарын";
  }
  if (selectedOption.value === "Талас") {
    $h2.textContent = "Талас";
    getData(urlT);
  }
});
getData(urlB);
async function getData(url) {
  let resp = await fetch(url);
  let data = await resp.json();

  // console.log(data);
  currentData(data.current);
  hourlyData(data.hourly);
  dailyData(data.daily);
}   

function currentData(current) {
  $city.textContent = $h2.textContent;
  $currentTemp.textContent = Math.floor(current.temp) + "°";
  $currentDesc.textContent = current.weather[0].description;
  $currentImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png `
  );
  // console.log(current);
}

function hourlyData(hourly) {
  console.log(hourly);
  $hourly.innerHTML = "";

  hourly.forEach((element) => {
    let dt = new Date(element.dt * 1000);
    let time = dt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    $hourly.insertAdjacentHTML(
      "beforeend",
      `
        <div class = 'hour'>
           <p>${time}<p>
      <img src = 'https://openweathermap.org/img/wn/${
        element.weather[0].icon
      }@2x.png '/>
      <p>${Math.floor(element.temp) + "°"}
      </div>
        `
    );
  });
  // console.log(hourly);
}
function dailyData(daily) {
  $daily.innerHTML = "";

  daily.forEach((element) => {
    let dt = new Date(element.dt * 1000);
    let options = { weekday: "long", locale: "ru" };
    let dayOfWeek = dt.toLocaleDateString("ru-RU", { weekday: "long" });
    $daily.insertAdjacentHTML(
      "beforeend",
      `
        <div class = 'day'>
        <p>${dayOfWeek}:</p>
        <img src = 'https://openweathermap.org/img/wn/${
          element.weather[0].icon
        }@2x.png '/>
        <p>${Math.floor(element.temp.day)}°</p>
        `
    );
  });
}

//погода для областей
// function changeWeather(url) {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       $city.textContent = $h2.textContent;
//       $currentTemp.textContent = Math.floor(data.current.temp) + "°";
//       $currentDesc.textContent = data.current.weather[0].description;
//       $currentImg.setAttribute(
//         "src",
//         `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png `
//       );
//       let hours = data.hourly;
//       $hourly.innerHTML = "";

//       hours.forEach((element) => {
//         let dt = new Date(element.dt * 1000);
//         let time = dt.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         $hourly.insertAdjacentHTML(
//           "beforeend",
//           `
//         <div class = 'hour'>
//            <p>${time}<p>
//       <img src = 'https://openweathermap.org/img/wn/${
//         element.weather[0].icon
//       }@2x.png '/>
//       <p>${Math.floor(element.temp) + "°"}
//       </div>
//         `
//         );
//       });
//       let dailys = data.daily;
//       $daily.innerHTML = "";

//       dailys.forEach((element) => {
//         let dt = new Date(element.dt * 1000);
//         let options = { weekday: "long", locale: "ru" };
//         let dayOfWeek = dt.toLocaleDateString("ru-RU", { weekday: "long" });
//         $daily.insertAdjacentHTML(
//           "beforeend",
//           `
//         <div class = 'day'>
//         <p>${dayOfWeek}:</p>
//         <img src = 'https://openweathermap.org/img/wn/${
//           element.weather[0].icon
//         }@2x.png '/>
//         <p>${Math.floor(element.temp.day)}°</p>
//         `
//         );
//       });
//     });
// }

//promise
// let promise = new Promise(function (resolve, reject) {
//   console.log("Запрос на сервер");
//   let user = {
//     name: "Kyias",
//     year: 16,
//   };
//   if (1 == 2) {
//     resolve(user);
//   } else {
//     reject("Данные не найдены");
//   }
// });

// promise.then((data) =>{
//   console.log('Данные получены из сервера');
//   console.log(data);
// })
// .catch((error) =>{
//   console.log(`Вы сделали запрос код ошибки${error}`);
// })

// try{
// console.log('LOL');
// sum()
// sc
// }catch{
// console.log('Ошибка');
// }

// function sum(){
//   console.log('sum0');
// }
