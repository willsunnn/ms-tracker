import { Character } from "../../models/character";
import { Task, TaskAndStatus, TaskStatus, TaskStatusForAccount, TaskStatusForCharacter, defaultTaskStatusForCharacter, nextReset } from "../../models/tasks";
import { AddCharacterButton } from "./AddCharacterButton";
import { TaskViewProps } from "./TaskViewPage";
import DefaultCharacter from "../../resources/blank-character.png"

const joinTasksAndStatuses = (tasks: Task[], statuses: TaskStatusForCharacter): TaskAndStatus[] => {
    return tasks.map((task) => {
        const status = statuses.taskStatus.get(task.taskId) ?? {clearTimes:[], isPriority: false};
        return {
            ...task,
            ...status
        }
    })
}

const TaskViewSingleCharacter = (props: {tasks: Task[], taskStatus: TaskStatusForCharacter, character: Character}) => {
    const { tasks, taskStatus, character } = props
    const tasksAndStatuses = joinTasksAndStatuses(tasks, taskStatus);
    const characterImage = character.image ?? DefaultCharacter;

    return (
        <div className="card lg:card-side static bg-base-200 shadow-xl my-5">
            <figure className="min-w-l">
                <img src={characterImage} alt="Album"/>
                <h2 className="card-title">{taskStatus.characterName}</h2>
            </figure>
            <div className="card-body">
                <table className="table">
                    <tbody>
                    
                    {
                        tasksAndStatuses.map((task) => {
                            const { name, imageIcon, resetType } = task; 
                            const resetsAt = nextReset(resetType);
                            return (<tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        { imageIcon && 
                                            (<div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={imageIcon} alt={name} />
                                                </div>
                                            </div>)
                                        }
                                        <div>
                                        <div className="font-bold">{name}</div>
                                        </div>
                                    </div>
                                </td>
                                
                                <td>
                                    {resetsAt.toLocaleString()}
                                </td>

                                <td>
                                    <input type="checkbox" className="checkbox" />
                                </td>
                            </tr>)
                        })
                    }
                    {/* row 1 */}
                    
                    </tbody>
                    <tfoot></tfoot>
                    
                </table>
            </div>
        </div>
    )
}

export const TaskViewByCharacter = (props: {taskViewAttrs: TaskViewProps}) => {
    const { tasks, taskStatus, characters } = props.taskViewAttrs;
    return (<> 
        {
            characters.characters.map((character) => {
                const taskStatusForCharacter = taskStatus.get(character.name) ?? defaultTaskStatusForCharacter(character.name);
                return (<TaskViewSingleCharacter tasks={tasks} taskStatus={taskStatusForCharacter} character={character}/>);
            })
        }
        <AddCharacterButton/>
    </>)
}