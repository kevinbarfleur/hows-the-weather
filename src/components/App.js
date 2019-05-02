import React, { Component } from 'react'
import Menu from './Menu'
import Spinner from 'react-spinkit'
import { weatherIcons } from '../icons'
import WeatherIcons from 'react-weathericons'
import '../weatherIcon.css'

const logo = require('../img/favicon.png')

class App extends Component {
  constructor() {
    super()

    this.state = {
      locations: [
        ['Paris', 48.866667, 2.333333],
        ['London', 51.5073509, -0.12775829999998223],
        ['Pointe-à-Pitre', 16.2376869, -61.534042399999976],
        ['Tokyo', 35.6894875, 139.69170639999993],
        ['Cape Town', -33.9248685, 18.424055299999964],
        ['New York', 40.7127837, -74.00594130000002],
        ['Jakarta', -6.17511, 106.86503949999997],
        ['Moscow', 55.755826, 37.6173]
      ],
      currentLocation: ['Paris', 48.866667, 2.333333],
      charged: false
    }
  }

  // componentWillMount() {
  //   if ('geolocation' in navigator)
  //     navigator.geolocation.getCurrentPosition(
  //       this.succesGeolocation.bind(this)
  //     )
  //   else
  //     alert(
  //       "Le service de géolocalisation n'est pas disponible sur votre ordinateur."
  //     )
  // }

  componentWillMount() {
    this.succesGeolocation()
  }

  succesGeolocation = () => {
    const currentLocationWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${
      this.state.currentLocation[1]
    }&lon=${
      this.state.currentLocation[2]
    }&lang=fr&units=metric&appid=74278b6353158c1f419fe948f3444e55`

    fetch(currentLocationWeather)
      .then(response => response.json())
      .then(response => {
        this.setState(
          {
            currentLocation: [
              this.state.currentLocation[0],
              response.coord.lat,
              response.coord.lon,
              response.main.temp,
              response.weather[0].id
            ]
          },
          () => {
            this.setState({ charged: true }, () => {
              //console.log(response)
              this.setWeatherIcon(response)
            })
          }
        )
      })
  }

  showMenu() {
    const menuButton = document.querySelector('.menu-container')
    const menu = document.querySelector('.menu')
    menuButton.classList.toggle('active')
    menu.classList.toggle('active')
  }

  showLocation = location => {
    this.setState({ charged: false })
    this.setState({ currentLocation: [...location] }, () => {
      this.showWeather()
      this.showMenu()
    })
  }

  showWeather() {
    // navigator.geolocation.getCurrentPosition(this.succesGeolocation.bind(this))
    this.succesGeolocation()
  }

  setWeatherIcon = data => {
    const timeContainer = this.refs.timeContainer
    const today = new Date()
    const hour = today.getHours()
    const prefix = 'wi wi-'
    const iconCode = this.state.currentLocation[4]
    let designedIcon = weatherIcons[iconCode].icon
    let journeyTime

    if (hour > 6 && hour < 20) {
      journeyTime = 'day-'
    } else {
      journeyTime = 'night-'
    }

    designedIcon = prefix + 'owm-' + journeyTime + iconCode

    this.setState(
      {
        currentLocation: [
          this.state.currentLocation[0],
          this.state.currentLocation[1],
          this.state.currentLocation[2],
          this.state.currentLocation[3],
          this.state.currentLocation[4],
          designedIcon
        ]
      },
      () => {
        setTimeout(() => {
          // console.log(data)
          timeContainer.style.opacity = '1'
        }, 700)
      }
    )
  }

  render() {
    let icon = undefined

    if (this.state.currentLocation[5]) {
      icon = this.state.currentLocation[5]
    } else {
      icon = 'cloud'
    }

    const currentLocation = (
      <div className="currentLocation-container" ref="timeContainer">
        <h3 className="currentLocation">{this.state.currentLocation[0]}</h3>
        <WeatherIcons className="weatherIcon" name={icon} size="4x" />
        <h2 className="temp">{Math.round(this.state.currentLocation[3])}°C</h2>
      </div>
    )

    let rendering = undefined

    if (this.state.charged) {
      rendering = currentLocation
    } else {
      rendering = <Spinner name="double-bounce" className="spinner" />
    }

    return (
      <div className="Page">
        <div className="title">
          <img src={logo} alt="logo how's the weather" />
          <h1>How's the Weather</h1>
        </div>
        <div className="App">
          <div className="menu-area">
            <div className="menu-container" onClick={this.showMenu}>
              <div className="menu-item" />
            </div>

            <Menu
              locations={this.state.locations}
              showLocation={this.showLocation}
            />
          </div>

          {rendering}
        </div>
        <div className="footer">
          <p>
            howstheweather -{' '}
            <b>
              <a href="https://kevinbarfleur.com/">Kévin Barfleur</a>
            </b>{' '}
            - 2019
          </p>
        </div>
      </div>
    )
  }
}

export default App
