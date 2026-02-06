import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Theme is permanently set to 'light'
    // No state, no toggle, no localStorage logic needed

    // Apply theme to document root just in case specific CSS relies on it
    document.documentElement.setAttribute('data-theme', 'light');

    const value = {
        theme: 'light',
        toggleTheme: () => { }, // No-op
        isDark: false
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
