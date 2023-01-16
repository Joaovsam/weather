import { Grid, IconButton, Paper, TextField, Card, Typography, Box, Tabs, Container, Hidden, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import GradeIcon from '@material-ui/icons/Grade';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import moment from "moment"

function App() {
  const [search, setSearch] = useState();
  const [forecastCondition, setForecastCondition] = useState();
  const [autoComplete, setAutoComplete] = useState("");
  const [favoritedCity, setFavoritedCity] = useState([]);
  const [isVisible, setisVisible] = useState("none");

  let cor = "#00FFFF"

  useEffect(() => {
    getLocation();
    fillforecastWeather();
  }, [search])

  useEffect(() => {
    setFavoritedCity(JSON.parse(localStorage.getItem("favoritedCity")))
  }, [])

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

  return (
    <Container style={{ minHeight: "100vh", minWidth: "100vw", background: "linear-gradient(90deg, rgba(25,101,175,1) 0%, rgba(156,240,58,1) 100%)", padding: "2rem" }}>
      <Grid container >
        <Paper >
          <TextField
            id="standard-basic"
            label="Cidade"
            variant="outlined"
            value={autoComplete}
            onChange={
              (e) => {
                // fillAutoComplete();
                setAutoComplete(e.target.value);
              }
            }
          />
          <IconButton aria-label="searchCity" onClick={() => {
            setSearch(autoComplete);
          }}>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>

      {forecastCondition ?
        <Grid>
          <Grid container>
            <Grid item style={{ textAlign: "center", background: "none", maxWidth: "100%" }}>
              <Grid style={{ textAlign: "center", background: "none", margin: "3rem" }}>
                <Typography style={{ color: "#ffffff" }}>{forecastCondition.location.name}
                  <IconButton aria-label="searchCity" onClick={() => {
                    let k = { "cidade": forecastCondition.location.name }
                    localStorage.setItem("favoritedCity", JSON.stringify([k]))
                  }}>
                    <GradeIcon />
                  </IconButton>
                </Typography>
                <img src={forecastCondition.current.condition.icon} />
                <Typography style={{ fontSize: 60, color: "#ffffff", fontFamily: "math" }}>{forecastCondition.current.temp_c}º</Typography>
                <Typography style={{ color: "#ffffff" }}>{forecastCondition.current.condition.text}</Typography>
                <Typography style={{ color: "#ffffff", fontFamily: "math" }}>Min: {forecastCondition.forecast.forecastday[0].day.mintemp_c}º Máx: {forecastCondition.forecast.forecastday[0].day.maxtemp_c}º</Typography>

                <Accordion style={{ width: "50%", textAlign: "initial", marginLeft: "25%", background: "none" }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography style={{ color: "#ffffff" }}>Detalhes</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ flexDirection: "column" }}>
                    <Card style={{ paddingLeft: "1.5rem", background: "rgba(0, 0, 0, 0.2)", fontSize: "1.4rem", marginBottom: "0.15rem", color: "#ffffff" }} variant="elevation">
                      Nascer do sol:  {forecastCondition.forecast.forecastday[0].astro.sunrise}
                    </Card>
                    <Card style={{ paddingLeft: "1.5rem", background: "rgba(0, 0, 0, 0.2)", fontSize: "1.4rem", marginBottom: "0.15rem", color: "#ffffff" }} variant="elevation">
                      Pôr do sol: {forecastCondition.forecast.forecastday[0].astro.sunset}
                    </Card>
                    <Card style={{ paddingLeft: "1.5rem", background: "rgba(0, 0, 0, 0.2)", fontSize: "1.4rem", marginBottom: "0.15rem", color: "#ffffff" }} variant="elevation">
                      Umidade: {forecastCondition.current.humidity}%
                    </Card>
                    <Card style={{ paddingLeft: "1.5rem", background: "rgba(0, 0, 0, 0.2)", fontSize: "1.4rem", marginBottom: "0.15rem", color: "#ffffff" }} variant="elevation">
                      Precipitação: {forecastCondition.current.precip_mm} mm
                    </Card>
                    <Card style={{ paddingLeft: "1.5rem", background: "rgba(0, 0, 0, 0.2)", fontSize: "1.4rem", marginBottom: "0.15rem", color: "#ffffff" }} variant="elevation">
                      Visibilidade: {forecastCondition.current.vis_km} km
                    </Card>
                    <Card style={{ paddingLeft: "1.5rem", background: "rgba(0, 0, 0, 0.2)", fontSize: "1.4rem", marginBottom: "0.15rem", color: "#ffffff" }} variant="elevation">
                      Incidencia ultra violeta: {forecastCondition.current.uv}
                    </Card>
                    <Card style={{ paddingLeft: "1.5rem", background: "rgba(0, 0, 0, 0.2)", fontSize: "1.4rem", marginBottom: "0.15rem", color: "#ffffff" }} variant="elevation">
                      Vento: {forecastCondition.current.wind_kph} km/h {forecastCondition.current.wind_dir}
                    </Card>
                    <Card style={{ paddingLeft: "1.5rem", background: "rgba(0, 0, 0, 0.2)", fontSize: "1.4rem", marginBottom: "0.15rem", color: "#ffffff" }} variant="elevation">
                      Sensação: {forecastCondition.current.feelslike_c}º
                    </Card>
                    <Card style={{ paddingLeft: "1.5rem", background: "rgba(0, 0, 0, 0.2)", fontSize: "1.4rem", marginBottom: "0.15rem", color: "#ffffff" }} variant="elevation">
                      Pressão: {forecastCondition.current.pressure_mb} hPa
                    </Card>
                  </AccordionDetails>
                </Accordion>


              </Grid>
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                orientation="horizontal"
                value={0}
                style={{
                  marginBottom: "3rem"
                }}
              >
                {forecastCondition.forecast.forecastday.map((forecastday, index) => {
                  if (index > 1) return;
                  if (index == 0) {
                    return forecastday.hour.map((hour, index2) => {
                      if (index2 < moment().hour()) return;
                      return (
                        <Grid key={index2} style={{ margin: "0.1rem", minWidth: "4.5rem", textAlign: "center", alingContent: "center", background: "rgba(0, 0, 0, 0.4)", borderRadius: 15, padding: "0.2rem" }} variant="elevation">
                          <Typography style={{ fontSize: "1.2rem", color: "#ffffff" }}>{index2 === moment().hour() ? "Agora" : index2 + ":00"}</Typography>
                          <img style={{ maxWidth: "3rem", width: "auto", maxHeight: "3rem", height: "auto" }} src={hour.condition.icon} />
                          <Typography style={{ fontSize: "1.2rem", color: "#ffffff", fontFamily: "math" }}>{hour.temp_c}º</Typography>
                        </Grid>
                      )
                    })
                  }
                  if (index == 1) {
                    return forecastday.hour.map((hour, index2) => {
                      if (index2 >= moment().hour()) return;
                      return (
                        <Grid key={index2} style={{ margin: "0.1rem", minWidth: "4.5rem", textAlign: "center", alingContent: "center", background: "rgba(0, 0, 0, 0.4)", borderRadius: 15, padding: "0.2rem" }} variant="elevation">
                          <Typography style={{ fontSize: "1.2rem", color: "#ffffff" }}>{index2 === moment().hour() ? "Agora" : index2 + ":00"}</Typography>
                          <img style={{ maxWidth: "3rem", width: "auto", maxHeight: "3rem", height: "auto" }} src={hour.condition.icon} />
                          <Typography style={{ fontSize: "1.2rem", color: "#ffffff", fontFamily: "math" }}>{hour.temp_c}º</Typography>
                        </Grid>
                      )
                    })
                  }
                })
                }
              </Tabs>
            </Grid>
            <Grid container direction="row" style={{ background: "none", maxWidth: "100%", width: "100%" }}>

              <Grid container direction="column" style={{ width: "50%", alingContent: "space-around" }}>

                {forecastCondition.forecast.forecastday.map((forecastday, index) => {
                  if (index == 0) return (
                    <Card key={index} style={{ textAlign: "center", background: "rgba(0, 0, 0, 0.4)", borderTopLeftRadius: 15, borderTopRightRadius: 15, width: "50%" }} variant="elevation">
                      <Typography style={{ color: "#ffffff" }}>Próximos 2 dias</Typography>
                    </Card>
                  );
                  return (
                    <Card key={index} style={{ textAlign: "center", background: "rgba(0, 0, 0, 0.4)", borderRadius: 15, width: "50%" }} variant="elevation">
                      <Typography style={{ color: "#ffffff" }}>Data: {trasnformData(forecastday.date)}</Typography>
                      <Typography style={{ fontSize: 20, color: cor }}>{forecastday.day.avgtemp_c}º</Typography>
                      <img src={forecastday.day.condition.icon} />
                      <Typography style={{ color: "#ffffff" }} >{forecastday.day.condition.text}</Typography>
                      <Typography style={{ color: "#ffffff", fontFamily: "math" }} >Min: {forecastday.day.mintemp_c}º Máx: {forecastday.day.maxtemp_c}º</Typography>
                    </Card>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>

        </Grid>

        : <></>
      }


    </Container >

  );
}

export default App;
