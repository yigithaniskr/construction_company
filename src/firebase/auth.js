import {
    signInWithEmailAndPassword,
    signOut as fbSignOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './config';

const USERNAME_DOMAIN = '@ipekciinsaat.com';

const usernameToEmail = (username) => {
    if (!username) return '';
    return username.includes('@') ? username : `${username.trim()}${USERNAME_DOMAIN}`;
};

export const login = async (username, password) => {
    const email = usernameToEmail(username);
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
};

export const logout = () => fbSignOut(auth);

export const watchAuth = (callback) => onAuthStateChanged(auth, callback);

export const currentUser = () => auth.currentUser;
