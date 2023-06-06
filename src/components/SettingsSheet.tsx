type SettingsSheetProps = {
}

const SettingsSheet = (props: SettingsSheetProps) => {
    return ( 
        <select className="select select-accent" data-choose-theme>
            <option value="dark">Dark mode</option>
            <option value="light">Light mode</option>
        </select>
    );
}

export default SettingsSheet;