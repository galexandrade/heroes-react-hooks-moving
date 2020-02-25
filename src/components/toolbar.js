import React, { useState } from 'react';
import { Button, Input, Col, Row } from 'reactstrap';
import AddModal from './addHeroModal/addModal';

const Toolbar = props => {
    const [openAddModal, setOpenAddModal] = useState(false);

    const switchModal = () => setOpenAddModal(!openAddModal);

    const searchHeroHandler = event => props.searchHero(event.target.value);

    return (
        <Row className="toolbar">
            <Col xs={6} sm={8} md={10}>
                <Input
                    type="text"
                    placeholder="Search your heroe here..."
                    bsSize="lg"
                    onChange={searchHeroHandler}
                />
            </Col>
            <Col xs={6} sm={4} md={2}>
                <Button color="success" size="lg" block onClick={switchModal}>
                    Add hero
                </Button>
            </Col>
            {openAddModal ? (
                <AddModal modalClosed={switchModal} addHero={props.addHero} />
            ) : null}
        </Row>
    );
};

export default Toolbar;
