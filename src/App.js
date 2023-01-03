import { Grid, IconButton, Paper, TextField, Card, Typography, Box } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import moment from "moment"

function App() {
  const [search, setSearch] = useState();
  const [forecastCondition, setForecastCondition] = useState();
  const [autoComplete, setAutoComplete] = useState("timoteo");

  let cor = "#00FFFF"

  useEffect(() => {
    getLocation();
    fillforecastWeather();
  }, [search])

  function getLocation() {
    if (search) return
    navigator.geolocation.getCurrentPosition(location => {
      setSearch(location.coords.latitude + "," + location.coords.longitude);
    })
  }

  function trasnformData(data) {
    return moment(data).format('DD MMMM YYYY')
  }

  function fillforecastWeather() {
    if (!search) return;
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=31277a23a4924344afc173640222912&q=${search}&lang=pt&days=7`
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then((data) => {
      console.log(data)
      setForecastCondition(data);
    })
  }

  function fillAutoComplete() {
    fetch(
      `http://api.weatherapi.com/v1/search.json?key=31277a23a4924344afc173640222912&&q=${autoComplete}&lang=pt`
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then((data) => {
      console.log(data)
    })
  }


  return (
    <Grid container direction="column" style={{ backgroundImage: " url('https://usagif.com/wp-content/uploads/gifs/starfall-gif-5.gif')" }}>

      <Grid container>
        <Paper>
          <TextField
            id="standard-basic"
            label="Cidade"
            variant="outlined"
            value={autoComplete}
            onChange={
              (e) => {
                fillAutoComplete();
                setAutoComplete(e.target.value);
              }
            }
          />
          <IconButton aria-label="searchCity" onClick={() => {
            fillforecastWeather();
          }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>

      {forecastCondition ?
        <Grid container>
          <Grid item >
            <Grid style={{ height: "50vh", background: "none", }}>
              <Typography style={{ color: "#ffffff" }}>{forecastCondition.location.name}</Typography>
              <Typography style={{ fontSize: 60, color: cor }}>{forecastCondition.current.temp_c}º</Typography>
              <Typography style={{ color: "#ffffff" }}>{forecastCondition.current.condition.text}</Typography>
              <Typography style={{ color: "#ffffff" }}>Min: {forecastCondition.forecast.forecastday[0].day.mintemp_c}º Máx: {forecastCondition.forecast.forecastday[0].day.maxtemp_c}º</Typography>
              <Typography style={{ fontSize: 12, color: "#ffffff" }}>Sol nasce: {forecastCondition.forecast.forecastday[0].astro.sunrise} </Typography>
              <Typography style={{ fontSize: 12, color: "#ffffff" }}>Sol se pôe: {forecastCondition.forecast.forecastday[0].astro.sunset}</Typography>
              <img src={forecastCondition.current.condition.icon} />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ width: "100vw", justifyContent: "space-around" }}>
            {forecastCondition.forecast.forecastday.map((forecastday, index) => {
              if (index == 0) return;
              return (
                <Card key={index} style={{ textAlign: "center", alingContent: "center", background: "rgba(0, 0, 0, 0.4)" }} variant="elevation">
                  <Typography style={{ color: "#ffffff" }}>Data: {trasnformData(forecastday.date)}</Typography>
                  <Typography style={{ fontSize: 20, color: cor }}>{forecastday.day.avgtemp_c}º</Typography>
                  <img src={forecastday.day.condition.icon} />
                  <Typography style={{ color: "#ffffff" }} >{forecastday.day.condition.text}</Typography>
                  <Typography style={{ color: "#ffffff" }} >Min: {forecastday.day.mintemp_c}º Máx: {forecastday.day.maxtemp_c}º</Typography>
                </Card>
              )
            })}
          </Grid>
        </Grid>
        : <></>}

      <Grid container>
        asdas
      </Grid>

    </Grid>

  );
}

export default App;
