import React, { useContext, useState, ReactNode } from 'react';
import { Alert, AlertList } from '../components/AlertComponent';


type AlertCallback = (alert: Alert) => void;
const AddAlertCallbackContext = React.createContext<AlertCallback>((alert)=>{});

export const useAddAlertCallback =  () => {
    return useContext(AddAlertCallbackContext);
}

export const AddAlertCallbackProvider = (props: { children: ReactNode }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    
    const addAlert: AlertCallback = (alert) => {
        setAlerts([...alerts, alert]);
    } 

    return (
        <AddAlertCallbackContext.Provider value={addAlert}>
            {props.children}
            <AlertList alerts={alerts}/>
        </AddAlertCallbackContext.Provider>
    )
};