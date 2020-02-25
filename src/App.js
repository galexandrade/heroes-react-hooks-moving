import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import List from './components/List';
import Toolbar from './components/Toolbar';
import axios from 'axios';

const App = props => {
    const [search, setSearch] = useState('');
    const [heroes, setHeroes] = useState([]);

    useEffect(() => {
        axios
            .get('https://heroes-49297.firebaseio.com/heroes.json')
            .then(res => {
                const heroes = Object.keys(res.data).map(key => {
                    return res.data[key];
                });

                setHeroes(heroes);
            })
            .catch(err => console.log(err));
    }, []);

    const addedHeroHandler = hero => {
        setHeroes([...heroes, hero]);
    };

    const searchHeroHandler = search => setSearch(search);

    const filteredHeroes = heroes.filter(hero =>
        hero.name.toUpperCase().includes(search.toUpperCase())
    );
    return (
        <div className="App">
            <Header />
            <Toolbar
                addHero={addedHeroHandler}
                searchHero={searchHeroHandler}
            />
            <List heroes={filteredHeroes} />
        </div>
    );
};

export default App;
