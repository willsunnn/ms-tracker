import React from 'react'
import { useFabContext } from '../../contexts/FabContext'

export const FabButtonWithLabel = (props: { label: string, icon: React.ReactNode, onClick: () => void }) => {
  const { label, icon, onClick } = props
  const { closeFab } = useFabContext()

  const onClickAndCloseFab = () => {
    onClick()
    closeFab()
  }

  return (
    <div className='flex flex-row h-fit items-center'>
      <div className='rounded-lg bg-neutral text-neutral-content pr-7 pl-2.5 py-1.5 h-fit -m-6 text-xs font-bold cursor-pointer' onClick={onClickAndCloseFab}>
        {label}
      </div>
      <button className='btn btn-circle btn-neutral hover:bg-neutral' onClick={onClickAndCloseFab}>
        {icon}
      </button>
    </div>
  )
}
