// Taken from https://stackoverflow.com/questions/67780314/react-beautiful-dnd-invariant-failed-cannot-find-droppable-entry-with-id

// StrictMode (which is enabled on dev) causes runtime issues with
// Draggable and Droppable from react-beautiful-dnd library. This component
// serves as a workaround to use this library without having to disable
// strict mode

import { useEffect, useState } from 'react'
import { Droppable, type DroppableProps } from 'react-beautiful-dnd'
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const animation = requestAnimationFrame(() => { setEnabled(true) })
    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])
  if (!enabled) {
    return null
  }
  return <Droppable {...props}>{children}</Droppable>
}
