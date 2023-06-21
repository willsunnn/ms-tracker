import { MdSettings } from 'react-icons/md';
import { useTheme } from '../../contexts/ThemeContext';
import { useAlertCallback } from '../../contexts/AlertContext';
import { useOpenInDialogCallback } from '../../contexts/DialogContext';

export const SettingsComponent = () => {
    const { theme, setTheme } = useTheme();
    const addAlertCallback = useAlertCallback();

    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        if (value==='light' || value==='dark') {
            setTheme(value);
        } else {
            addAlertCallback({
                text: `Theme ${value} is not supported`,
                alertLevel: "error"
            });
        }
    }

    return ( 
        <>
            <h2 className="text-lg font-semibold my-3">Theme: </h2>
            <select className="select select-accent" onChange={onSelectChange} defaultValue={theme}>
                <option value="dark">Dark mode</option>
                <option value="light">Light mode</option>
            </select>
        </>
    );
}

export const SettingsButton = () => {
    const openDialog = useOpenInDialogCallback()
    const onClick = () => {
        openDialog((<SettingsComponent/>))
    }
    return (
        <button className="btn btn-circle text-xl" onClick={onClick}>
            <MdSettings className="w-max"/>
        </button>)
}