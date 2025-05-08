import ModalWithForm from './ModalWithForm.jsx';
import { getCurrentUser, signIn } from '../../utils/auth.js';
import { setToken } from '../../utils/token.js';
import { useNavigate } from 'react-router-dom';

export default function SignInModal({
  onOpen,
  onClose,
  isOpen,
  isLoading,
  setLoading,
  setCurrentUser,
  setLoggedIn,
}) {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    const userData = {
      email: values['sign-in-email'],
      password: values['sign-in-password'],
    };
    setLoading(true);
    return signIn(userData)
      .then((user) => {
        if (user.token) {
          setToken(user.token);
          return getCurrentUser(user.token);
        }
      })
      .then((user) => {
        setCurrentUser(user.data);
        setLoggedIn(true);
        navigate('/profile');
      });
  };

  return (
    <ModalWithForm
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
      name="sign-in"
      title="Log in"
      buttonText={isLoading ? 'Logging in' : 'Log in'}
      inputs={2}
      onSubmit={handleSubmit}
      setLoading={setLoading}
      redirectText={'or Register'}
    >
      <label className="form__label">
        <div className="form__label-header">
          Name
          <span className="form__error" id="sign-in-email" />
        </div>
        <input
          type="email"
          className="form__input"
          name="sign-in-email"
          placeholder="Email"
          required
        />
      </label>
      <label className="form__label">
        <div className="form__label-header">
          Password
          <span className="form__error" id="sign-in-password" />
        </div>
        <input
          type="password"
          className="form__input"
          name="sign-in-password"
          placeholder="Password"
          minLength="2"
          maxLength="30"
          required
        />
      </label>
    </ModalWithForm>
  );
}
