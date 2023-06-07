import React from 'react';
import { MdSettings } from 'react-icons/md';
import SettingsComponent from './SettingsComponent';

export const SettingsButton = () => {
    const dialogRef = React.createRef<HTMLDialogElement>();

    const openSettingsModal = () => {
        dialogRef.current?.showModal();
    }

    return (
        <div>
            {/* This button opens the signin/signup modal */}
            <button className="btn btn-circle text-xl" onClick={openSettingsModal}>
                <MdSettings className="w-max"/>
            </button>
            <dialog ref={dialogRef} className="modal">
                {/* This allows us to close the modal by clicking out */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
                <form method="dialog" className="modal-box">
                    {/* This Button allows us to close the modal by clicking the x */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    {/* This is the body of the modal */}
                    <SettingsComponent/>
                </form>
            </dialog>
        </div>
    );
}