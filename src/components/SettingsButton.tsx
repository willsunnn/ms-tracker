import { useState } from 'react';
import { MdSettings } from 'react-icons/md';
import SettingsDialog from './SettingsDialog';

export const SettingsButton = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const openSettingsDialog = () => {
        setDialogIsOpen(true);
    }

    const closeSettingsDialog = () => {
        setDialogIsOpen(false);
    }

    return (
        <>
            {/* This button opens the Settings dialog modal */}
            <button className="btn btn-circle text-xl" onClick={openSettingsDialog}>
                <MdSettings className="w-max"/>
            </button>
            <SettingsDialog open={dialogIsOpen} closeDialog={closeSettingsDialog}/>
        </>
    );
}