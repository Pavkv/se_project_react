import ModalWithForm from "./ModalWithForm.jsx";
import {getToken} from "../../utils/token.js";

export default function AddItemModal({onClose, isOpen, addItem, clothingItems, setClothingItems, isLoading, setLoading}) {
    const handleSubmit = (values) => {
        const newGarment = {
            _id: clothingItems[0]._id + 1,
            name: values['new-garment-name'],
            imageUrl: values['new-garment-image-url'],
            weather: values['new-garment-weather-type'].toLowerCase()
        };
        setLoading(true);
        return addItem(newGarment, getToken()).then((updatedList) => setClothingItems(updatedList));
    };

    return (
        <ModalWithForm onClose={onClose} isOpen={isOpen} name="add-garment" title="Add Garment"
                       buttonText={isLoading ? "Adding" : "Add garment"} inputs={3} onSubmit={handleSubmit} setLoading={setLoading}>
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