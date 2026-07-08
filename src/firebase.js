import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVtTthXfCTfGP9wwncNqJ-r-y67WiFE88",
    authDomain: "paroki-forms.firebaseapp.com",
    projectId: "paroki-forms",
    storageBucket: "paroki-forms.firebasestorage.app",
    messagingSenderId: "143827894532",
    appId: "1:143827894532:web:ee11734f18d693c89f9051",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);