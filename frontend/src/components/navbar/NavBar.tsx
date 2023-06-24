import React from 'react'
import UserIcon from './UserIcon'
import { SettingsButton } from './SettingsButton'
import { useAuth } from '../../contexts/AuthContext'

const NavBar = () => {
  const { user } = useAuth()
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
      </div>
      <div className="navbar-center">
        <a className="normal-case text-xl">MS-tracker</a>
      </div>
      <div className="navbar-end">
        { !user && <SettingsButton/>}
        { user && <UserIcon/>}
      </div>
    </div>
  )
}

export default NavBar
