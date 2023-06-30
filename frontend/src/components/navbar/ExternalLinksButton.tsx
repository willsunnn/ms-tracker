import { FaBars } from 'react-icons/fa6'
import CurrentExternalLinks from './external-links.json'
import React from 'react'

interface ExternalLink {
  name: string
  url: string
}

interface ExternalLinkGroup {
  name: string
  isOpenByDefault: boolean
  links: ExternalLink[]
}

const links: ExternalLinkGroup[] = CurrentExternalLinks

const GroupedLinks = (props: { linkGroup: ExternalLinkGroup }) => {
  const { linkGroup } = props
  const [isOpen, setOpen] = React.useState<boolean>(linkGroup.isOpenByDefault)

  const onToggle = () => {
    setOpen(!isOpen)
  }

  return (
    <div className="collapse collapse-arrow px-2 py-1">
      <input className="min-h-fit" type="checkbox" checked={isOpen} onChange={onToggle}/>
      <div className="min-h-fit collapse-title text-m font-bold p-0">
        {linkGroup.name}
      </div>
      <ul className="pt-1 !pb-1 px-0 mx-0 mb-0 collapse-content flex-row">
        {
          linkGroup.links.map((link) => {
              return (
              <li key={`link-${linkGroup.name}-${link.name}`}>
                  <a className="link" href={link.url} target="_blank" rel="noreferrer noopener">
                  {link.name}
                  </a>
              </li>)
          })
        }
      </ul>
    </div>
  )
}

export const ExternalLinksButton = () => {
  return (
    <div className="dropdown">
      <button className="btn btn-circle text-xl">
        <FaBars className="w-max"/>
      </button>
      <ul tabIndex={0} className="mt-3 p-3 menu menu-sm disabled dropdown-content rounded-box min-w-36 bg-base-300 z-[100]">
        {
          links.map((linkGroup) => (
            <GroupedLinks key={`linkgroup-${linkGroup.name}`} linkGroup={linkGroup}/>
          ))
        }
      </ul>
    </div>
  )
}
