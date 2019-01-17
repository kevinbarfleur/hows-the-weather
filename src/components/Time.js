import React, { Component } from 'react'
import WeatherIcons from 'react-weathericons'
import '../weatherIcon.css'

class Time extends Component {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount() {
    this.getRef()
  }

  getRef = () => {
    const timeContainer = this.refs.timeContainer
    this.props.getRef(timeContainer)
  }

  render() {
    let icon = undefined

    if (this.props.icon) {
      icon = this.props.icon
    } else {
      icon = 'cloud'
    }

    return (
      <div className="currentLocation-container" ref="timeContainer">
        <h3 className="currentLocation">{this.props.currentLocation[0]}</h3>
        <WeatherIcons className="weatherIcon" name={icon} size="4x" />
        <h2 className="temp">{this.props.currentLocation[3]}°C</h2>
      </div>
    )
  }
}

export default Time
