import React from "react";
import * as Auth from 'firebase/auth';
import { Persistence } from '../persistence/firebase';
import defaultUserIcon from '../resources/default-user-icon.jpg';

type UserIconProps = {
    user: Auth.User
}

const UserIcon = (props: UserIconProps) => {
    const {user} = props;
    const photoUrl = user.photoURL == null? defaultUserIcon : user.photoURL;

    const logout = () => {
        Persistence.signOut();
    }

    return (
        <div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img src={photoUrl} />
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box w-52">
                    <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li onClick={logout}><a>Logout</a></li>
                </ul>
            </div>
        </div>
    );
}

export default UserIcon;