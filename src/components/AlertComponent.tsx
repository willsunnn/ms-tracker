import { BiErrorCircle, BiInfoCircle, BiCheckCircle, BiMinusCircle } from 'react-icons/bi';

export type Alert = {
    text: string
    autoDismissAt?: Date
    alertLevel: AlertLevel
};

type AlertLevel = "info"|"warning"|"error"|"success";
export type AlertCallback = (alert: Alert) => void;


type AlertComponentIconProps = {
    alertLevel: AlertLevel
}

const AlertComponentIcon = (props: AlertComponentIconProps) => {
    const { alertLevel } = props;
    if (alertLevel === "success") {
        return (<BiCheckCircle/>);
    } else if (alertLevel === "warning") {
        return (<BiMinusCircle/>);
    } else if (alertLevel === "error") {
        return (<BiErrorCircle/>)
    } else {
        return (<BiInfoCircle/>);
    }
}

type AlertComponentProps = {
    alert: Alert
}

const AlertComponent = (props: AlertComponentProps) => {
    const { alert } = props;
    return (
        <div className={`alert alert-${alert.alertLevel} w-64 flex-wrap`}>
            <AlertComponentIcon alertLevel={alert.alertLevel}/>
            <span className='flex-wrap text-s' style={{wordWrap: 'normal'}}>{alert.text}</span>
        </div>
    );
}

export type AlertListProps = {
    alerts: Alert[]
}


export const AlertList = (props: AlertListProps) => {
    const { alerts } = props;
    console.log(alerts)
    return (
        <div className="toast whitespace-normal">
            {
                alerts.map((alert) => {
                    return (<AlertComponent alert={alert}/>)
                })
            }
        </div>
    )
}