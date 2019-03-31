import React, { Component } from 'react';
import { Button, Input, Col, Row } from 'reactstrap';
import AddModal from './addHeroModal/addModal';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddModal: false
    };

    this.switchModal = this.switchModal.bind(this);
    this.searchHeroHandler = this.searchHeroHandler.bind(this);
  }

  switchModal() {
    this.setState(prevState => ({
      openAddModal: !prevState.openAddModal
    }));
  }

  searchHeroHandler(event) {
    this.props.searchHero(event.target.value);
  }

  render() {
    return (
        <Row className="toolbar">
          <Col xs={6} sm={8} md={10}>
              <Input 
                type="text"
                placeholder="Search your heroe here..."
                bsSize="lg"
                onChange={this.searchHeroHandler} />
          </Col>
          <Col xs={6} sm={4} md={2}>
              <Button
                color="success" 
                size="lg" 
                block
                onClick={this.switchModal}>
                Add hero
              </Button>
          </Col>
          {this.state.openAddModal 
            ? <AddModal 
                modalClosed={this.switchModal} 
                addHero={this.props.addHero}  /> 
            : null}
        </Row>
    );
  }
}

export default Toolbar;