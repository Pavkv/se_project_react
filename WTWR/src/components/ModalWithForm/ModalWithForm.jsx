import Modal from "../Modal/Modal.jsx";
import React, {useEffect, useState} from 'react';

export default function ModalWithForm({onClose, title, name, buttonText, isOpen, children, onSubmit, inputs}) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setValid] = useState(false);

    useEffect(() => {
        if (values && Object.keys(values).length === inputs) {
            setValid(Object.keys(errors).length === 0);
        }
    }, [values]);

    const handleChange = (e) => {
        const {name, value, validationMessage} = e.target;

        setValues((prev) => ({...prev, [name]:value}));
        const newErrors = {...errors};
        if (validationMessage || !value.trim()){
            newErrors[name] = validationMessage;
        } else {
            delete newErrors[name];
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;
        onSubmit(values);
    };

    const handleErrorsChildren = React.Children.map(children, (child) => {
        if (child.type === "label" && child.props.children) {
            return React.cloneElement(child, {
                children: React.Children.map(child.props.children, (field) => {
                    if (field?.type === "input" || field?.type === "select") {
                        return React.cloneElement(field, {
                            onChange: handleChange,
                            value: values[field.props.name] || "",
                            className: `form__input ${errors[field.props.name] ? 'form__input_type_error' : ''}`,
                        });
                    }
                    if (field?.type === "div") {
                        const errorField = React.Children.map(field.props.children, (child) => {
                            if (child?.type === "span") {
                                const errorText = errors[child.props.id] || "";
                                return React.cloneElement(child, {
                                    children: errorText ? `(${errorText})` : "",
                                    className: `form__error ${errorText ? "form__error_visible" : ""}`,
                                });
                            }
                            return child;
                        });
                        return React.cloneElement(field, {
                            children: errorField,
                        });
                    }
                    return field;
                })
            });
        }
        return child;
    });

    return (
        <Modal onClose={onClose} isOpen={isOpen} name={"add-garment"}>
            <form className="form" name={name} onSubmit={handleSubmit} noValidate>
                <h2 className="form__title">{title}</h2>
                <fieldset className="form__fieldset">
                    {handleErrorsChildren}
                    <button type="submit"
                            className={`form__button-submit ${!isValid ? 'form__button-submit_disabled' : ''}`}
                            disabled={!isValid}
                    >{buttonText}
                    </button>
                </fieldset>
            </form>
        </Modal>
    );
}