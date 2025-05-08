import ModalWithForm from './ModalWithForm.jsx';
import React from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import { updateUserProfile } from '../../utils/auth.js';
import { getToken } from '../../utils/token.js';

export default function EditProfileModal({
  onClose,
  isOpen,
  isLoading,
  setLoading,
  setCurrentUser,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const token = getToken();

  const handleSubmit = (values) => {
    const user = {
      name: values['edit-profile-name'],
      avatar: values['edit-profile-avatar'],
    };
    setLoading(true);
    return updateUserProfile(user, token).then((res) => {
      setCurrentUser(res.data);
    });
  };

  return (
    <ModalWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="edit-profile"
      title="Change profile data"
      buttonText={isLoading ? 'Saving' : 'Save Changes'}
      inputs={1}
      onSubmit={handleSubmit}
      setLoading={setLoading}
      prefillValues={{
        'edit-profile-name': currentUser.name,
        'edit-profile-avatar': currentUser.avatar || '',
      }}
    >
      <label className="form__label">
        <div className="form__label-header">
          Avatar
          <span className="form__error" id="edit-profile-name" />
        </div>
        <input
          type="text"
          className="form__input"
          name="edit-profile-name"
          minLength="2"
          maxLength="30"
          placeholder="Name"
          required
        />
      </label>
      <label className="form__label">
        <div className="form__label-header">
          Avatar
          <span className="form__error" id="edit-profile-avatar" />
        </div>
        <input
          type="url"
          className="form__input"
          name="edit-profile-avatar"
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
}
