import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyBEMFd2nFpfUKh_RRXWv9DfjxpxmW39HGE",
authDomain: "review-your-photos.firebaseapp.com",
projectId: "review-your-photos",
storageBucket: "review-your-photos.appspot.com",
messagingSenderId: "527413700999",
appId: "1:527413700999:web:fad5c01ca8b4b9d4438b22"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

const db = firebase.firestore();

const storage = firebase.storage();

export { db, storage, auth, firebase as default }