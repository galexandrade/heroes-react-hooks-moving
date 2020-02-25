import React from 'react';
import { habilities } from '../Hero/Hability';
import { FormGroup, Label, Col, Input } from 'reactstrap';

const HabilityField = ({ hability, value, onChange }) => {
    return (
        <FormGroup row>
            <Label for={hability} sm={2}>
                {habilities[hability].name}
            </Label>
            <Col sm={8}>
                <Input
                    type="range"
                    id={hability}
                    max="100"
                    onChange={onChange}
                    value={value}
                />
            </Col>
            <Label sm={2}>{value}</Label>
        </FormGroup>
    );
};

export default HabilityField;
