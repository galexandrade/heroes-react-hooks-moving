import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { habilities } from '../hero/hability';
import HabilityField from './habilityField';
import axios from 'axios';

const DEFAULT_IMAGE = 'https://www.pedagogie.ac-nantes.fr/medias/photo/super-heroe-volando-super-heroes-pintado-por-queyla-9738241_1436103185619-jpg';

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


  const image = hero.image !== '' ? hero.image : DEFAULT_IMAGE;
    
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
                  onChange={onChangeHandler} 
                  value={hero.name} />
              </FormGroup>
            </Form>
          </Col>
          <Col xs={12}>
            <img 
              src={image} 
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
                  onChange={onChangeHandler} 
                  value={hero.image} />
              </FormGroup>
            </Form>
          </Col>
          <Col xs={12}>
            <Form>
              {Object.keys(habilities).map(hability => (
                <HabilityField 
                  key={hability}
                  hability={hability} 
                  value={hero[hability]} 
                  onChange={onChangeHandler} />
              ))}
            </Form>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button 
          color="primary" 
          onClick={createHero} 
          disabled={!formIsValid}>
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