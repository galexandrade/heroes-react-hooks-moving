import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import HabilityField from './habilityField';
import axios from 'axios';

const DEFAULT_IMAGE = 'https://www.pedagogie.ac-nantes.fr/medias/photo/super-heroe-volando-super-heroes-pintado-por-queyla-9738241_1436103185619-jpg';

class AddModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: {
        name: '',
        image: '',
        strength: 0,
        wisdom: 0,
        speed: 0,
        magic: 0,
      },
      formIsValid: false
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.createHero = this.createHero.bind(this);
  }

  componentDidMount() {
    console.log('Going to add EventListener');
    document.addEventListener('mousemove', this.mouseMoveHandler);
  }

  componentWillUnmount() {
    console.log('Removing event listener');
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  }

  validateForm (form) {
    let isValid = true;
    if(form.hero.name.trim() === ''){
      isValid = false;
    }
    else if(form.hero.image.trim() === ''){
      isValid = false;
    }
    return isValid;
  }

  onChangeHandler(event) {
    const hero = {
      ...this.state.hero,
      [event.target.id]: event.target.value
    }

    const newState = {
      ...this.state,
      hero: hero
    };

    this.setState({
      ...newState,
      formIsValid: this.validateForm(newState)
    });
  }

  createHero() {
    const hero = {
      name: this.state.hero.name,
      image: this.state.hero.image,
      habilities: {
        strength: +this.state.hero.strength,
        wisdom: +this.state.hero.wisdom,
        speed: +this.state.hero.speed,
        magic: +this.state.hero.magic,
      }
    }

    axios.post('https://heroes-49297.firebaseio.com/heroes.json', hero)
      .then(res => {
        this.props.modalClosed();
        this.props.addHero(hero)
      })
      .catch(err => console.log(err));
  }


  render() {
    const image = this.state.hero.image !== '' ? this.state.hero.image : DEFAULT_IMAGE;
    
    return (
      <Modal isOpen={true} toggle={this.props.modalClosed} backdrop={true}>
        <ModalHeader toggle={this.props.modalClosed}>Let's create a hero</ModalHeader>
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
                    onChange={this.onChangeHandler} 
                    value={this.state.hero.name} />
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
                    onChange={this.onChangeHandler} 
                    value={this.state.hero.image} />
                </FormGroup>
              </Form>
            </Col>
            <Col xs={12}>
              <Form>
                <HabilityField 
                  hability="strength"
                  value={this.state.hero.strength} 
                  onChange={this.onChangeHandler} />
                <HabilityField 
                  hability="wisdom"
                  value={this.state.hero.wisdom} 
                  onChange={this.onChangeHandler} />
                <HabilityField 
                  hability="speed"
                  value={this.state.hero.speed} 
                  onChange={this.onChangeHandler} />
                <HabilityField 
                  hability="magic"
                  value={this.state.hero.magic} 
                  onChange={this.onChangeHandler} />
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button 
            color="primary" 
            onClick={this.createHero} 
            disabled={!this.state.formIsValid}>
            Create
          </Button>
          <Button 
            color="secondary" 
            onClick={this.props.modalClosed}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddModal;