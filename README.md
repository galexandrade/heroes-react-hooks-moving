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
Create `hooks\customHooks.js`
```javascript
import {useState} from 'react';

export const useField = (defaultValue, shouldValidate = false) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = event => setValue(event.target.value);

    const isValid = shouldValidate && value.trim() !== '';

    return {value, onChange, isValid};
}
```

Update `components\addHeroModal\addModal.js`
```javascript
import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import HabilityField from './habilityField';
import axios from 'axios';

import { useField } from '../../hooks/customHooks';

const DEFAULT_IMAGE = 'https://www.pedagogie.ac-nantes.fr/medias/photo/super-heroe-volando-super-heroes-pintado-por-queyla-9738241_1436103185619-jpg';

const AddModal = props => {
  const name = useField('', true);
  const image = useField('', true);
  const strength = useField(0);
  const wisdom = useField(0);
  const speed = useField(0);
  const magic = useField(0);

  useEffect(() => {
    console.log('Going to add EventListener');
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      console.log('Removing event listener');
      document.removeEventListener('mousemove', mouseMoveHandler);
    }
  }, []);

  const mouseMoveHandler = event => console.log(event.clientX, event.clientY);

  const validateForm = () => name.isValid && image.isValid;

  const createHero = () => {
    const newHero = {
      name: name.value,
      image: image.value,
      habilities: {
        strength: +strength.value,
        wisdom: +wisdom.value,
        speed: +speed.value,
        magic: +magic.value,
      }
    }

    axios.post('https://heroes-49297.firebaseio.com/heroes.json', newHero)
      .then(res => {
        props.modalClosed();
        props.addHero(newHero)
      })
      .catch(err => console.log(err));
  }

  const defaultImage = image.value !== '' ? image.value : DEFAULT_IMAGE;
    
  return (
    <Modal isOpen={true} toggle={props.modalClosed} backdrop={true}>
      <ModalHeader toggle={props.modalClosed}>Let's create a hero</ModalHeader>
      <ModalBody>
        <Row>
          <Col xs={12}>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  placeholder="Type your hero's name here" 
                  onChange={name.onChange} 
                  value={name.value} />
              </FormGroup>
            </Form>
          </Col>
          <Col xs={12}>
            <img 
              src={defaultImage} 
              alt="New hero" 
              className="new-hero-image" />
          </Col>
          <Col xs={12}>
            <Form>
              <FormGroup>
                <Input 
                  type="text" 
                  id="image" 
                  placeholder="Copy here the image URL" 
                  onChange={image.onChange} 
                  value={image.value} />
              </FormGroup>
            </Form>
          </Col>
          <Col xs={12}>
            <Form>
              <HabilityField hability="strength" {...strength} />
              <HabilityField hability="wisdom" {...wisdom} />
              <HabilityField hability="speed" {...speed} />
              <HabilityField hability="magic" {...magic} />
            </Form>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button 
          color="primary" 
          onClick={createHero} 
          disabled={!validateForm()}>
          Create
        </Button>
        <Button 
          color="secondary" 
          onClick={props.modalClosed}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AddModal;
```