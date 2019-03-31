import React from 'react';
import { Row, Col, Progress } from 'reactstrap'; 

export const habilities = {
    strength: {
        name: 'Strength',
        icon: 'https://img.icons8.com/ios/20/000000/triceps.png',
        style: 'warning'
    },
    wisdom: {
        name: 'Wisdom',
        icon: 'https://img.icons8.com/ios/20/000000/guru.png',
        style: 'primary'
    },
    speed: {
        name: 'Speed',
        icon: 'https://img.icons8.com/ios/20/000000/exercise.png',
        style: 'success'
    },
    magic: {
        name: 'Magic',
        icon: 'https://img.icons8.com/ios/20/000000/fantasy.png',
        style: 'danger'
    },
};

const Hability = ({type, value}) => {
    const hability = habilities[type];

    return (
        <Row className="hability">
            <Col sm={2}>
                <img 
                    src={hability.icon} 
                    alt={hability.name} 
                    title={hability.name} 
                    className="hability-icon" />
            </Col>
            <Col sm={10}>
                <Progress 
                    animated 
                    color={hability.style} 
                    value={value}>
                    {value}
                </Progress>
            </Col>
        </Row>
    );
}

export default Hability;