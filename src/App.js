import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import List from './components/list';
import Toolbar from './components/toolbar';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      heroes: []
    }

    this.addedHeroHandler = this.addedHeroHandler.bind(this);
    this.searchHeroHandler = this.searchHeroHandler.bind(this);
  }

  componentDidMount() {
    axios.get('https://heroes-49297.firebaseio.com/heroes.json')
      .then(res => {
        const heroes = Object.keys(res.data).map(key => {
          return res.data[key];
        });

        this.setState({
          ...this.state,
          heroes: heroes
        });
      })
      .catch(err => console.log(err));
  }

  addedHeroHandler(hero) {
    this.setState({
      ...this.state,
      heroes: [
        ...this.state.heroes,
        hero
      ]
    });
  }

  searchHeroHandler(search) {
    this.setState({
      ...this.state,
      search: search
    });
  }

  render() {
    const filteredHeroes = this.state.heroes.filter(hero => hero.name.toUpperCase().includes(this.state.search.toUpperCase()));
    return (
      <div className="App">
        <Header/>
        <Toolbar 
          addHero={this.addedHeroHandler} 
          searchHero={this.searchHeroHandler} />
        <List 
          heroes={filteredHeroes} />
      </div>
    );
  }
}

export default App;
