import Modal from '../Modal/Modal.jsx';
import React, { useEffect } from 'react';
import { useFormAndValidation } from '../../utils/useFormAndValidation.js';

export default function ModalWithForm({
  onOpen,
  onClose,
  title,
  name,
  buttonText,
  isOpen,
  children,
  onSubmit,
  inputs,
  setLoading,
  redirectText,
  prefillValues,
}) {
  const {
    values,
    setValues,
    handleChange,
    handleSubmit,
    errors,
    isValid,
    setIsValid,
  } = useFormAndValidation({
    onSubmit,
    onClose,
    setLoading,
  });

  useEffect(() => {
    if (prefillValues) {
      setValues(prefillValues);
    }
  }, []);

  useEffect(() => {
    if (values && Object.keys(values).length === inputs) {
      setIsValid(true);
    }
  }, [values]);

  const handleErrorsChildren = React.Children.map(children, (child) => {
    if (child.type === 'label' && child.props.children) {
      return React.cloneElement(child, {
        children: React.Children.map(child.props.children, (field) => {
          if (field?.type === 'input' || field?.type === 'select') {
            return React.cloneElement(field, {
              onChange: handleChange,
              value: values[field.props.name] || '',
              className: `form__input ${errors[field.props.name] ? 'form__input_type_error' : ''}`,
            });
          }
          if (field?.type === 'div') {
            const errorField = React.Children.map(
              field.props.children,
              (child) => {
                if (child?.type === 'span') {
                  const errorText = errors[child.props.id] || '';
                  return React.cloneElement(child, {
                    children: errorText ? `(${errorText})` : '',
                    className: `form__error ${errorText ? 'form__error_visible' : ''}`,
                  });
                }
                return child;
              }
            );
            return React.cloneElement(field, {
              children: errorField,
            });
          }
          return field;
        }),
      });
    }
    return child;
  });

  const handleRedirect = () => {
    onClose();
    if (redirectText === 'or Register') {
      onOpen('sign-up');
    } else if (redirectText === 'or Log in') {
      onOpen('log-in');
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} name={name}>
      <form
        className="form"
        name={name}
        onChange={handleChange}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="form__title">{title}</h2>
        <fieldset className="form__fieldset">
          {handleErrorsChildren}
          <div className="form__buttons">
            <button
              type="submit"
              className={`form__button-submit ${!isValid ? 'form__button-submit_disabled' : ''}`}
              disabled={!isValid}
            >
              {buttonText}
            </button>
            <button
              type="button"
              className={`form__button-redirect${!redirectText ? '_disabled' : ''}`}
              onClick={handleRedirect}
            >
              {redirectText}
            </button>
          </div>
        </fieldset>
      </form>
    </Modal>
  );
}
