import React, { useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = React.createContext<Theme>('light');
const ToggleThemeContext = React.createContext<()=>void>(()=>{});
const SetThemeContext = React.createContext<(_: Theme)=>void>(()=>{});

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const useToggleTheme = () => {
    return useContext(ToggleThemeContext);
}

export const useSetTheme = () => {
    return useContext(SetThemeContext);
}

export const ThemeContextProvider = (props: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(()=> {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])
    
    const toggleTheme = () => {
        setTheme((currTheme) => 
            (currTheme === 'light') ? 'dark' : 'light'
        );
    }

    return (
        <ThemeContext.Provider value={theme}>
            <ToggleThemeContext.Provider value={toggleTheme}>
                <SetThemeContext.Provider value={setTheme}>
                    {props.children}
                </SetThemeContext.Provider>
            </ToggleThemeContext.Provider>
        </ThemeContext.Provider>
    );
};