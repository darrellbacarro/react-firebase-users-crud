import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const config = {
  apiKey: "AIzaSyDMYI2MMUZtWZRy4vECAmO59cGRzXDydDQ",
  authDomain: "collabera-training.firebaseapp.com",
  projectId: "collabera-training",
  storageBucket: "collabera-training.appspot.com",
  messagingSenderId: "192677926882",
  appId: "1:192677926882:web:6b1d084a2b1146c82b8bbb",
  measurementId: "G-GL0FWWCGTQ"
};

initializeApp(config);
const db = getDatabase();

export default db;
