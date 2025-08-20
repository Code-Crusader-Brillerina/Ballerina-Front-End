import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCV9XB82lNxvowWq61OEcQkk4Dlyk4mJGs",
    authDomain: "image-store-8ddb7.firebaseapp.com",
    projectId: "image-store-8ddb7",
    storageBucket: "image-store-8ddb7.appspot.com",
    messagingSenderId: "498974884237",
    appId: "1:498974884237:web:5afa05a88a6fb48fc7fdc4",
    measurementId: "G-PNGRD0FV85"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export Firebase storage instance
export const storage = getStorage(app);