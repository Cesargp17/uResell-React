import React, { useContext, useReducer, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateCurrentUser, updateProfile } from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from '../../firebase/config';
import { userReducer } from './userReducer';
import { collection, setDoc, doc, getDocs, getDoc } from 'firebase/firestore/lite';
import { PedidosContext } from '../../pedidos/PedidosContext';

const init = () => {
    return [{
        status: 'checking',
        nombre: '',
        email: '',
        uid: '',
        rol: '',
        photoURL: '',
        errorMessage: null
    }];
}



export const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();

    const [Alert, setAlert] = useState();

    const [Usuario, dispatch] = useReducer(userReducer, [{}], init );


    const checkingCredentials = () => {
        const user = {
            status: 'checking',
            nombre: '',
            email: '',
            uid: '',
            rol: '',
            photoURL: '',
            errorMessage: null
        }
        

        const action = {
            type: 'CheckCredentials',
            payload: user,
        }
        dispatch(action);
    }

    const login = (displayName, email, uid, rol, photoURL ) => {

        const user = {
            status: 'auth',
            nombre: displayName,
            email: email,
            uid: uid,
            rol: rol,
            photoURL: photoURL,
            errorMessage: null
        }   

        const action = {
            type: 'Login',
            payload: user
        }
        dispatch(action);
    }

    const logout = () => {
        const user = {
            status: 'no-auth',
            nombre: '',
            email: '',
            uid: '',
            rol:'',
            photoURL: '',
            errorMessage: null
        } 
        const action = {
            type: 'Logout',
            payload: user
        } 
        dispatch(action);
    }

    const signInWithGoogle = async() => {
        try {
            checkingCredentials();
            const result = await signInWithPopup(FirebaseAuth, googleProvider);
            const { displayName, uid, email, photoURL } = result.user;
            const rol = 'Usuario'
            login(displayName, email, uid, rol, photoURL ); 
            addUserDataBase(uid, rol, email);

        } catch (error) {
            const errorMessage = error.message;
            if(errorMessage === 'Firebase: Error (auth/popup-closed-by-user).'){
                setAlert('Se ha cerrado la ventana de Google.')
              }
            logout();
        }
    }

    const startSignOut = async() => {
        await FirebaseAuth.signOut();
        logout();
    }

    const startRegisterWithEmailAndPassword = async(email, password, displayName, rol) => {
        try {
            checkingCredentials();
            const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            const { uid, photoURL } = result.user;
            await updateProfile(FirebaseAuth.currentUser, {displayName} );
            login(displayName, email, uid, rol, photoURL);
            addUserDataBase(uid, rol, email);

        } catch (error) {
            const errorMessage = error.message;
                if (errorMessage === 'Firebase: Error (auth/email-already-in-use).'){
                setAlert('El email ya se encuentra en uso.')
              }
            logout();
        }
    }

    const addUserDataBase = async (uid, rol, email) => {

        const newUser = {
            email: email,
            rol: rol,
        }

        const collectionRef = collection(FirebaseDB, `${ uid }/cellshop/informacion`);
        const docs = await getDocs(collectionRef);
        if (docs.docs.length === 1) return;
  

        const addUser = doc(collection(FirebaseDB, `${ uid }/cellshop/informacion`));
        await setDoc(addUser, newUser);
        newUser.id = addUser.id;
    }


    const startLoginWithEmailAndPassword = async(email, password) => {
        try {
            checkingCredentials();
            const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            const { uid, displayName, photoURL } = result.user;
            login(displayName, email, uid, photoURL);
        } catch (error) {
            const errorMessage = error.message;
            if(errorMessage === 'Firebase: Error (auth/popup-closed-by-user).'){
                setAlert('Se ha cerrado la ventana de Google.')
              } else if (errorMessage === 'Firebase: Error (auth/user-not-found).'){
                setAlert('Usuario no encontrado.')
              } else if (errorMessage === 'Firebase: Error (auth/wrong-password).'){
                setAlert('Contraseña incorrecta')
              }
            logout();
        }
    }

  return (
    <>
        <AuthContext.Provider value={{ signInWithGoogle, Usuario: Usuario, checkingCredentials, login, logout, startSignOut, Alert: Alert, setAlert, startRegisterWithEmailAndPassword, startLoginWithEmailAndPassword, addUserDataBase }}>
        { children }
        </AuthContext.Provider>
    </>
  )
}
