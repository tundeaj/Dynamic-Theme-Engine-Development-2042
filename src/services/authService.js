// Mock authentication service
class AuthService {
  constructor() {
    this.currentUser = {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'admin', // user, vendor, admin, superadmin
      isPremium: true,
      subscriptionTier: 'premium'
    };
  }

  async getCurrentUser() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.currentUser), 100);
    });
  }

  async updateUserRole(userId, newRole) {
    // Simulate API call
    return new Promise((resolve) => {
      this.currentUser.role = newRole;
      setTimeout(() => resolve(), 100);
    });
  }

  async upgradeToPremium(userId) {
    // Simulate Stripe integration
    return new Promise((resolve) => {
      this.currentUser.isPremium = true;
      this.currentUser.subscriptionTier = 'premium';
      setTimeout(() => resolve(), 100);
    });
  }
}

export const authService = new AuthService();