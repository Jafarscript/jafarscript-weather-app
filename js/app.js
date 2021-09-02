let apiKey = '2341a2abddc990b61f22c2b315450889';
let city = 'London';
// let btn = document.querySelector('.btn');
// btn.addEventListener('click', function () {
//     city = document.querySelector('.src').value;
// })
const getWeather = async () => {
    const getlocation = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const location = await getlocation.json();
    console.log(location);
    document.querySelector('.name').innerHTML = location.name;
    document.querySelector('.value1').innerHTML = location.wind.speed + ' mph';
    document.querySelector('.value2').innerHTML = location.main.humidity + ' %';
    document.querySelector('.value3').innerHTML = location.main.pressure + ' hPa';
    document.querySelector('.value5').innerHTML = location.visibility / 100 + ' km';
    document.querySelector('.dep').innerHTML = `Today: ${location.weather[0].description}`
    document.querySelector('.value6').innerHTML = location.main.sea_level + ' hPa';
    document.querySelector('.value7').innerHTML = location.main.grnd_level + ' hPa';
    document.querySelector('.temp').innerHTML = Math.round(location.main.temp - 273.15) + '<sup>°C</sup>';
    document.querySelector('.value4').innerHTML = Math.round(location.main.feels_like - 273.15) + '<sup>°C</sup>';
    document.querySelector('.value8').innerHTML = location.clouds.all + ' %';
    let convert = document.querySelector('#check');
    convert.addEventListener('change', function converter() {
        if (this.checked) {
            document.querySelector('.temp').innerHTML = Math.round((location.main.temp - 273.15) * 9 / 5 + 32) + '<sup>°F</sup>';
            document.querySelector('.value4').innerHTML = Math.round((location.main.feels_like - 273.15) * 9 / 5 + 32) + '<sup>°F</sup>';
            document.querySelector('.fahn').style.fontWeight = 'bold';
            document.querySelector('.celc').style.fontWeight = 500;
        } else {
            document.querySelector('.temp').innerHTML = Math.round(location.main.temp - 273.15) + '<sup>°C</sup>';
            document.querySelector('.value4').innerHTML = Math.round(location.main.feels_like - 273.15) + '<sup>°C</sup>';
            document.querySelector('.fahn').style.fontWeight = '500';
            document.querySelector('.celc').style.fontWeight = 'bold';
        }
    })
    if (location.main.sea_level === '' && location.main.grnd_level === '') {
        console.log(location)
    } else {
        document.querySelector('.value6').innerHTML = location.main.pressure + ' hPa';
        document.querySelector('.value7').innerHTML = location.main.pressure + ' hPa';
    }

}

getWeather();
