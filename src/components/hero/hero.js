import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import Hability from './Hability';

const Hero = ({ hero }) => {
    const habilities = Object.keys(hero.habilities).map(hability => (
        <Hability
            type={hability}
            key={hability}
            value={hero.habilities[hability]}
        />
    ));

    return (
        <Card className="hero">
            <CardImg top width="100%" src={hero.image} alt={hero.name} />
            <CardBody>
                <CardTitle>{hero.name}</CardTitle>
                <div className="habilities">{habilities}</div>
            </CardBody>
        </Card>
    );
};

export default Hero;
