import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';

const ResultModal= forwardRef(function ResultModal({newGame}, ref) {
    const dialog =useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return createPortal( //Output dialog någon annanstans i trädet, i det här fallet i diven "modal" som finns i index.html
    <dialog ref={dialog} className="result-modal" onClose={newGame}>
        <p>Du vann!</p>
        <form method="dialog" onSubmit={newGame}>
            <button>New Game</button>
        </form>
    </dialog>, 
    document.getElementById('modal')
    );
})

export default ResultModal;