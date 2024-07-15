import { FabButtonWithLabel } from './FabButtonWithLabel'
import { FaGithub } from 'react-icons/fa'

export const GithubActionButton = () => {
  const url = 'https://github.com/willsunnn/ms-tracker'
  const onClick = () => {
    window.open(url, '_blank')
  }
  return (
    <FabButtonWithLabel
      label={'Check out the Code'}
      icon={(<FaGithub size={18}/>)}
      onClick={onClick}/>
  )
}
