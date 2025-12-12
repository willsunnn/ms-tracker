import React, { useContext, useState, useEffect, useRef } from 'react'
import { type Alert, AlertList, instanceOfAlert } from '../components/AlertList'
import { Queue } from 'queue-typescript'
import { v4 as uuidv4 } from 'uuid'

type AlertCallback = (alert: unknown | Alert) => void

const AlertCallbackContext = React.createContext<AlertCallback>(console.log)

export const useAlertCallback = () => {
  return useContext(AlertCallbackContext)
}

const ALERT_EXPIRY_REFRESH_INTERVAL_MS = 50 // remove expired alerts every second
const ALERT_DISPLAY_TIME_MS = 5000 // show alert for 10 seconds

const shouldPopFromQueue = (alertQueue: Queue<Alert>) => {
  if (alertQueue.length === 0) {
    return false
  }
  const expireAt = alertQueue.head.expireAt
  if (expireAt == null) {
    return true
  }
  const currTime = new Date().valueOf()
  return currTime > expireAt.valueOf()
}

export const AddAlertCallbackProvider = (props: { children: React.ReactNode }) => {
  const alertQueueRef = useRef<Queue<Alert>>(new Queue<Alert>())
  const [alertList, setAlertList] = useState<Alert[]>([])
  const [lastCheckedTime, setLastCheckedTime] = useState<Date>()

  useEffect(() => {
    const currTime = new Date()
    let removed: boolean = false
    while (shouldPopFromQueue(alertQueueRef.current)) {
      alertQueueRef.current.dequeue()
      removed = true
    }

    // if our queue was updated, rerender the component
    if (removed) {
      setAlertList(alertQueueRef.current.toArray())
    }

    // this causes this function to execute every 200 ms
    setTimeout(() => {
      setLastCheckedTime(currTime)
    }, ALERT_EXPIRY_REFRESH_INTERVAL_MS)
  }, [lastCheckedTime])

  const addAlert: AlertCallback = (obj) => {
    const uuid = uuidv4()
    let alert: Alert
    if (typeof obj === 'string') {
      alert = {
        text: obj,
        alertLevel: 'error'
      }
    } else if (instanceOfAlert(obj)) {
      alert = obj as Alert
    } else if (obj instanceof Error) {
      console.log(obj)
      alert = {
        text: obj.message,
        alertLevel: 'error'
      }
    } else {
      alert = {
        text: JSON.stringify(obj),
        alertLevel: 'error'
      }
    }
    const currTime = new Date().valueOf()
    alert.expireAt = new Date(currTime + ALERT_DISPLAY_TIME_MS)
    alert.uid = uuid
    alertQueueRef.current.append(alert)
    setAlertList(alertQueueRef.current.toArray())
  }

  return (
    <AlertCallbackContext.Provider value={addAlert}>
      {props.children}
      <AlertList alerts={alertList}/>
    </AlertCallbackContext.Provider>
  )
}
