import React from 'react'
import { v4 as uuid } from 'uuid'
import { BiErrorCircle, BiInfoCircle, BiCheckCircle, BiMinusCircle } from 'react-icons/bi'

export interface Alert {
  text: string
  uid?: string
  expireAt?: Date
  alertLevel: AlertLevel
}
export const instanceOfAlert = (obj: any) => {
  return 'text' in obj && 'alertLevel' in obj
}

export type AlertLevel = 'info' | 'warning' | 'error' | 'success'
export type AlertCallback = (alert: Alert) => void

const AlertComponentIcon = (props: { alertLevel: AlertLevel }) => {
  const { alertLevel } = props
  if (alertLevel === 'success') {
    return (<BiCheckCircle/>)
  } else if (alertLevel === 'warning') {
    return (<BiMinusCircle/>)
  } else if (alertLevel === 'error') {
    return (<BiErrorCircle/>)
  } else {
    return (<BiInfoCircle/>)
  }
}

const getAlertClass = (level: AlertLevel): string => {
  // Cannot just return `alert-${level}` because
  // tailwind does some static analysis to find
  // classnames in our code to know which css to include
  switch (level) {
    case 'info':
      return 'alert-info'
    case 'warning':
      return 'alert-warning'
    case 'error':
      return 'alert-error'
    case 'success':
      return 'alert-success'
  }
}

const AlertComponent = (props: { alert: Alert }) => {
  const { alert } = props
  return (
    <div className={`alert ${getAlertClass(alert.alertLevel)} w-64 flex-wrap`}>
      <AlertComponentIcon alertLevel={alert.alertLevel}/>
      <span className='flex-wrap text-s' style={{ wordWrap: 'normal' }}>{alert.text}</span>
    </div>
  )
}

export const AlertList = (props: { alerts: Alert[] }) => {
  return (
    <div className="toast toast-start toast-bottom whitespace-normal">
      {
        props.alerts.map((alert) => {
          const uid = alert.uid ?? uuid()
          return (<AlertComponent alert={alert} key={`AlertComponent-${uid}`}/>)
        })
      }
    </div>
  )
}
