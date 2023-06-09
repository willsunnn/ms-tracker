import React, { useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

const availableThemes = ['light', 'dark'];
type Theme = 'light' | 'dark'

type ThemeWrapper = {
    theme: Theme,
    toggleTheme: ()=>void,
    setTheme: (_:Theme)=>void,
}

const ThemeContext = React.createContext<ThemeWrapper|undefined>(undefined);

const ThemeCookieKey = 'theme';

export const useTheme = () => {
    return useContext(ThemeContext)!;
}

export const ThemeContextProvider = (props: { children: ReactNode }) => {

    const cookieValue = Cookies.get(ThemeCookieKey);
    let defaultValue: Theme = 'light'
    if (cookieValue && (cookieValue==='light' || cookieValue==='dark')) {
        defaultValue = cookieValue;
    }

    const [theme, setTheme] = useState<Theme>(defaultValue);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    const setThemeAndCookie = (theme: Theme) => {
        Cookies.set(ThemeCookieKey, theme, {sameSite: 'strict'});
        setTheme(theme);
    }
    
    const toggleTheme = () => {
        setThemeAndCookie(
            (theme === 'light') ? 'dark' : 'light'
        );
    }

    const value = {
        theme,
        toggleTheme,
        setTheme: setThemeAndCookie
    }

    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    );
};