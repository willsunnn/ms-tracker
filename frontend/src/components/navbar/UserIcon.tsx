import React from 'react'
import defaultUserIcon from '../../resources/default-user-icon.jpg'
import { useAuth } from '../../contexts/AuthContext'
import { useDialogContext } from '../../contexts/DialogContext'
import { SettingsComponent } from './SettingsButton'

const UserIcon = () => {
  const { user, signOut } = useAuth()

  const { openDialog } = useDialogContext()
  const openSettingsDialog = () => {
    openDialog((<SettingsComponent/>))
  }

  const signOutClicked = () => {
    signOut().catch(alert)
  }

  const photoUrl = user?.photoURL == null ? defaultUserIcon : user.photoURL
  const displayName = user?.displayName
  const email = user?.email
  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={photoUrl} />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content rounded-box min-w-36 bg-base-200 z-[100]">
          { displayName && (<li className="px-3 py-1">{displayName}</li>)}
          { email && (<li className="px-3 py-1">{email}</li>)}
          <li onClick={openSettingsDialog}><a>Settings</a></li>
          <li onClick={signOutClicked}><a>Logout</a></li>
        </ul>
      </div>
    </>
  )
}

export default UserIcon
