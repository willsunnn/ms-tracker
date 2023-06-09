import React, { useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

type ThemeWrapper = {
    theme: Theme,
    toggleTheme: ()=>void,
    setTheme: (_:Theme)=>void,
}

const ThemeContext = React.createContext<ThemeWrapper|undefined>(undefined);

export const useTheme = () => {
    return useContext(ThemeContext)!;
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

    const value = {
        theme,
        toggleTheme,
        setTheme
    }

    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    );
};