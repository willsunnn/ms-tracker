import { type CharacterWithMapleGgData } from 'ms-tracker-library'
import { useDialogContext } from '../../contexts/DialogContext'
import { EditCharacterOrderComponent } from '../dialog/EditCharacterOrderDialog'

export const EditCharacterOrderButton = (props: { characters: CharacterWithMapleGgData[], additionalOnClick?: () => void }) => {
  const { openDialog } = useDialogContext()
  const { additionalOnClick } = props
  const onClick = () => {
    openDialog((<EditCharacterOrderComponent characters={props.characters}/>))
    if (additionalOnClick) {
      additionalOnClick()
    }
  }
  return (
    <button className='btn btn-primary' onClick={onClick}>
      Edit Character Order
    </button>
  )
}
