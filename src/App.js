import { Grid, IconButton, Paper, TextField, Card, Typography, Box } from "@material-ui/core";
//import SearchIcon from "@mui/icons-material";
import { useEffect, useState } from "react";

function App() {
  const [currentWeatecCondition, setCurrentWeatecCondition] = useState();
  const [forecastCondition, setForecastCondition] = useState();
  const [autoComplete, setAutoComplete] = useState("Timoteo");

  let cor = "#00FFFF"

  //31277a23a4924344afc173640222912
  function fillCurrentWeather() {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=31277a23a4924344afc173640222912&q=${autoComplete}&lang=pt`
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then((data) => {
      console.log(data)
      setCurrentWeatecCondition(data);
    })
  }

  function trasnformData(data) {
    let space = data.split('-');
    return space[space.length - 1] + "/" + space[1] + "/" + space[0]
  }

  function fillfutureWeather() {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=31277a23a4924344afc173640222912&q=${autoComplete}&lang=&days=7`
    ).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then((data) => {
      console.log(data)
      setForecastCondition(data);
    })
  }
  // function fillAutoComplete() {
  // fetch(
  // `http://api.weatherapi.com/v1/search.json?key=31277a23a4924344afc173640222912&&q=${autoComplete}&lang=pt`
  // ).then((response) => {
  // if (response.status === 200) {
  // return response.json();
  // }
  // }).then((data) => {
  // console.log(data)
  // })
  // }

  return (
    <Grid container direction="column" style={{ backgroundColor: cor }}>

      <Grid container>
        <Paper>
          <TextField
            id="standard-basic"
            label="Cidade"
            variant="outlined"
            value={autoComplete}
            onChange={
              (e) => setAutoComplete(e.target.value)
            }
          />
          <IconButton aria-label="searchCity" onClick={() => {
            fillCurrentWeather();
            fillfutureWeather();
          }}>
            Pesquisa
          </IconButton>
        </Paper>
      </Grid>

      <Grid container>
        {currentWeatecCondition ?
          <Grid item style={{ width: "100vw" }}>
            <Card style={{ height: "50vh" }}>
              <Typography>{currentWeatecCondition.location.name}</Typography>
              <Typography style={{ fontSize: 60, color: cor }}>{currentWeatecCondition.current.temp_c}º</Typography>
              <Typography>{currentWeatecCondition.current.condition.text}</Typography>
              <Typography>Min: {forecastCondition.forecast.forecastday[0].day.mintemp_c}º Máx: {forecastCondition.forecast.forecastday[0].day.maxtemp_c}º</Typography>
              <Typography style={{ fontSize: 12 }}>Sol nasce: {forecastCondition.forecast.forecastday[0].astro.sunrise} </Typography>
              <Typography style={{ fontSize: 12 }}>Sol se pôe: {forecastCondition.forecast.forecastday[0].astro.sunset}</Typography>
              <img src={currentWeatecCondition.current.condition.icon} />
            </Card>
          </Grid>
          : <></>
        }
        <Grid container direction="row" style={{ width: "100vw", justifyContent: "space-around" }}>
          {forecastCondition.forecast.forecastday.map((forecastday, index) => {
            if (index == 0) return;
            return (
              <Card style={{ alingContent: "center" }}>
                <Typography style={{ fontSize: 60, color: cor }}>{forecastday.day.avgtemp_c}º</Typography>
                <Typography>{forecastday.day.condition.text}</Typography>
                <Typography>Min: {forecastday.day.mintemp_c}º Máx: {forecastday.day.maxtemp_c}º</Typography>
                <Typography>Data: {trasnformData(forecastday.date)}</Typography>
                <img src={forecastday.day.condition.icon} />
              </Card>
            )
          })}
        </Grid>
      </Grid>

      <Grid container>
        asdas
      </Grid>

    </Grid>

  );
}

export default App;
