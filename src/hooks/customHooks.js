import { useState } from 'react';

export const useField = (initialValue, shouldValidate = false) => {
    const [value, setValue] = useState(initialValue);
  
    const onChange = event => {
        const newValue = event.target.value;
        setValue(newValue);
    };

    const isValid = shouldValidate && value.trim() !== '';
  
    return {value, onChange, isValid};
}