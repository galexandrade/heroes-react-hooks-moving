import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import HabilityField from './habilityField';
import axios from 'axios';
import { useField } from '../../hooks/customHooks';

const DEFAULT_IMAGE = 'https://www.pedagogie.ac-nantes.fr/medias/photo/super-heroe-volando-super-heroes-pintado-por-queyla-9738241_1436103185619-jpg';

const AddModal = props => {
  const name = useField('');
  const image = useField('');
  const strength = useField(0);
  const wisdom = useField(0);
  const speed = useField(0);
  const magic = useField(0);

  const [formIsValid, setFormIsValid] = useState(false);

  /*
  useEffect(() => {
    console.log('Going to add EventListener');
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      console.log('Removing event listener');
      document.removeEventListener('mousemove', mouseMoveHandler);
    }
  }, []);
  */

  const mouseMoveHandler = event => console.log(event.clientX, event.clientY);

  const validateForm = newHero => {
    let isValid = true;
    if(newHero.name.trim() === ''){
      isValid = false;
    }
    else if(newHero.image.trim() === ''){
      isValid = false;
    }
    return isValid;
  }

  const createHero = () => {
    const newHero = {
      name: name.value,
      image: image.value,
      habilities: {
        magic: +magic.value,
        speed: +speed.value,
        strength: +strength.value,
        wisdom: +wisdom.value,
      }
    }

    axios.post('https://heroes-49297.firebaseio.com/heroes.json', newHero)
      .then(res => {
        props.modalClosed();
        props.addHero(newHero)
      })
      .catch(err => console.log(err));
  }


  const imageToLoad = image.value !== '' ? image.value : DEFAULT_IMAGE;
    
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
              src={imageToLoad} 
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
              <HabilityField 
                hability="strength"
                {...strength}  />
              <HabilityField 
                hability="wisdom"
                {...wisdom}  />
              <HabilityField 
                hability="speed"
                {...speed}  />
              <HabilityField 
                hability="magic"
                {...magic} />
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