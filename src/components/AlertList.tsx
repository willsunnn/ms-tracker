import { BiErrorCircle, BiInfoCircle, BiCheckCircle, BiMinusCircle } from 'react-icons/bi';

export type Alert = {
    text: string
    expireAt?: Date
    alertLevel: AlertLevel
};

export type AlertLevel = "info"|"warning"|"error"|"success";
export type AlertCallback = (alert: Alert) => void;

const AlertComponentIcon = (props: {alertLevel: AlertLevel}) => {
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

const AlertComponent = (props: {alert: Alert}) => {
    const { alert } = props;
    const className = `alert alert-${alert.alertLevel} w-64 flex-wrap`
    return (
        <div className={className}>
            <AlertComponentIcon alertLevel={alert.alertLevel}/>
            <span className='flex-wrap text-s' style={{wordWrap: 'normal'}}>{alert.text}</span>
        </div>
    );
}

export const AlertList = (props: {alerts: Alert[]}) => {
    return (
        <div className="toast whitespace-normal">
            {
                props.alerts.map((alert) => {
                    return (<AlertComponent alert={alert}/>)
                })
            }
        </div>
    )
}