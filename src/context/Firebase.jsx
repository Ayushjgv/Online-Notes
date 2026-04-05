import { initializeApp } from "firebase/app";
import { createContext, useState, useEffect, useContext } from "react";
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";

//https://console.firebase.google.com/u/0/project/notes-beb79/database/notes-beb79-default-rtdb/data/~2F

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile as firebaseUpdateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCsk1NndF54j4dnX__V_Hh4pDKYPczieZw",
    authDomain: "notes-beb79.firebaseapp.com",
    projectId: "notes-beb79",
    storageBucket: "notes-beb79.firebasestorage.app",
    messagingSenderId: "480815946075",
    appId: "1:480815946075:web:4b6998461e90732ab3627e",
    measurementId: "G-NP8MZ1PD1G"
};



const FirebaseContext = createContext();
const app = initializeApp(firebaseConfig);
const firebaseauth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);



export const useFirebase = () => useContext(FirebaseContext);
export const FirebaseProvider = (props) => {
    const [User, setUser] = useState(null);


    useEffect(() => {
        onAuthStateChanged(firebaseauth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, []);

    const registerUser = async (email, password, name) => {
        const res = await createUserWithEmailAndPassword(firebaseauth, email, password);
        await firebaseUpdateProfile(res.user, { displayName: name });
        return res;
    }

    const loginUser = (email, password) => {
        return signInWithEmailAndPassword(firebaseauth, email, password);
    }

    const logoutUser = () => {
        return signOut(firebaseauth);
    }

    const loginWithGoogle = () => {
        return signInWithPopup(firebaseauth, provider);
    }

    const addNote = (note) => {
        const userId = firebaseauth.currentUser.uid;
        const notesRef = ref(db, `users/${userId}/notes`);

        return push(notesRef, {
            note,
            createdAt: Date.now()
        });
    };

    const getNotes = (callback) => {
        const userId = firebaseauth.currentUser.uid;
        const notesRef = ref(db, `users/${userId}/notes`);

        onValue(notesRef, (snapshot) => {
            const data = snapshot.val();
            callback(data);
        });
    };

    const deleteNote = (noteId) => {
        const userId = firebaseauth.currentUser.uid;
        const noteRef = ref(db, `users/${userId}/notes/${noteId}`);

        return remove(noteRef);
    };

    const updateNote = (noteId, updatedNote) => {
        const userId = firebaseauth.currentUser.uid;
        const noteRef = ref(db, `users/${userId}/notes/${noteId}`);

        return update(noteRef, updatedNote);
    };

    const isLoggedIn = User ? true : false;

    return (
        <FirebaseContext.Provider
            value={{
                User,
                loginUser,
                registerUser,
                logoutUser,
                isLoggedIn,
                loginWithGoogle,
                addNote,
                getNotes,
                deleteNote,
                updateNote
            }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

