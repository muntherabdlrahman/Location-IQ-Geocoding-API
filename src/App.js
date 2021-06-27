import React, { Component } from 'react'
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: ' ',
      latitude: ' ',
      longitude: ' ',

      show: false,
      error: ''
    }
  }
  namelocation = (e) => {
    this.setState({
      displayName: e.target.value
    })
  }
  SubmitForm = async (e) => {
    e.preventDefault();
    try {
      let axiResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.c6f749ed3369fcaa6d4dfb08d3391e9c&city=${this.state.nameforcity}&format=json`);




      this.setState({
        displayName: axiResponse.data[0].display_name,
        latitude: axiResponse.data[0].lat,
        longitude: axiResponse.data[0].lon,
        show: !this.state.show,
        error: ' '
      })
    }
    catch {
      this.setState({
        error: 'not found'
      })
    }


  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => { this.SubmitForm(e) }}>
          <input type='text' onChange={(e) => { this.namelocation(e) }} />
          <button >Explore for city</button>
        </form>


        {this.state.show &&
          <h1>City Name{this.state.displayName}</h1>}

        <h2>latitude:{this.state.latitude}</h2>

        <h2>longitude:  {this.state.longitude}</h2>
        <br />
        <br />
        <br />
        <br />

        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.c6f749ed3369fcaa6d4dfb08d3391e9c&center=${this.state.latitude},${this.state.longitude}&zoom=18&format=png`} width='300px' height='300px' />
      

      </div>
    )
  }
}

export default App