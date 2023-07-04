import { useDialogContext } from '../../contexts/DialogContext'
import { AddCharacterComponent } from '../dialog/AddCharacterDialog'
import { AiOutlinePlus } from 'react-icons/ai'
import { FabButtonWithLabel } from './FabButtonWithLabel'

export const AddCharacterButton = () => {
  const { openDialog } = useDialogContext()
  const onClick = () => {
    openDialog((<AddCharacterComponent/>))
  }
  return (
    <FabButtonWithLabel
      label={'Add Character'}
      icon={(<AiOutlinePlus size={18}/>)}
      onClick={onClick}/>
  )
}
