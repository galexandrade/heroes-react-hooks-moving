import { useState } from 'react';

export const useField = (initialValue, shouldValidate = false) => {
    const [value, setValue] = useState(initialValue);
    const [isValid, setValidity] = useState(false);
  
    const onChange = event => {
        const newValue = event.target.value;
        setValue(newValue);
        setValidity(shouldValidate && value.trim() !== '');
    };
  
    return {value, onChange, isValid};
}