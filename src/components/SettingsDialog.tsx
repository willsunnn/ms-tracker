import { useAddAlertCallback } from "../contexts/AlertContext";
import { useTheme } from "../contexts/ThemeContext";

const SettingsComponent = () => {
    const { theme, setTheme } = useTheme();
    const addAlertCallback = useAddAlertCallback();

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

const SettingsDialog = (props: {open: boolean, closeDialog: (()=>void)}) => {
    return (
        <dialog className="modal" open={props.open}>
        {/* This allows us to close the modal by clicking out */}
        <form method="dialog" className="modal-backdrop">
            <button onClick={props.closeDialog}>close</button>
        </form>
        <form method="dialog" className="modal-box">
            {/* This Button allows us to close the modal by clicking the x */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={props.closeDialog}>✕</button>
            {/* This is the body of the modal */}
            <SettingsComponent/>
        </form>
    </dialog>
    )
}

export default SettingsDialog;