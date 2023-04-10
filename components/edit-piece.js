import { useState, useCallback } from 'react'
import FeedbackPopup from './feedback-popup'

export default function EditPiece() {
    const [isOpen, setIsOpen] = useState(false)

    const handleIsOpen = useCallback((event) => {
        setIsOpen(false);
        
      }, [isOpen]);

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Request Edit
                </button>
            </div>

            <FeedbackPopup isOpen={isOpen} handleIsOpen={handleIsOpen} />
        </>
    )
}
