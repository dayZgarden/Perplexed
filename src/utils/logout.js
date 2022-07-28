import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile, 
    sendEmailVerification } from "firebase/auth";
import { useNavigate, } from "react-router-dom";

export default function logout(auth){
    signOut(auth);
}