import ModalWithForm from "./ModalWithForm.jsx";
import {getCurrentUser, signIn, signUp} from "../../utils/auth.js";
import {useNavigate} from "react-router-dom";
import {setToken} from "../../utils/token.js";

export default function SignUpModal({onOpen, onClose, isOpen, isLoading, setLoading, setCurrentUser, setLoggedIn}) {
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        const newUser = {
            email: values['sign-up-email'],
            password: values['sign-up-password'],
            name: values['sign-up-name'],
            avatar: values['sign-up-avatar']
        };
        setLoading(true);
        return signUp(newUser)
            .then(() => signIn({email: newUser.email, password: newUser.password}))
            .then(user => {
                if (user.token) {
                    setToken(user.token);
                    return getCurrentUser(user.token);
                }
            }).then(user => {
                setCurrentUser(user.data);
                setLoggedIn(true);
                navigate('/profile');
            });
    };

    return (
        <ModalWithForm onOpen={onOpen} onClose={onClose} isOpen={isOpen} name="sign-up" title="Sign up"
                       buttonText={isLoading ? "Creating an account" : "Next"} inputs={2} onSubmit={handleSubmit}
                       setLoading={setLoading} redirectText={'or Log in'}>
            <label className="form__label">
                <div className="form__label-header">
                    Email
                    <span className="form__error" id="sign-up-email"/>
                </div>
                <input
                    type="email"
                    className="form__input"
                    name="sign-up-email"
                    placeholder="Email"
                    required
                />
            </label>
            <label className="form__label">
                <div className="form__label-header">
                    Password
                    <span className="form__error" id="sign-up-password"/>
                </div>
                <input
                    type="password"
                    className="form__input"
                    name="sign-up-password"
                    placeholder="Password"
                    minLength="2"
                    maxLength="30"
                    required
                />
            </label>
            <label className="form__label">
                <div className="form__label-header">
                    Name
                    <span className="form__error" id="sign-up-name"/>
                </div>
                <input
                    type="text"
                    className="form__input"
                    name="sign-up-name"
                    placeholder="Name"
                    minLength="2"
                    maxLength="30"
                    required
                />
            </label>
            <label className="form__label">
                <div className="form__label-header">
                    Avatar
                    <span className="form__error" id="sign-up-avatar"/>
                </div>
                <input
                    type="url"
                    className="form__input"
                    name="sign-up-avatar"
                    placeholder="Avatar URL"
                />
            </label>
        </ModalWithForm>
    );
}