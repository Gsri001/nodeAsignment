const router = require('express').Router();
const fetch = require('node-fetch');

const api = {
  key: "a3fa929a5a7fb4365ea46c103e2db342"}

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    temp: null,
    humidity:null
  });
});
router.post('/', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api.key}`;
    fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('index', {
            city: data.message,
            des: null,
            temp: null,
            humidity:null
          })
        } else {
          const city = data.name;
          const des = data.weather[0].description;
          const temp = data.main.temp;
          const humidity = data.main.humidity;

          res.render('index', {
            city, des, temp,humidity
          });
        }
      });

})
module.exports = router;