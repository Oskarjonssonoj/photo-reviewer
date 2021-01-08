import firebase from 'firebase';

// Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBC12eED4eI01ByQW3_kGz6TY7SDPhKoKM",
    authDomain: "photo-reviewer-40594.firebaseapp.com",
    projectId: "photo-reviewer-40594",
    storageBucket: "photo-reviewer-40594.appspot.com",
    messagingSenderId: "120100571042",
    appId: "1:120100571042:web:a3e038076711a187fc94fb"
  };

  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;