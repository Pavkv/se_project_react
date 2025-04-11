import {useState, useCallback} from 'react';

export function useFormAndValidation({onSubmit, onClose, isLoading}) {
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
        onSubmit(values).catch(console.error).then(() => {
            onClose();
            resetForm();
        }).finally(isLoading(false));
    };

    const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return { values, handleChange, handleSubmit, errors, isValid, setValues, setIsValid };
}
