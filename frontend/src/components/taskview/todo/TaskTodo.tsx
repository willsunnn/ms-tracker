import { ResetTaskView } from './ResetTaskView'
import { NoTaskRenavigateFullPageSpread } from '../../pagespread/NoTasksRenavigateFullPageSpread'
import { TouchGrassFullPageSpread } from '../../pagespread/TouchGrassFullPageSpread'
import { type DataWrapper } from 'ms-tracker-library/lib/models/helper'

export const TaskViewByReset = (props: { data: DataWrapper }) => {
  const { data } = props
  const tasks = data.getByResetTimeThenCharacterThenTask()
  const hasPendingTasks = tasks.pending.length > 0
  const hasTasks = hasPendingTasks || tasks.completed.length > 0

  if (!hasTasks) {
    return <NoTaskRenavigateFullPageSpread/>
  }
  if (hasTasks && !hasPendingTasks) {
    return <TouchGrassFullPageSpread/>
  }

  return (
    <div className="flex flex-col w-full h-fit items-center">
      <div className="flex flex-col max-w-lg w-full">
        {
          tasks.pending.map(({ resetDate, characters }) => (
            <ResetTaskView key={`TaskTodo-ResetTaskView-${resetDate.getTime()}`} resetDate={resetDate} characters={characters} />
          ))
        }
      </div>
    </div>
  )
}
