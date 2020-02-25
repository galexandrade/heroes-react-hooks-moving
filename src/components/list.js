import React from 'react';
import { Col, Row } from 'reactstrap';
import Hero from './Hero/Hero';

const List = ({ heroes }) => {
    return (
        <Row>
            {heroes.length === 0 ? (
                <h1 className="not-found">No hero found :/</h1>
            ) : null}
            {heroes.map((hero, index) => (
                <Col sm={6} md={4} lg={3} key={index}>
                    <Hero hero={hero} />
                </Col>
            ))}
        </Row>
    );
};

export default List;
