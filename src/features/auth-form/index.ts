import authSlice, { setCredentials, logOut } from "./modules/authSlice";

// const authStore = {
// 	authSlice,
// 	actions: { setCredentials, logOut }
// };

// export { authStore };
// export default {
// 	store: authStore
// } 

export { LoginForm as AuthForm } from './ui/Form';
export { authSlice, setCredentials, logOut };
