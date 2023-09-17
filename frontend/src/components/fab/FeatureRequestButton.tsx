import { AiOutlinePullRequest } from 'react-icons/ai'
import { FabButtonWithLabel } from './FabButtonWithLabel'

export const FeatureRequestActionButton = () => {
  const url = 'https://forms.gle/T8TAfnjgdtAaVub59'
  const onClick = () => {
    window.open(url, '_blank')
  }
  return (
    <FabButtonWithLabel
      label={'Request a Feature'}
      icon={(<AiOutlinePullRequest size={18}/>)}
      onClick={onClick}/>
  )
}
