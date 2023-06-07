import { useState } from "react";
import * as Auth from 'firebase/auth';
import { Persistence } from '../persistence/firebase';
import defaultUserIcon from '../resources/default-user-icon.jpg';
import SettingsDialog from "./SettingsDialog";

type UserIconProps = {
    user: Auth.User
}

const UserIcon = (props: UserIconProps) => {
    const {user} = props;
    const photoUrl = user.photoURL == null? defaultUserIcon : user.photoURL;

    const logout = () => {
        Persistence.signOut();
    }
    
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const openSettingsDialog = () => {
        setDialogIsOpen(true);
    }

    const closeSettingsDialog = () => {
        setDialogIsOpen(false);
    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src={photoUrl} />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box w-36">
                    <li onClick={openSettingsDialog}><a>Settings</a></li>
                    <li onClick={logout}><a>Logout</a></li>
                </ul>
            </div>
            <SettingsDialog open={dialogIsOpen} closeDialog={closeSettingsDialog}/>
        </>
    );
}

export default UserIcon;