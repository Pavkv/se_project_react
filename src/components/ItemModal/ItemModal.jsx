import Modal from "../Modal/Modal.jsx";
import {CurrentUserContext} from "../../context/CurrentUserContext.js";
import React from "react";

export default function ItemModal({ item, onClose, isOpen, onDeleteClick }) {
    const {currentUser} = React.useContext(CurrentUserContext);
    return (
        <Modal onClose={onClose} isOpen={isOpen} name={"item"}>
            <img className="item-modal__card-img" src={new URL(item.imageUrl, import.meta.url).href} alt={item.name}/>
            <div className="item-modal__card-content">
                <h2 className="modal__text item-modal__card-text_name">{item.name}</h2>
                <button
                    className={`modal__text item-modal_card-text-delete-btn${!item.owner || currentUser._id !== item.owner._id ? '_disabled' : ''}`}
                    type="button"
                    onClick={onDeleteClick}
                >Delete item</button>
                <p className="modal__text item-modal__card-text_filter">Weather: {item.weather}</p>
            </div>
        </Modal>
    )
}