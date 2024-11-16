// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWSKqj8vxh_AjI7KEoU72QL8HgRLTppkI",
  authDomain: "e-com-4c79d.firebaseapp.com",
  projectId: "e-com-4c79d",
  storageBucket: "e-com-4c79d.firebasestorage.app",
  messagingSenderId: "1056014384411",
  appId: "1:1056014384411:web:4a4b8eab25a539237be7be"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);


export { db }