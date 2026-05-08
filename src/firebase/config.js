import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC1SWxUmuwcN_5syGe9FPinRg3_5KVl5fg",
    authDomain: "ipekci-insaat.firebaseapp.com",
    projectId: "ipekci-insaat",
    storageBucket: "ipekci-insaat.firebasestorage.app",
    messagingSenderId: "268636266090",
    appId: "1:268636266090:web:485ac68cfbbb4b393db413",
    measurementId: "G-3DPSJNQS2W",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
