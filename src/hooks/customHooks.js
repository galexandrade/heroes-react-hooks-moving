import { useState } from 'react';

export const useField = (initialValue, shouldValidate = false) => {
    const [value, setValue] = useState(initialValue);
  
    const isValid = shouldValidate && value.trim() !== '';
    const onChange = event => setValue(event.target.value);
  
    return {value, onChange, isValid};
}