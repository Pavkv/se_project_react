import {useEffect} from 'react';

export default function Modal({ isOpen, onClose, children, name }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`modal modal_type_${name} ${isOpen ? 'modal_visible' : ''}`}>
            <div className="modal__overlay" onClick={onClose} >
                <div className="modal__container" onClick={e => e.stopPropagation()}>
                    { children }
                    <button
                        type="button"
                        className="modal__close-btn"
                        onClick={onClose}
                    ></button>
                </div>
            </div>
        </div>
    );
}