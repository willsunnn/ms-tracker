import React from 'react'
import { FirebaseError } from 'firebase/app'
import { BsGoogle } from 'react-icons/bs'
import { useAlertCallback } from '../contexts/AlertContext'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

type FormFunction = 'signIn' | 'signUp' | 'resetPassword'

export const SignInFormComponent = () => {
  const { user, signIn, signUp, signInWithGoogle, forgotPassword } = useAuth()
  const alert = useAlertCallback()

  const [formState, setFormState] = React.useState<FormFunction>('signIn')
  const [emailEntryText, setEmailEntryText] = React.useState<string>('')
  const [pwEntryText, setPwEntryText] = React.useState<string>('')
  const [pwConfirmText, setPwConfirmText] = React.useState<string>('')

  const [emailEntryError, setEmailEntryError] = React.useState<string | null>(null)
  const [pwEntryError, setPwEntryError] = React.useState<string | null>(null)
  const [pwConfirmError, setPwConfirmError] = React.useState<string | null>(null)

  if (user) {
    return (<Navigate to="/characters" replace={true} />)
  }

  const handleError = (error: any) => {
    let errMessage
    if (error instanceof FirebaseError) {
      errMessage = error.code
    } else {
      errMessage = error
    }
    const operation = (formState === 'signIn')
      ? 'sign in'
      : (formState === 'signUp')
        ? 'sign up'
        : 'reset password'
    alert({
      text: `Failed to ${operation}: ${JSON.stringify(errMessage)}`,
      alertLevel: 'error'
    })
  }

  const validateAndSignUp = () => {
    const emailIsBlank = emailEntryText.length === 0
    const pwIsBlank = pwEntryText.length === 0
    const pwDoNotMatch = pwEntryText !== pwConfirmText
    const hasError = emailIsBlank || pwIsBlank || pwDoNotMatch

    setEmailEntryError(emailIsBlank ? 'Email cannot be blank' : null)
    setPwEntryError(pwIsBlank ? 'Password cannot be blank' : null)
    setPwConfirmError(pwDoNotMatch ? 'Passwords do not match' : null)

    if (!hasError) {
      signUp(emailEntryText, pwEntryText).catch(handleError)
    }
  }

  const validateAndSignIn = () => {
    const emailIsBlank = emailEntryText.length === 0
    const pwIsBlank = pwEntryText.length === 0
    const hasError = emailIsBlank || pwIsBlank

    setEmailEntryError(emailIsBlank ? 'Email cannot be blank' : null)
    setPwEntryError(pwIsBlank ? 'Password cannot be blank' : null)

    if (!hasError) {
      signIn(emailEntryText, pwEntryText).catch(handleError)
    }
  }

  const validateAndResetPassword = () => {
    const emailIsBlank = emailEntryText.length === 0
    setEmailEntryError(emailIsBlank ? 'Email cannot be blank' : null)

    if (!emailIsBlank) {
      forgotPassword(emailEntryText).catch(handleError).then(() => {
        alert({
          text: `email sent to ${emailEntryText}`,
          alertLevel: 'success'
        })
        setFormState('signIn')
      }).catch(alert)
    }
  }

  const nextOnClick = () => {
    const submitFunc = (formState === 'signIn')
      ? validateAndSignIn
      : (formState === 'signUp')
        ? validateAndSignUp
        : validateAndResetPassword
    submitFunc()
  }

  const signInWithGoogleWithErrorHandler = () => {
    signInWithGoogle().catch(handleError)
  }

  const forgotPasswordOnClick = () => {
    setFormState('resetPassword')
  }

  const handleEnterPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      nextOnClick()
    }
  }

  const formTitle = (formState === 'signIn')
    ? 'Sign In'
    : (formState === 'signUp')
      ? 'Sign Up'
      : 'Reset Password'
  const toggleFormFuncText = (formState === 'signIn')
    ? 'Don\'t have an account? Create one instead'
    : (formState === 'signUp')
      ? 'Already have an account? Sign in instead'
      : 'Return to sign in'
  const toggleFormFunc = () => {
    setFormState((formState === 'signIn')
      ? 'signUp'
      : (formState === 'signUp')
        ? 'signIn'
        : 'signIn')
  }

  return (
    <div className="card w-96 bg-base-200 p-5">
      {/* Regular Sign in Section */}
      <div className="grid card bg-base-300 rounded-box place-items-center">
        <h3 className="font-semibold text-2xl w-full max-w-xs px-3 pt-5 pb-3">{formTitle}</h3>
        {/* Email Entry */}
        <div className="form-control w-full max-w-xs p-3">
          <input type="text" placeholder="Email Address" className={`input input-bordered w-full max-w-xs ${emailEntryError ? ' input-error' : ''}`}
            value={emailEntryText}
            onChange={(event) => {
              setEmailEntryText(event.target.value)
            }}
            onKeyDown={handleEnterPressed} />
          <label className="label -m-1">
            <span></span>
            <span className="text-xs text-error">{emailEntryError ?? ''}</span>
          </label>
        </div>

        {/* Password Entry */}
        {
          formState !== 'resetPassword' && (
            <div className="form-control w-full max-w-xs p-3">
              <input type="password" placeholder="Password" className={`input input-bordered w-full max-w-xs ${pwEntryError ? ' input-error' : ''}`}
                value={pwEntryText}
                onChange={(event) => {
                  setPwEntryText(event.target.value)
                }}
                onKeyDown={handleEnterPressed} />
              <label className="label -m-1">
                <span className='link link-primary link-hover text-xs' onClick={forgotPasswordOnClick}>{(formState === 'signIn' ? 'Forgot password?' : '')}</span>
                <span className="text-xs text-error">{pwEntryError ?? ''}</span>
              </label>
            </div>
          )
        }

        {/* Password Confirmation */}
        {
          formState === 'signUp' && (
            <div className="collapse form-control w-full max-w-xs p-3 error">
              <input type="password" placeholder="Confirm Password" className={`input input-bordered w-full max-w-xs ${pwConfirmError ? ' input-error' : ''}`}
                value={pwConfirmText}
                onChange={(event) => {
                  setPwConfirmText(event.target.value)
                }}
                onKeyDown={handleEnterPressed} />
              <label className="label -m-1">
                <span></span>
                <span className="text-xs text-error">{pwConfirmError ?? ''}</span>
              </label>
            </div>
          )
        }

        {/* Create Account/Sign In Toggle and Submit Button */}
        <div className="flex items-center w-full max-w-xs pb-5 pt-3 px-3">
          <span className="link link-primary link-hover text-xs" onClick={toggleFormFunc}>{toggleFormFuncText}</span>
          <span className="btn btn-primary btn-sm ml-auto" onClick={nextOnClick}>Next</span>
        </div>

      </div>

      <div className="divider mx-3">OR</div>

      {/* Show signInWithGoogle */}
      <button className="btn btn-primary" onClick={signInWithGoogleWithErrorHandler}>
        <BsGoogle/>
                Sign in with Google
      </button>
    </div>
  )
}

export const SignInPage = () => {
  return (<div className="flex items-center justify-center h-full">
    <SignInFormComponent/>
  </div>)
}
