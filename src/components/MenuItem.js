import React, { Component } from 'react'

class MenuItem extends Component {
  constructor() {
    super()

    this.state = {}
  }

  handleLocation = () => {
    this.props.showLocation(this.props.location)
  }

  render() {
    return (
      <div className="item" onClick={this.handleLocation}>
        <p>{this.props.location[0]}</p>
      </div>
    )
  }
}

export default MenuItem
