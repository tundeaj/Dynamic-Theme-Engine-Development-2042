import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { themeService } from '../services/themeService';
import { authService } from '../services/authService';

const ThemeContext = createContext();

const initialState = {
  currentTheme: 'default',
  availableThemes: [],
  userRole: 'user',
  isPremiumUser: false,
  monetizationEnabled: false,
  loading: true,
  error: null,
  themeConfig: null
};

function themeReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_THEME_CONFIG':
      return { 
        ...state, 
        themeConfig: action.payload,
        availableThemes: action.payload.themes || [],
        monetizationEnabled: action.payload.monetizationEnabled || false,
        loading: false 
      };
    case 'SET_CURRENT_THEME':
      return { ...state, currentTheme: action.payload };
    case 'SET_USER_DATA':
      return { 
        ...state, 
        userRole: action.payload.role,
        isPremiumUser: action.payload.isPremium 
      };
    case 'TOGGLE_MONETIZATION':
      return { 
        ...state, 
        monetizationEnabled: !state.monetizationEnabled 
      };
    default:
      return state;
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    initializeTheme();
  }, []);

  const initializeTheme = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Load user data
      const userData = await authService.getCurrentUser();
      dispatch({ type: 'SET_USER_DATA', payload: userData });

      // Load theme configuration
      const themeConfig = await themeService.getThemeConfig();
      dispatch({ type: 'SET_THEME_CONFIG', payload: themeConfig });

      // Set user's theme
      const userTheme = await themeService.getUserTheme(userData.id);
      dispatch({ type: 'SET_CURRENT_THEME', payload: userTheme || themeConfig.defaultTheme });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const switchTheme = async (themeId) => {
    try {
      const theme = state.availableThemes.find(t => t.id === themeId);
      
      if (!theme) {
        throw new Error('Theme not found');
      }

      // Check if theme is premium and user has access
      if (theme.isPremium && state.monetizationEnabled && !state.isPremiumUser) {
        throw new Error('Premium theme requires subscription');
      }

      // Check role permissions
      if (!canUserAccessTheme(theme, state.userRole)) {
        throw new Error('Insufficient permissions for this theme');
      }

      await themeService.setUserTheme(themeId);
      dispatch({ type: 'SET_CURRENT_THEME', payload: themeId });
      
      // Apply theme to document
      applyThemeToDocument(theme);
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const canUserAccessTheme = (theme, userRole) => {
    if (userRole === 'superadmin') return true;
    if (userRole === 'admin' && !theme.superAdminOnly) return true;
    if (userRole === 'vendor' && theme.allowedRoles?.includes('vendor')) return true;
    if (userRole === 'user' && theme.allowedRoles?.includes('user')) return true;
    return false;
  };

  const applyThemeToDocument = (theme) => {
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(theme.cssVariables || {}).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    // Apply theme class
    document.body.className = document.body.className
      .replace(/theme-\w+/g, '')
      .concat(` theme-${theme.id}`);
  };

  const toggleMonetization = async () => {
    if (state.userRole !== 'superadmin') {
      throw new Error('Only super admins can toggle monetization');
    }
    
    try {
      await themeService.toggleMonetization(!state.monetizationEnabled);
      dispatch({ type: 'TOGGLE_MONETIZATION' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const getCurrentThemeData = () => {
    return state.availableThemes.find(theme => theme.id === state.currentTheme);
  };

  const value = {
    ...state,
    switchTheme,
    toggleMonetization,
    getCurrentThemeData,
    canUserAccessTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};