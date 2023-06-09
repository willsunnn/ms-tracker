import React, { useContext, useState, ReactNode } from 'react';
import { Alert, AlertList } from '../components/AlertList';

type AlertCallback = (alert: Alert | string) => void;

const AddAlertCallbackContext = React.createContext<AlertCallback>(console.log);

export const useAddAlertCallback =  () => {
    return useContext(AddAlertCallbackContext);
}

export const AddAlertCallbackProvider = (props: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    
    const addAlert: AlertCallback = (alert) => {
        if (typeof alert === 'string') {
            alert = {
                text: alert,
                alertLevel: 'error'
            }
        }
        setAlerts([...alerts, alert]);
    } 

    return (
        <AddAlertCallbackContext.Provider value={addAlert}>
            {props.children}
            <AlertList alerts={alerts}/>
        </AddAlertCallbackContext.Provider>
    )
};