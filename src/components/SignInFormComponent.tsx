import React from "react";
import { Persistence } from '../persistence/firebase';

const SignInFormComponent = () => {
    const [isOnAccountCreation, setIsOnAccountCreation] = React.useState<boolean>(false);
    const [emailEntryText, setEmailEntryText] = React.useState<string>("");
    const [pwEntryText, setPwEntryText] = React.useState<string>("");
    const [pwConfirmText, setPwConfirmText] = React.useState<string>("");

    const [emailEntryError, setEmailEntryError] = React.useState<string|null>(null);
    const [pwEntryError, setPwEntryError] = React.useState<string|null>(null);
    const [pwConfirmError, setPwConfirmError] = React.useState<string|null>(null);

    const createUser = () => {
        const emailIsBlank = emailEntryText.length === 0;
        const pwIsBlank = pwEntryText.length === 0;
        const pwDoNotMatch = pwEntryText !== pwConfirmText;
        const hasError = emailIsBlank || pwIsBlank || pwDoNotMatch

        setEmailEntryError(emailIsBlank? "Email cannot be blank" : null);
        setPwEntryError(pwIsBlank? "Password cannot be blank" : null);
        setPwConfirmError(pwDoNotMatch? "Passwors do not match" : null);

        if (!hasError) {
            Persistence.createUser(emailEntryText, pwEntryText).catch((error) => {
                alert(error);
            });
        }
    }
    const signIn = () => {
        const emailIsBlank = emailEntryText.length === 0;
        const pwIsBlank = pwEntryText.length === 0;
        const hasError = emailIsBlank || pwIsBlank

        setEmailEntryError(emailIsBlank? "Email cannot be blank" : null);
        setPwEntryError(pwIsBlank? "Password cannot be blank" : null);

        if (!hasError) {
            Persistence.signInUser(emailEntryText, pwEntryText).catch((error) => {
                console.log(error);
            });
        }
    }
    const nextOnClick = () => {
        if (isOnAccountCreation) {
            createUser();
        } else {
            signIn();
        }
    }
    const signInWithGoogle = () => {
        Persistence.signInWithGoogle().catch((error) => {
            alert(error)
        });
    }
    const forgotPasswordOnClick = () => {
        alert("this feature has not been implemented");
    }
    const toggleIsOnAccountCreation = () => {
        setIsOnAccountCreation(!isOnAccountCreation);
    }

    return (
        <div className="flex flex-col w-full border-opacity-50 pt-5">
                {/* Regular Sign in Section*/}
                <div className="grid card bg-base-300 rounded-box place-items-center py-5 mx-3">
                    <h3 className="font-semibold text-2xl w-full max-w-xs px-3 pt-5 pb-3">{(isOnAccountCreation) ? 'Create Account' : 'Sign In'}</h3>
                    {/* Email Entry */}
                    <div className="form-control w-full max-w-xs p-3">
                        <input type="text" placeholder="Email Address" className={`input input-bordered w-full max-w-xs ${emailEntryError!=null ? " input-error":""}`}
                            value={emailEntryText}
                            onChange={(event) => {
                                setEmailEntryText(event.target.value)
                            }} />
                        <label className="label -m-1">
                            <span></span>
                            <span className="text-xs text-error" onClick={nextOnClick}>{emailEntryError != null? emailEntryError : ""}</span>
                        </label>
                    </div>

                    {/* Password Entry */}
                    <div className="form-control w-full max-w-xs p-3">
                        <input type="password" placeholder="Password" className={`input input-bordered w-full max-w-xs ${pwEntryError!=null ? " input-error":""}`}
                            value={pwEntryText}
                            onChange={(event) => {
                                setPwEntryText(event.target.value)
                            }} />
                            <label className="label -m-1">
                                <span className="link link-primary link-hover text-xs" onClick={forgotPasswordOnClick}>{(!isOnAccountCreation)? "Forgot password?" : ""}</span>
                                <span className="text-xs text-error">{pwEntryError != null? pwEntryError : ""}</span>
                            </label>
                    </div>

                    {/* Password Confirmation */}
                    {
                        isOnAccountCreation && (
                            <div className="collapse form-control w-full max-w-xs p-3 error">
                                <input type="password" placeholder="Confirm Password" className={`input input-bordered w-full max-w-xs ${pwConfirmError!=null ? " input-error":""}`}
                                    value={pwConfirmText}
                                    onChange={(event) => {
                                        setPwConfirmText(event.target.value)
                                    }} />
                                <label className="label -m-1">
                                    <span></span>
                                    <span className="text-xs text-error" onClick={nextOnClick}>{pwConfirmError != null? pwConfirmError : ""}</span>
                                </label>
                            </div>
                        )
                    }

                    {/* Create Account/Sign In Toggle and Submit Button*/}
                    <div className="flex items-center w-full max-w-xs pb-5 pt-3 px-3">
                        <span className="link link-primary link-hover text-xs" onClick={toggleIsOnAccountCreation}>{(isOnAccountCreation) ? 'Already have an account? Sign in instead' : 'Don\'t have an account? Create one instead'}</span>
                        <button className="btn btn-primary btn-sm ml-auto" onClick={nextOnClick}>Next</button>
                    </div>

                </div>

                <div className="divider mx-3">OR</div>

                {/* Show signInWithGoogle */}
                <button className="btn btn-primary mx-3 mb-2" onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
    )
}

export default SignInFormComponent;