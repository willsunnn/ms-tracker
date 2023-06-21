import { Character } from "../../models/character";
import { Task, TaskAndStatus, TaskStatus, TaskStatusForAccount, TaskStatusForCharacter, defaultTaskStatusForCharacter } from "../../models/tasks";
import { TaskViewProps } from "./TaskViewPage";

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
    return (
        <div className="card card-side bg-base-100 shadow-xl m-5">
            <figure><img src="https://msavatar1.nexon.net/Character/JMOLMEJGJLPMEFANEAELCGBPAMNJFFLHGOGEJMJNOHFENDCLADFDMGOBHPOJOOEJKKEHCAOKPGMGOJCBJOKBIGNOFBPNGFKPNKMDCJICBEBOFBEEMOEHOOHGLHPNPFCHMJALCOAMNLBDGHCCDEJHFJBDCOECOIBEDIHHMOFAJPPPOJFCGOAHCGCHAIALNDFCAEPCFNLJGLJDEDBBENOBMFCBOCNJLGGBAFFMPNPJAAHBHCDAAFNDJKKLDFNJMPBD.png" alt="Album"/></figure>
            <div className="card-body">
                <h2 className="card-title">{taskStatus.characterName}</h2>
                {
                    tasksAndStatuses.map((t) => (<SingleTaskView task={t}/>))
                }
            </div>
        </div>
    )
}

const AddCharacterButton = () => {
    return (
        <button className="btn btn-primary">Add Character</button>
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