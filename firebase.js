// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0QA-eYIBcoKva6IgPA8SdLzjPQDWYJZE",
  authDomain: "chatapp-79f0e.firebaseapp.com",
  databaseURL: "https://chatapp-79f0e-default-rtdb.firebaseio.com",
  projectId: "chatapp-79f0e",
  storageBucket: "chatapp-79f0e.appspot.com",
  messagingSenderId: "1061389762242",
  appId: "1:1061389762242:web:68456efa3b29e10f0f455b",
  measurementId: "G-4CC7HSQ1JN"
};

// Initialize Firebase
let app;
if (firebase.apps) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
export { firebase }
export { auth };