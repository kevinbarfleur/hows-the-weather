import React, { Component } from 'react'
import MenuItem from './MenuItem'

class Menu extends Component {
  constructor() {
    super()

    this.state = {
      locations: []
    }
  }

  componentWillMount() {
    this.setState({ locations: this.props.locations })
  }

  addPlace(e) {
    e.preventDefault()
    const allPlaces = [...this.props.locations]
    const newPlace = this.cityInput.value
    allPlaces.push([newPlace])
    this.setState({ locations: allPlaces })

    this.cityInput.value = ''
  }

  render() {
    const locations = this.state.locations.map((location, index) => (
      <MenuItem
        key={index}
        location={location}
        showLocation={this.props.showLocation}
      />
    ))

    return (
      <div className="menu">
        {/* <form className="item-input" onSubmit={ e => this.addPlace(e) }>
					<input required
									type="text" 
									placeholder="Add Place (Soon)"
									ref={ input => this.cityInput = input }>
					</input>
				</form> */}

        {locations}
      </div>
    )
  }
}

export default Menu
