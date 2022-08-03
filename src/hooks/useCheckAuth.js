import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore/lite";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { FirebaseAuth, FirebaseDB } from "../firebase/config";

export const useCheckAuth = () => {

    const { Usuario, login, logout } = useContext(AuthContext);

    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, async(user)=>{
        if(!user) return logout();
        const { email, uid, displayName, photoURL } = user;
        const collectionRef = collection(FirebaseDB, `${ uid }/cellshop/informacion`);
        const docs = await getDocs(collectionRef);
        const rol = docs.docs[0]?._document.data.value.mapValue.fields.rol.stringValue;
        login( user.displayName, email, uid, rol, photoURL );
      })
    }, [])  
}