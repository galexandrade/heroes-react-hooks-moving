import React from 'react';
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

  const formIsValid = () => {
    return image.isValid && name.isValid;
  }

  const imageSrc = image.value !== '' ? image.value : DEFAULT_IMAGE;
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
                  {...name} />
              </FormGroup>
            </Form>
          </Col>
          <Col xs={12}>
            <img 
              src={imageSrc} 
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
                  {...image} />
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
          disabled={!formIsValid()}>
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