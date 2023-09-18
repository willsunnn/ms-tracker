import React from 'react'
import UserIcon from './UserIcon'
import { SettingsButton } from '../dialog/SettingsDialog'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ExternalLinksButton } from './ExternalLinksButton'

const NavItem = (props: { name: string, path: string }) => {
  const navigate = useNavigate()
  const { path, name } = props

  const openAppUriHandler = (destination: string) => {
    return () => {
      navigate(destination)
    }
  }

  const currentPath = window.location.pathname
  const isCurrentPage = currentPath === `/${path}`

  return (<li>
    <a className={`${isCurrentPage ? 'underline font-bold select-none hover:bg-transparent' : ''}`}
      onClick={openAppUriHandler(path)}>
      {name}
    </a>
  </li>)
}

const NavBar = () => {
  const { user } = useAuth()

  const path = window.location.pathname
  const charactersSelected = path === '/characters'

  return (
    <div className="navbar bg-base-200 shadow-md rounded-3xl">
      <div className="navbar-start">
        <ExternalLinksButton/>
        <ul className="menu menu-horizontal px-1">
          { user && (
            <>
            <NavItem path='characters' name='Characters'/>
            <NavItem path='todo' name='To-Do'/>
            <NavItem path='overview' name='Overview'/>
            </>
          )}
          { !user && (
            <>
            <NavItem path='signin' name='Sign In'/>
            </>
          )}
        </ul>
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
