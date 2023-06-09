import { useState } from "react";
import defaultUserIcon from '../resources/default-user-icon.jpg';
import SettingsDialog from "./SettingsDialog";
import { useAuth } from "../contexts/AuthContext";

const UserIcon = () => {
    const { user, signOut } = useAuth();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const openSettingsDialog = () => {
        setDialogIsOpen(true);
    }

    const closeSettingsDialog = () => {
        setDialogIsOpen(false);
    }

    const photoUrl = user?.photoURL == null? defaultUserIcon : user.photoURL;
    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src={photoUrl} />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box min-w-36">
                    { user?.displayName && (<li className="px-3 py-1">{user.displayName}</li>)}
                    { user?.email && (<li className="px-3 py-1">{user.email}</li>)}
                    <li onClick={openSettingsDialog}><a>Settings</a></li>
                    <li onClick={signOut}><a>Logout</a></li>
                </ul>
            </div>
            <SettingsDialog open={dialogIsOpen} closeDialog={closeSettingsDialog}/>
        </>
    );
}

export default UserIcon;