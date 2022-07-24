import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { doc } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBWmWvvg9g7vBwfF4mTVYDhow4z1reS1W0",
    authDomain: "marvel-quiz-65727.firebaseapp.com",
    projectId: "marvel-quiz-65727",
    storageBucket: "marvel-quiz-65727.appspot.com",
    messagingSenderId: "217548498402",
    appId: "1:217548498402:web:d9018381bc6bb416e545bb"
  };

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    //Inscription
    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    //Connexion
    signInUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    //Deconnection
    signOutUser = () => this.auth.signOut();

    //Recuperer Mot de passe
    resetPassword = (email) => this.auth.sendPasswordResetEmail(email);

    //DataBase
    user = uid => doc(this.db, `users/${uid}`);
}

export default Firebase;