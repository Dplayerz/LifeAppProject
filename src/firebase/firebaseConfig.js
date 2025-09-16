// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmN9M7BK_7uPnXMr0R9yN_iqLKJjhRk08",
  authDomain: "lifeappproject-717f0.firebaseapp.com",
  projectId: "lifeappproject-717f0",
  storageBucket: "lifeappproject-717f0.appspot.com",
  messagingSenderId: "562091604190",
  appId: "1:562091604190:web:86390ae0bffed62ad12a4f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);