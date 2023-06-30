import { FaBars } from 'react-icons/fa6'
import CurrentExternalLinks from './external-links.json'

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
  return (
    <li>
      <details open={linkGroup.isOpenByDefault}>
        <summary><a>{linkGroup.name}</a></summary>
        <ul>
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
      </details>
    </li>
  )
}

export const ExternalLinksButton = () => {
  return (
    <div className="dropdown">
      <button className="btn btn-circle text-xl bg-base-200">
        <FaBars className="w-max"/>
      </button>
      <div className="dropdown-content top-16">
        <ul tabIndex={0} className="menu bg-base-200 rounded-box w-96 min-w-fit shadow-lg">
          {links.map((linkGroup) => (
            <GroupedLinks key={`linkgroup-${linkGroup.name}`} linkGroup={linkGroup}/>
          ))}
        </ul>
      </div>
    </div>
  )
}
