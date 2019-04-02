# Heroes
## Moving from statefull components functional components with REACT HOOKS

### Architecture
![alt text](https://i.ibb.co/HFpfZG3/Screenshot-2019-04-01-20-12-42.png)

![alt text](https://i.ibb.co/1vnSFrW/Screenshot-2019-04-01-20-14-08.png)

### Moving planning
![alt text](https://i.ibb.co/V238NRj/Screenshot-2019-04-01-20-14-35.png)

* 1 - Move `Toolbar` to function component
```javascript
const Toolbar = props => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const switchModal = () => setOpenAddModal(!openAddModal);
  const searchHeroHandler = event => props.searchHero(event.target.value);

  {...continue...}
}
```
* 2 - Move `AddHeroModal` to function component
```javascript
const AddModal = props => {
  const [hero, setHero] = useState({
    name: '',
    image: '',
    strength: 0,
    wisdom: 0,
    speed: 0,
    magic: 0,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log('Going to add EventListener');
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      console.log('Removing event listener');
      document.removeEventListener('mousemove', mouseMoveHandler);
    }
  }, []);

  const mouseMoveHandler = event => console.log(event.clientX, event.clientY);

  const validateForm = hero => {
    let isValid = true;
    if(hero.name.trim() === ''){
      isValid = false;
    }
    else if(hero.image.trim() === ''){
      isValid = false;
    }
    return isValid;
  }

  const onChangeHandler = event => {
    const newHero = {
      ...hero,
      [event.target.id]: event.target.value
    }
    setHero(newHero);
    setFormIsValid(validateForm(newHero));
  }

  const createHero = () => {
    const newHero = {
      name: hero.name,
      image: hero.image,
      habilities: {
        strength: +hero.strength,
        wisdom: +hero.wisdom,
        speed: +hero.speed,
        magic: +hero.magic,
      }
    }

    axios.post('https://heroes-49297.firebaseio.com/heroes.json', newHero)
      .then(res => {
        props.modalClosed();
        props.addHero(newHero)
      })
      .catch(err => console.log(err));
  }

  return {...continue...};
}
```
* 3 - Move `App` to function component
```javascript
const App = props => {
  const [search, setSearch] = useState('');
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    axios.get('https://heroes-49297.firebaseio.com/heroes.json')
      .then(res => {
        const heroesFetched = Object.keys(res.data).map(key => {
          return res.data[key];
        });
        setHeroes(heroesFetched);
      })
      .catch(err => console.log(err));
  }, []);

  const addedHeroHandler = hero => {
    setHeroes([
      ...heroes,
      hero
    ]);
  }

  const searchHeroHandler = search => setSearch(search);

  const filteredHeroes = heroes.filter(hero => hero.name.toUpperCase().includes(search.toUpperCase()));

  return {...continue...};
}
```
* 4 - Create a custom hook `useField` to control form fields