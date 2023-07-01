import React from 'react'
import UserIcon from './UserIcon'
import { SettingsButton } from './SettingsButton'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ExternalLinksButton } from './ExternalLinksButton'

const NavBar = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const openAppUriHandler = (destination: string) => {
    return () => {
      navigate(destination)
    }
  }

  return (
    <div className="navbar bg-base-200 shadow-md rounded-3xl">
      <div className="navbar-start">
        <ExternalLinksButton/>
        { user &&
          <ul className="menu menu-horizontal px-1">
            <li><a onClick={openAppUriHandler('characters')}>Characters</a></li>
            <li><a onClick={openAppUriHandler('todo')}>To-Do</a></li>
            <li><a onClick={openAppUriHandler('overview')}>Overview</a></li>
          </ul>
        }
      </div>
      <div className="navbar-center">
      </div>
      <div className="navbar-end">
        { !user && <SettingsButton/>}
        { user && <UserIcon/>}
      </div>
    </div>
  )
}

export default NavBar
