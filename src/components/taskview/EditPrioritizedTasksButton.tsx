import { useDialogContext } from "../../contexts/DialogContext";
import { useAuth } from "../../contexts/AuthContext";
import { useAlertCallback } from "../../contexts/AlertContext";
import { TaskAndStatus } from "../../models/tasks";
import { Character } from "../../models/character";
import { TaskStatusApi } from "../../api/TaskStatusApi";
export const EditPrioritizedTasksComponent = (props: {character: Character, tasks: TaskAndStatus[]}) => {
    const { character, tasks } = props;
    const { user } = useAuth();
    const alert = useAlertCallback();

    const prioritizeTask = (taskId: string) => {
        console.log(`prioritizing ${taskId}`);
    }

    const toggleTaskPriority = (task: TaskAndStatus) => {
        return () => {
            user && TaskStatusApi.updatePriority(user, character.name, task.taskId, !(task.isPriority)).catch(alert)
        }
    }

    return ( 
        <>
            <div className="text-lg font-bold pb-3 text-center">Editing tasks for {character.name}</div>
            <div className="max-h-120 min-h-80 overflow-y-scroll">
            <tbody>
            {
                tasks.map((task, index) => {
                    const { name, resetType, isPriority } = task;
                    return (<tr>
                        <td>
                            <div className="flex items-center space-x-3 font-bold">
                                { name }
                            </div>
                        </td>
                        
                        <td>
                            {resetType}
                        </td>

                        <td>
                            <input type="checkbox" className="checkbox" checked={task.isPriority} onClick={toggleTaskPriority(task)}/>
                        </td>
                    </tr>)
                })
            }
            </tbody>

            </div>
        </>
    );
}

export const EditPrioritizedTasksButton = (props: {character: Character, tasks: TaskAndStatus[]}) => {
    const { character, tasks } = props; 
    const { openDialog } = useDialogContext();
    const onClick = () => {
        openDialog((<EditPrioritizedTasksComponent character={character} tasks={tasks}/>))
    }
    return (
        <button className="btn btn-primary" onClick={onClick}>
            Edit Tasks
        </button>
    );
}