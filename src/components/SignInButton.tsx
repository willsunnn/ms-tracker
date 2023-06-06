import React from "react"
import SignInFormComponent from "./SignInFormComponent";
import { AlertCallback } from "./AlertComponent";

type SignInButtonProps = {
    alertCallback: AlertCallback
}

const SignInButton = (props: SignInButtonProps) => {
    const { alertCallback } = props
    const dialogRef = React.createRef<HTMLDialogElement>();

    const openSignInModal = () => {
        dialogRef.current?.showModal();
    }

    return (
        <div>
            {/* This button opens the signin/signup modal */}
            <button className="btn btn-primary" onClick={openSignInModal}>SIGN IN / CREATE ACCOUNT</button>
            <dialog ref={dialogRef} className="modal">
                {/* This allows us to close the modal by clicking out */}
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
                <form method="dialog" className="modal-box">
                    {/* This Button allows us to close the modal by clicking the x */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    {/* This is the body of the modal */}
                    <SignInFormComponent alertCallback={alertCallback}/>
                </form>
            </dialog>
        </div>
    );
}

export default SignInButton;