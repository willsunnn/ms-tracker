import { FaBars } from 'react-icons/fa6'
import CurrentExternalLinks from './external-links.json'
import { ExternalLinkWrapper } from '../helper/ExternalLinkWrapper'

interface ExternalLink {
  name: string
  url: string
}

interface ExternalLinkGroup {
  name: string
  isOpenByDefault: boolean
  links: ExternalLink[]
}

type MenuItem = ExternalLink | ExternalLinkGroup

const items: MenuItem[] = CurrentExternalLinks

const Link = (props: { link: ExternalLink }) => {
  const { link } = props
  return (
    <li key={`link-${link.name}`}>
      <ExternalLinkWrapper link={link.url}>
        {link.name}
      </ExternalLinkWrapper>
    </li>
  )
}

const GroupedLinks = (props: { linkGroup: ExternalLinkGroup }) => {
  const { linkGroup } = props
  return (
    <li>
      <details open={linkGroup.isOpenByDefault}>
        <summary><a>{linkGroup.name}</a></summary>
        <ul>
          {
            linkGroup.links.map((link) => (
              <Link key={`link-${linkGroup.name}-${link.name}`} link={link}/>
            ))
          }
        </ul>
      </details>
    </li>
  )
}

export const ExternalLinksButton = () => {
  return (
    <div className="dropdown">
      <button className="btn btn-circle text-xl bg-transparent border-opacity-0">
        <FaBars className="w-max"/>
      </button>
      <ul tabIndex={0} className="menu dropdown-content bg-base-200 rounded-box w-96 min-w-fit shadow-lg z-[100]">
        {items.map((item) => {
          if ('links' in item) {
            return (<GroupedLinks key={`linkgroup-${item.name}`} linkGroup={item as ExternalLinkGroup} />)
          } else {
            return (<Link key={`link-${item.name}`} link={item as ExternalLink}/>)
          }
        })}
      </ul>
    </div>
  )
}
