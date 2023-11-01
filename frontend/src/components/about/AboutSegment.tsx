import { type CharacterWithMapleGgData, Model, type TaskAndStatus, type TaskStatus, GroupedTasksAndStatuses } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'
import { CharacterTaskView } from '../taskview/characters/CharacterTaskView'
import { useAlertCallback } from '../../contexts/AlertContext'
import React from 'react'
import { PREDEFINED_TASKS } from '../../models/PredefinedTasks'
import ExampleCharacter from '../../resources/about/nums-char.png'

const defaultCharacter: CharacterWithMapleGgData = {
  id: 'test',
  name: 'nùms',
  region: 'gms'
}
const sampleStatuses: Map<string, TaskStatus> = new Map<string, TaskStatus>([
  ['sacred-arcus', {
    characterId: 'test',
    clearTimes: [],
    isPriority: true,
    taskId: 'sacred-arcus',
    userId: ''
  }],
  ['sacred-cernium', {
    characterId: 'test',
    clearTimes: [],
    isPriority: true,
    taskId: 'sacred-cernium',
    userId: ''
  }],
  ['sacred-burnium', {
    characterId: 'test',
    clearTimes: [],
    isPriority: true,
    taskId: 'sacred-burnium',
    userId: ''
  }],
  ['sacred-odium', {
    characterId: 'test',
    clearTimes: [],
    isPriority: true,
    taskId: 'sacred-odium',
    userId: ''
  }],
  ['monster-park-extreme', {
    characterId: 'test',
    clearTimes: [],
    isPriority: true,
    taskId: 'monster-park-extreme',
    userId: ''
  }],
  ['boss-monthly-black-mage', {
    characterId: 'test',
    clearTimes: [],
    isPriority: true,
    taskId: 'monster-park-extreme',
    userId: ''
  }]
])
const sampleTasks: GroupedTasksAndStatuses[] = Model.joinTaskGroupsAndStatuses('', defaultCharacter, PREDEFINED_TASKS.getGroupedTasks(), sampleStatuses)

export const AboutSegment = () => {
  const [character, setCharacter] = React.useState<CharacterWithMapleGgData>(defaultCharacter)
  const { mapleGgFirebaseApi } = useApi()
  const alert = useAlertCallback()

  React.useEffect(() => {
    mapleGgFirebaseApi.getFromCache(character).then((mapleGgData) => {
      setCharacter({
        ...character,
        mapleGgData
      })
    }).catch(alert)
  }, [])

  return (<div className="flex flex-col w-full h-fit items-center justify-center">
    <div className="flex flex-row justify-center w-full mb-4">
      <div className="max-w-lg h-fit text-center text-xl w-1/3">
        BuffNW is an app that you can use to keep track of your Maplestory Daily and Weekly Tasks
      </div>
    </div>
    <div className="flex flex-row justify-center w-full">
      <div className='max-w-lg mt-3 min-w-fit w-1/2'>
        <CharacterTaskView character={character} groupedTasks={sampleTasks} isPreview={true} characterImageOverride={ExampleCharacter}/>
      </div>
    </div>
  </div>)
}
