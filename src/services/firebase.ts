import { initializeApp } from 'firebase/app';
import { getAuth, Auth, signInWithRedirect } from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  addDoc,
  collection,
  getDocs,
  Timestamp,
  orderBy,
  query, // Import Firestore Timestamp
} from 'firebase/firestore';
import { Alert } from '../utils/types';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

const firebaseConfig = {
  apiKey: 'AIzaSyB3GjdqNmTcgxk275w6Pda3cp1TaA7y6zQ',
  authDomain: 'authentication-ffc51.firebaseapp.com',
  projectId: 'authentication-ffc51',
  storageBucket: 'authentication-ffc51.firebasestorage.app',
  messagingSenderId: '652992095408',
  appId: '1:652992095408:web:594392291bd89098178775',
  measurementId: 'G-Y79JD97S1H',
};

const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

signInWithRedirect(auth, provider);
export const saveRateAlert = async (alert: {
  title: string;
  country: string;
  rate: number;
  createdAt: string;
}) => {
  const alertWithDate = {
    ...alert,
    createdAt: Timestamp.fromDate(new Date()), // Store Firestore Timestamp
  };
  await addDoc(collection(db, 'rateAlerts'), alertWithDate); // Save to Firestore
};

export const getRateAlerts = async (): Promise<Alert[]> => {
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
};
