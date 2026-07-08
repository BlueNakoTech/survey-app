import { db } from "../firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

export async function saveAssignment(data) {
    try {
        const docRef = await addDoc(collection(db, "assignments"), {
            ...data,
            createdAt: serverTimestamp(),
        });

        return docRef.id;
    } catch (error) {
        console.error(error);
        throw error;
    }
}