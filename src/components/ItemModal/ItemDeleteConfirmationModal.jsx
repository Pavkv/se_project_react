import Modal from "../Modal/Modal.jsx";

export default function ItemDeleteConfirmationModal({onClose, isOpen, onClick, isLoading}) {
    return (
        <Modal onClose={onClose} isOpen={isOpen} name={"item-delete-confirmation"}>
            <div className="item-delete-confirmation-modal">
                <p className="modal__text item-delete-confirmation-modal__text">Are you sure you want to delete this
                    item?</p>
                <p className="modal__text item-delete-confirmation-modal__text">This action is irreversible.</p>
                <button
                    className="modal__text item-delete-confirmation-modal__button item-delete-confirmation-modal__button_confirm"
                    type="button" onClick={onClick}>{isLoading ? "Loading..." : "Yes, delete item"}
                </button>
                <button
                    className="modal__text item-delete-confirmation-modal__button item-delete-confirmation-modal__button_cancel"
                    type="button"
                    onClick={onClose}>Cancel
                </button>
            </div>
        </Modal>
    )
}