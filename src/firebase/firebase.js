import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBC12eED4eI01ByQW3_kGz6TY7SDPhKoKM",
    authDomain: "photo-reviewer-40594.firebaseapp.com",
    databaseURL: "https://photo-reviewer-40594-default-rtdb.firebaseio.com",
    projectId: "photo-reviewer-40594",
    storageBucket: "photo-reviewer-40594.appspot.com",
    messagingSenderId: "120100571042",
    appId: "1:120100571042:web:a3e038076711a187fc94fb"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

const db = firebase.firestore();

const storage = firebase.storage();

export { db, storage, auth, firebase as default }