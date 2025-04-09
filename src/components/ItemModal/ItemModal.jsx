import Modal from "../Modal/Modal.jsx";

export default function ItemModal({ item, onClose, isOpen, onDeleteClick }) {
    return (
        <Modal onClose={onClose} isOpen={isOpen} name={"item"}>
            <img className="item-modal__card-img" src={new URL(item.imageUrl, import.meta.url).href} alt={item.name}/>
            <div className="item-modal__card-content">
                <h2 className="modal__text item-modal__card-text_name">{item.name}</h2>
                <button className="modal__text item-modal_card-text-delete-btn" type="button" onClick={onDeleteClick}>Delete item</button>
                <p className="modal__text item-modal__card-text_filter">Weather: {item.weather}</p>
            </div>
        </Modal>
    )
}