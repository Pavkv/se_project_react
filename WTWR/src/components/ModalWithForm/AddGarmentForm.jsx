import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddGarmentForm({onClose, isOpen}) {
    return (
        <ModalWithForm onClose={onClose} isOpen={isOpen} name="add-garment" title="Add Garment"
                       buttonText="Add garment" inputs={3} onSubmit={(values) => console.log(values)}>
            <label className="form__label">
                <div className="form__label-header">
                    Name
                    <span className="form__error" id="new-garment-name"/>
                </div>
                <input
                    type="text"
                    className="form__input"
                    name="new-garment-name"
                    placeholder="Name"
                    minLength="2"
                    maxLength="30"
                    required
                />
            </label>
            <label className="form__label">
                <div className="form__label-header">
                    Image
                    <span className="form__error" id="new-garment-image-url"/>
                </div>
                <input
                    type="url"
                    className="form__input"
                    name="new-garment-image-url"
                    placeholder="Image URL"
                    required
                />
            </label>
            <label className="form__label form__label_radio">
                Select the weather type:

                <label className="form__radio-label">
                    <input
                        type="radio"
                        name="new-garment-weather-type"
                        value="Hot"
                        className="form__radio-input"
                        required
                    />
                    Hot
                </label>

                <label className="form__radio-label">
                    <input
                        type="radio"
                        name="new-garment-weather-type"
                        value="Warm"
                        className="form__radio-input"
                        required
                    />
                    Warm
                </label>

                <label className="form__radio-label">
                    <input
                        type="radio"
                        name="new-garment-weather-type"
                        value="Cold"
                        className="form__radio-input"
                        required
                    />
                    Cold
                </label>
            </label>
        </ModalWithForm>
    );
}