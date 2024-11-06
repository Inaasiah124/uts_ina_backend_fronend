import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyAYy-szAgtdRqWjOQk4mKKRs1Uk6HwBrdY",
  authDomain: "utsm-98b1f.firebaseapp.com",
  databaseURL: "https://utsm-98b1f-default-rtdb.firebaseio.com/",
  projectId: "utsm-98b1f",
  storageBucket: "utsm-98b1f.appspot.com",
  messagingSenderId: "432541412259",
  appId: "1:432541412259:web:1d7a2c4e686fbeb4914816",
  measurementId: "G-QSB08LG13C"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };