// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDg_kYe2h5F5JweabgH61RSkria0haSLE",
  authDomain: "ca-management-portal.firebaseapp.com",
  projectId: "ca-management-portal",
  storageBucket: "ca-management-portal.appspot.com",
  messagingSenderId: "750558567119",
  appId: "1:750558567119:web:38bcbd4d1d1b98853d75ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
