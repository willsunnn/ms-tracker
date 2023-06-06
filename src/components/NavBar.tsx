import SignInButton from "./SignInButton";
import * as Auth from 'firebase/auth'
import UserIcon from "./UserIcon";
import { AlertCallback } from "./AlertComponent";

type NavBarProps = {
    user: Auth.User|null
    alertCallback: AlertCallback
}

const NavBar = (props: NavBarProps) => {
    const { user, alertCallback } = props;
    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Homepage</a></li>
                        <li><a>Portfolio</a></li>
                        <li><a>About</a></li>
                    </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="navbar-end">
                    {!user && (<div className='mx-3'>
                        <SignInButton alertCallback={alertCallback}/>
                    </div>)}
                    {user && (<div className='mx-3'>
                        <UserIcon user={user}/>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default NavBar;