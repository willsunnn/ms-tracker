import { Character } from "../../models/character";
import { Task, TaskAndStatus, TaskStatus, TaskStatusForAccount, TaskStatusForCharacter, defaultTaskStatusForCharacter } from "../../models/tasks";
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

const SingleTaskView = (props: {task: TaskAndStatus}) => {
    const { task } = props
    return (<div>
        <p>{JSON.stringify(task)}</p> 
     </div>);
}

const TaskViewSingleCharacter = (props: {tasks: Task[], taskStatus: TaskStatusForCharacter, character: Character}) => {
    const { tasks, taskStatus, character } = props
    const tasksAndStatuses = joinTasksAndStatuses(tasks, taskStatus);
    const characterImage = character.image ?? DefaultCharacter;
    return (
        <div className="card card-side static bg-base-100 shadow-xl my-5">
            <figure><img src={characterImage} alt="Album"/></figure>
            <div className="card-body">
                <h2 className="card-title">{taskStatus.characterName}</h2>
                {
                    tasksAndStatuses.map((t) => (<SingleTaskView task={t}/>))
                }
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