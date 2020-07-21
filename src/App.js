import React, { Component } from 'react'
import Info from './components/Info'
import Form from './components/Form'
import Weather from './components/Weather'


const API_KEY = "ab1018929f31acee791aa936207a1504";


export default class App extends Component {
  constructor() {
    super();
  
    this.state = {
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: undefined
    }
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    // const api_url = await 
    // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    // const data = await api_url.json();

    if(city){

      const api_url = await 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      var tempC = parseInt(data.main.temp - 273) + "C";

    this.setState({
      temp: tempC,
      city: data.name,
      country: data.sys.country,
      pressure: data.main.pressure,
      sunset: sunset_date,
      error: undefined
    });
  } else {
    this.setState({
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: "Set city name"
    });
  }
}

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form 
                weatherMethod={this.gettingWeather}
                />
                <Weather 
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                pressure={this.state.pressure}
                sunset={this.state.sunset}
                error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
