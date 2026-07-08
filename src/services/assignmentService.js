import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    updateDoc,
    doc,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

export async function createAssignment(data) {
    const payload = {
        ...data,
        createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
        collection(db, "assignments"),
        payload
    );

    return docRef.id;
}

export async function getAssignments() {
    const q = query(
        collection(db, "assignments"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function getAssignment(id) {
    const ref = doc(db, "assignments", id);

    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data(),
    };
}



export async function updateMemberName(
    assignmentId,
    memberKey,
    newName
) {
    const ref = doc(db, "assignments", assignmentId);

    await updateDoc(ref, {
        [`members.${memberKey}.nama`]: newName,
    });
}

export async function updateAssignmentMembers(
    assignmentId,
    members
) {
    const ref = doc(db, "assignments", assignmentId);

    await updateDoc(ref, {
        members,
    });
}