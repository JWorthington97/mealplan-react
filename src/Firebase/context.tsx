// Not used at the moment!
// import { firebaseApp } from "./config";
// import React, { useState, useEffect, useContext, createContext } from "react";
// import firebase from "firebase/app";

// type User = firebase.User | null;
// type FirebaseContextState = { user: User } ;

// export const FirebaseAuthContext = createContext<FirebaseContextState | undefined>(undefined);

// export const FirebaseAuthProvider: React.FC = ({ children }) => {
//     const [user, setUser] = useState<User>(null)

//     useEffect(() => {
//         firebaseApp.auth().onAuthStateChanged(setUser)
//     }, [])

//     return (
//         <FirebaseAuthContext.Provider value={{ user }}>{children}</FirebaseAuthContext.Provider>
//     )
// }


export default function context() {
    return (
        <div>
            
        </div>
    )
}
