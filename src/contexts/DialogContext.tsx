import React from 'react';

type DialogContext = {
    openDialog: (children: React.ReactNode) => void
    closeDialog: () => void
}

const OpenInDialogContext = React.createContext<DialogContext>({
    openDialog: (c)=>{console.log('No DialogContext: cannot open dialog')},
    closeDialog: ()=>{console.log('No DialogContext: cannot close dialog')}
});

export const useDialogContext = () => {
    return React.useContext(OpenInDialogContext);
}

const GenericDialog = (props: {open: boolean, closeDialog: (()=>void), children: React.ReactNode}) => {
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
            <div className="pt-3">
                {props.children}
            </div>
        </form>
    </dialog>
    )
}

export const OpenInDialogContextProvider = (props: { children: React.ReactNode }) => {
    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
    const [dialogChildren, setDialogChildren] = React.useState<React.ReactNode>();

    const openDialog: (children: React.ReactNode) => void = (children: React.ReactNode) => {
        setDialogChildren(children)
        setDialogIsOpen(true);
    }

    const closeDialog = () => {
        setDialogIsOpen(false);
        
        // close would look weird where content would be deleted while dialog is minimizing
        // so lets remove the content only after 200ms of the dialog hide animation beginning 
        setTimeout(()=>{setDialogChildren(null)}, 200);
    }

    const value = {
        openDialog,
        closeDialog
    }

    return (
        <OpenInDialogContext.Provider value={value}>
            {props.children}
            <GenericDialog open={dialogIsOpen} closeDialog={closeDialog}>
                {dialogChildren}
            </GenericDialog>
        </OpenInDialogContext.Provider>
    )
};