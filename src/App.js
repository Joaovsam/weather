import { Grid, IconButton, Paper, TextField, Card, Typography } from "@material-ui/core";
//import SearchIcon from "@mui/icons-material";
import { useEffect, useState } from "react";

function App() {
  const [currentWeatecCondition, setCurrentWeatecCondition] = useState();
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
    <Grid container direction="column" >


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
                setAutoComplete(e.target.value)
              }}
          />
          <IconButton aria-label="searchCity" onClick={() => { fillCurrentWeather(); }}>
            Pesquisa
          </IconButton>
        </Paper>
      </Grid>

      <Grid container>
        {currentWeatecCondition ?
          <Grid item style={{ width: "100vw" }}>
            <Card style={{ height: "50vh" }}>
              <Typography>{currentWeatecCondition.location.name}</Typography>
              <Typography style={{ fontSize: 36, color: cor }}>{currentWeatecCondition.current.temp_c}º</Typography>
              <Typography>{currentWeatecCondition.current.condition.text}</Typography>
              <Typography>Sensação térmica: {currentWeatecCondition.current.feelslike_c}º</Typography>
              <img src={currentWeatecCondition.current.condition.icon} />
            </Card>
          </Grid>
          : <></>
        }
        <Grid>

        </Grid>
      </Grid>

      <Grid container>
        asdas
      </Grid>

    </Grid>

  );
}

export default App;
