// import { User } from '@/types/auth';
// import { create } from 'zustand';

// type AuthStore = {
//   isAuthenticated: boolean;
//   user: User | null;
//   isLoading: boolean;
//   setUser: (user: User) => void;
//   clearIsAuthenticated: () => void;
// };

// export const useAuthStore = create<AuthStore>(set => ({
//   isAuthenticated: false,
//   user: null,
//   isLoading: false,
//   setUser: (user: User) => {
//     set(() => ({ user, isAuthenticated: true }));
//   },
//   clearIsAuthenticated: () => {
//     set(() => ({ user: null, isAuthenticated: false }));
//   },
// }));
