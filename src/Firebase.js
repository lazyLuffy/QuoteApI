import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCnRv44_axMNBxJ7e3JCMYgAnc1ezF3NyM",
    authDomain: "quotesin-92eda.firebaseapp.com",
    projectId: "quotesin-92eda",
    storageBucket: "quotesin-92eda.appspot.com",
    messagingSenderId: "49098597200",
    appId: "1:49098597200:web:ab4920a09fb1e0778b4255",
    measurementId: "G-FE6RGZR6RM"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db,auth,provider}