import { type CharacterWithMapleGgData } from 'ms-tracker-library'
import { useDialogContext } from '../../contexts/DialogContext'
import { EditCharacterOrderComponent } from '../dialog/EditCharacterOrderDialog'
import { FabButtonWithLabel } from './FabButtonWithLabel'
import { AiFillEdit } from 'react-icons/ai'

export const EditCharacterOrderButton = (props: { characters: CharacterWithMapleGgData[] }) => {
  const { openDialog } = useDialogContext()
  const onClick = () => {
    openDialog((<EditCharacterOrderComponent characters={ props.characters }/>))
  }
  return (
    <FabButtonWithLabel
      label={'Edit Character Order'}
      icon={(<AiFillEdit size={18}/>)}
      onClick={onClick}/>
  )
}
