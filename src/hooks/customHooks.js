import {useState} from 'react';

export const useField = (defaultValue, shouldValidate = false) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = event => setValue(event.target.value);

    const isValid = shouldValidate && value.trim() !== '';

    return {value, onChange, isValid};
}