import Modal from "../Modal/Modal.jsx";

export default function ItemModal({ item, onClose, isOpen }) {
    return (
        <Modal onClose={onClose} isOpen={isOpen} name={"item"}>
            <img className="item-modal__card-img" src={new URL(item.link, import.meta.url).href} alt={item.name}/>
            <h2 className="item-modal__card-text item-modal__card-text_name">{item.name}</h2>
            <p className="item-modal__card-text item-modal__card-text_filter">Weather: {item.weather}</p>
        </Modal>
    )
}