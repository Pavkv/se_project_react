import {useState, useCallback} from 'react';

export function useFormAndValidation(onSubmit, onClose) {
    const [ values, setValues ] = useState({});
    const [ errors, setErrors ] = useState({});
    const [ isValid, setIsValid ] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target
        setValues({...values, [name]: value });
        setErrors({...errors, [name]: e.target.validationMessage});
        setIsValid(e.target.closest('form').checkValidity());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
        resetForm();
        onClose();
    };

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return { values, handleChange, handleSubmit, errors, isValid, setValues, setIsValid };
}
