import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Connectivity check as per Firebase instructions
async function testConnection() {
  // Skip test if config still contains placeholders
  if (firebaseConfig.projectId.includes('remixed-project-id')) {
    return;
  }
  
  try {
    // Attempting to read a non-existent doc to trigger a connection attempt
    await getDocFromServer(doc(db, 'system', 'ping'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('offline')) {
      console.error("Firebase connection error: The client is offline.");
    }
  }
}

testConnection();
