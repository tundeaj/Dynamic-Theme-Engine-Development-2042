// Mock service - replace with actual API calls
class ThemeService {
  constructor() {
    this.themes = [
      {
        id: 'default',
        name: 'Default',
        description: 'Clean and professional default theme',
        isPremium: false,
        superAdminOnly: false,
        allowedRoles: ['user', 'vendor', 'admin', 'superadmin'],
        cssVariables: {
          'primary-color': '#3b82f6',
          'secondary-color': '#64748b',
          'background-color': '#ffffff',
          'text-color': '#1f2937',
          'border-radius': '0.5rem',
          'shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        },
        seoOptimized: true
      },
      {
        id: 'neumorphic',
        name: 'Neumorphic',
        description: 'Soft, tactile design with subtle shadows',
        isPremium: true,
        superAdminOnly: false,
        allowedRoles: ['vendor', 'admin', 'superadmin'],
        cssVariables: {
          'primary-color': '#6366f1',
          'secondary-color': '#8b5cf6',
          'background-color': '#f1f5f9',
          'text-color': '#334155',
          'border-radius': '1rem',
          'shadow': 'inset 5px 5px 10px #d1d5db, inset -5px -5px 10px #ffffff'
        },
        seoOptimized: true
      },
      {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Ultra-clean design with maximum whitespace',
        isPremium: false,
        superAdminOnly: false,
        allowedRoles: ['user', 'vendor', 'admin', 'superadmin'],
        cssVariables: {
          'primary-color': '#000000',
          'secondary-color': '#6b7280',
          'background-color': '#ffffff',
          'text-color': '#111827',
          'border-radius': '0.25rem',
          'shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)'
        },
        seoOptimized: true
      },
      {
        id: 'retro',
        name: 'Retro',
        description: 'Nostalgic design with vintage colors',
        isPremium: true,
        superAdminOnly: false,
        allowedRoles: ['vendor', 'admin', 'superadmin'],
        cssVariables: {
          'primary-color': '#f59e0b',
          'secondary-color': '#dc2626',
          'background-color': '#fef3c7',
          'text-color': '#92400e',
          'border-radius': '0.75rem',
          'shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        },
        seoOptimized: true
      },
      {
        id: 'glow',
        name: 'Glow',
        description: 'Futuristic design with neon accents',
        isPremium: true,
        superAdminOnly: true,
        allowedRoles: ['superadmin'],
        cssVariables: {
          'primary-color': '#06b6d4',
          'secondary-color': '#8b5cf6',
          'background-color': '#0f172a',
          'text-color': '#f1f5f9',
          'border-radius': '0.5rem',
          'shadow': '0 0 20px rgb(6 182 212 / 0.5)'
        },
        seoOptimized: true
      }
    ];

    this.config = {
      defaultTheme: 'default',
      monetizationEnabled: false,
      themes: this.themes
    };
  }

  async getThemeConfig() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.config), 100);
    });
  }

  async getUserTheme(userId) {
    // Simulate API call to get user's selected theme
    return new Promise((resolve) => {
      const savedTheme = localStorage.getItem(`user-theme-${userId}`);
      setTimeout(() => resolve(savedTheme), 100);
    });
  }

  async setUserTheme(themeId) {
    // Simulate API call to save user's theme preference
    return new Promise((resolve) => {
      localStorage.setItem(`user-theme-current`, themeId);
      setTimeout(() => resolve(), 100);
    });
  }

  async toggleMonetization(enabled) {
    // Simulate API call to toggle monetization
    return new Promise((resolve) => {
      this.config.monetizationEnabled = enabled;
      setTimeout(() => resolve(), 100);
    });
  }

  async assignThemeToGroup(themeId, groupId) {
    // Simulate API call to assign theme to user group
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 100);
    });
  }

  async createCustomTheme(themeData) {
    // Simulate API call to create custom theme
    return new Promise((resolve) => {
      const newTheme = {
        id: `custom-${Date.now()}`,
        ...themeData,
        seoOptimized: true
      };
      this.themes.push(newTheme);
      setTimeout(() => resolve(newTheme), 100);
    });
  }
}

export const themeService = new ThemeService();