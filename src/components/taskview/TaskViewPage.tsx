import React from "react";
import { TaskViewByCharacter } from "./TaskViewByCharacters";
import { TaskViewByReset } from "./TaskViewByReset";
import { TaskViewCompact } from "./TaskViewCompact";
import { User } from "firebase/auth";
import { Task, TaskStatusForAccount, defaultTaskStatusForAccount } from "../../models/tasks";
import { AccountCharacters, defaultAccountCharacters } from "../../models/character";
import { TaskStatusApi } from "../../api/TaskStatusApi";
import { useAlertCallback } from "../../contexts/AlertContext";
import { CharacterApi } from "../../api/CharacterApi";
import { TASK_LIST } from "../../models/PredefinedTasks";

type Tabs = "BY_CHARACTER" | "BY_RESET_DATE" | "COMPACT";

const TabLabel = (props: {tabText: string, tabTag: Tabs, selectedTab: Tabs, setTab: (_: Tabs)=>void}) => {
    const { tabText, tabTag, selectedTab } = props;
    const onClick = () => {
        props.setTab(tabTag);
    }
    return (
        <a className={`tab tab-lifted ${tabTag===selectedTab? 'tab-active':''}`} onClick={onClick}>{tabText}</a> 
    )
}

export interface TaskViewProps {
    taskStatus: TaskStatusForAccount,
    tasks: Task[],
    characters: AccountCharacters,
    removeClear: (characterName: string, taskId: string) => Promise<void>,
    addClear: (characterName: string, taskId: string, clearTime: Date) => Promise<void>,
}

export const TaskViewPage = (props: { user: User}) => {
    const { user } = props;
    const alert = useAlertCallback();

    // React States
    const [tab, setTab] = React.useState<Tabs>("BY_CHARACTER");
    const [taskStatus, setTaskStatus] = React.useState<TaskStatusForAccount>(defaultTaskStatusForAccount);
    const [characters, setCharacters] = React.useState<AccountCharacters>(defaultAccountCharacters);

    React.useEffect(() => {
        const stopTaskListen = TaskStatusApi.listen(user, setTaskStatus, alert);
        const stopCharListen = CharacterApi.listen(user, setCharacters, alert);

        return () => {
            stopTaskListen();
            stopCharListen();
        }
    }, []);

    const taskViewProps = {
        taskStatus,
        tasks: TASK_LIST,
        characters,
        addClear: async (characterName: string, taskId: string, clearTime: Date) => {
            console.log(`adding clear for ${characterName} ${taskId} ${clearTime}`)
        },
        removeClear: async (characterName: string, taskId: string) => {
            console.log(`removing clear for ${characterName} ${taskId}`)
        }
    }

    return (
        <div className="p-5 w-full">
            <div className="tabs mb-3 w-full">
                <TabLabel tabText="Characters" tabTag="BY_CHARACTER" selectedTab={tab} setTab={setTab}/>
                <TabLabel tabText="Tasks by Reset Time" tabTag="BY_RESET_DATE" selectedTab={tab} setTab={setTab}/>
                <TabLabel tabText="Compact" tabTag="COMPACT" selectedTab={tab} setTab={setTab}/>
            </div>
            { tab === "BY_CHARACTER" && <TaskViewByCharacter taskViewAttrs={taskViewProps}/>}
            { tab === "BY_RESET_DATE" && <TaskViewByReset taskViewAttrs={taskViewProps}/>}
            { tab === "COMPACT" && <TaskViewCompact taskViewAttrs={taskViewProps}/>}
        </div>
    )

}