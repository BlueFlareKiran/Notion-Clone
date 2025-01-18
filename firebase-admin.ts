import {
    initializeApp,
    getApps,
    App,
    getApp,
    cert,
    ServiceAccount
} from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import serviceKey from "@/service_key.json";

let app: App;
let adminDb: Firestore;

try {
    // Initialize Firebase Admin if no apps exist
    if (getApps().length === 0) {
        app = initializeApp({
            credential: cert(serviceKey as ServiceAccount),
        });
    } else {
        app = getApp();
    }

    // Initialize Firestore
    adminDb = getFirestore(app);
} catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    throw error; // Re-throw to handle it at a higher level if needed
}

export { app as adminApp, adminDb };