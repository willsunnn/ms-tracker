import React, { useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Alert, AlertList } from '../components/AlertList';
import { Queue } from 'queue-typescript';

type AlertCallback = (alert: Alert | string) => void;

const AddAlertCallbackContext = React.createContext<AlertCallback>(console.log);

export const useAddAlertCallback =  () => {
    return useContext(AddAlertCallbackContext);
}

const ALERT_EXPIRY_REFRESH_INTERVAL_MS = 50   // remove expired alerts every second
const ALERT_DISPLAY_TIME_MS = 5000;            // show alert for 10 seconds

const shouldPopFromQueue = (alertQueue: Queue<Alert>) => {
    if (alertQueue.length === 0) {
        return false;
    }
    const expireAt = alertQueue.head.expireAt;
    if (!expireAt) {
        return true;
    }
    const currTime = new Date().valueOf();
    return currTime > expireAt.valueOf();
    ;
}

export const AddAlertCallbackProvider = (props: { children: ReactNode }) => {

    const alertQueueRef = useRef<Queue<Alert>>(new Queue<Alert>());
    const [alertList, setAlertList] = useState<Alert[]>([]);
    const [lastCheckedTime, setLastCheckedTime] = useState<Date>();

    useEffect(() => {
        const currTime = new Date();
        var removed: boolean = false;
        while (shouldPopFromQueue(alertQueueRef.current)) {
            alertQueueRef.current.dequeue();
            removed = true;
        }

        // if our queue was updated, rerender the component
        if (removed) {
            setAlertList(alertQueueRef.current.toArray());
        }

        // this causes this function to execute every 200 ms
        setTimeout(() => {
            setLastCheckedTime(currTime);
        }, ALERT_EXPIRY_REFRESH_INTERVAL_MS)
    }, [lastCheckedTime])
    
    const addAlert: AlertCallback = (alert) => {
        if (typeof alert === 'string') {
            alert = {
                text: alert,
                alertLevel: 'error'
            }
        }
        const currTime = new Date().valueOf();
        alert.expireAt = new Date(currTime + ALERT_DISPLAY_TIME_MS);
        alertQueueRef.current.append(alert);
        setAlertList(alertQueueRef.current.toArray());
    }

    return (
        <AddAlertCallbackContext.Provider value={addAlert}>
            {props.children}
            <AlertList alerts={alertList}/>
        </AddAlertCallbackContext.Provider>
    )
};