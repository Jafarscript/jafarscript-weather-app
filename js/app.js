let apiKey = '2341a2abddc990b61f22c2b315450889';
let search = document.querySelector('#search-area');
let input = document.querySelector('#search-value');
let button = document.querySelector('#search-btn');
let result = document.querySelector('#display');

let city = '';

const url = city => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

const getWeather = async () => {
    const getlocation = await fetch(url(city));
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

    const {
        lat,
        lon
    } = location.coord
    console.log(lat, lon)
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqYWZhIiwiYSI6ImNrc3A1YXBkYjAwMzAyd29kZ25meTNjZW8ifQ.NrRcbkSqcbSlqISxydtGDQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat], // starting position
        zoom: 11, // starting zoom
    });
    map.addControl(new mapboxgl.GeolocateControl({
        trackUserLocation: true,
        showUserHeading: true
    }));
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'bottom-left');
}

// To do
// 1. Add location marker
// 2. Facebook share button
// 3. Weather condition icon

button.addEventListener('click', (e) => {
    e.preventDefault();
    city = input.value;
    if (city) {
        return getWeather();
    }
})