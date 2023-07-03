import { useDialogContext } from '../../contexts/DialogContext'
import { AddCharacterComponent } from '../dialog/AddCharacterDialog'

export const AddCharacterButton = (props: { additionalOnClick?: () => void }) => {
  const { openDialog } = useDialogContext()
  const { additionalOnClick } = props
  const onClick = () => {
    openDialog((<AddCharacterComponent/>))
    if (additionalOnClick) {
      additionalOnClick()
    }
  }
  return (
    <button className='btn btn-primary' onClick={onClick}>
            Add Character
    </button>
  )
}
