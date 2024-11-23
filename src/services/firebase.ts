import { initializeApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  addDoc,
  collection,
  getDocs,
  Timestamp,
  orderBy,
  query,
} from 'firebase/firestore';
import { Alert } from '../utils/types'; // Assuming your custom types are correct.

const firebaseConfig = {
  apiKey: 'AIzaSyB3GjdqNmTcgxk275w6Pda3cp1TaA7y6zQ',
  authDomain: 'authentication-ffc51.firebaseapp.com',
  projectId: 'authentication-ffc51',
  storageBucket: 'authentication-ffc51.firebasestorage.app',
  messagingSenderId: '652992095408',
  appId: '1:652992095408:web:594392291bd89098178775',
  measurementId: 'G-Y79JD97S1H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

// Handle redirect result for Firebase Authentication
export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth); // Retrieve the redirect result
    if (result) {
      const user = result.user; // User object contains information about the authenticated user
      console.log('User info:', user);
    } else {
      console.log('No user is signed in.');
    }
  } catch (error) {
    console.error('Error handling redirect result:', error);
  }
};

// Trigger Google sign-in with redirect
export const signInWithGoogle = () => {
  signInWithRedirect(auth, provider); // This will initiate the redirect flow
};

// Save rate alert to Firestore
export const saveRateAlert = async (alert: {
  title: string;
  country: string;
  rate: number;
  createdAt: string;
}) => {
  try {
    const alertWithDate = {
      ...alert,
      createdAt: Timestamp.fromDate(new Date()), // Store Firestore Timestamp
    };
    await addDoc(collection(db, 'rateAlerts'), alertWithDate); // Save to Firestore
    console.log('Rate alert saved successfully');
  } catch (error) {
    console.error('Error saving rate alert:', error);
  }
};

// Fetch rate alerts from Firestore
export const getRateAlerts = async (): Promise<Alert[]> => {
  try {
    const q = query(collection(db, 'rateAlerts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const alerts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        country: data.country,
        rate: data.rate,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Alert;
    });

    return alerts;
  } catch (error) {
    console.error('Error fetching rate alerts:', error);
    return [];
  }
};
