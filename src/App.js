import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './grid';
import SearchBar from './searchBar';

class App extends Component {

    constructor(){
        super();
        this.state = {
            gifs: null
        };
        this.updateGifs = this.updateGifs.bind(this);
    }

  updateGifs(gifs){
      this.setState({
          gifs
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <SearchBar updateGifs={this.updateGifs}/>
        <Grid gifs={this.state.gifs}/>
      </div>
    );
  }
}

export default App;
