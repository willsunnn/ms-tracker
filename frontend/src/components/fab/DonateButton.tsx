import { FaPaypal } from 'react-icons/fa6'
import { FabButtonWithLabel } from './FabButtonWithLabel'

export const DonateButton = () => {
  const url = 'https://www.paypal.com/donate/?business=UP9LJYRQEJYDC&no_recurring=0&currency_code=USD'
  const onClick = () => {
    window.open(url, '_blank')
  }
  return (
    <FabButtonWithLabel
      label={'Buy me a coffee'}
      icon={(<FaPaypal size={18}/>)}
      onClick={onClick}/>
  )
}
