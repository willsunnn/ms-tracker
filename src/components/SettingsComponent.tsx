const SettingsComponent = () => {
    return ( 
        <select className="select select-accent" data-choose-theme>
            <option value="dark">Dark mode</option>
            <option value="light">Light mode</option>
        </select>
    );
}

export default SettingsComponent;