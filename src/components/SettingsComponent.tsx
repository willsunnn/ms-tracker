const SettingsComponent = () => {
    return ( 
        <>
            <h2 className="text-lg font-semibold my-3">Theme: </h2>
            <select className="select select-accent" data-choose-theme>
                <option value="dark">Dark mode</option>
                <option value="light">Light mode</option>
            </select>
        </>
    );
}

export default SettingsComponent;