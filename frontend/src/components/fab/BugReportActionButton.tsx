import { AiFillBug } from 'react-icons/ai'
import { FabButtonWithLabel } from './FabButtonWithLabel'

export const BugReportActionButton = () => {
  const url = 'https://forms.gle/8HsSpeQ7UMerAbCa8'
  const onClick = () => {
    window.open(url, '_blank')
  }
  return (
    <FabButtonWithLabel
      label={'Report a Bug'}
      icon={(<AiFillBug size={18}/>)}
      onClick={onClick}/>
  )
}
