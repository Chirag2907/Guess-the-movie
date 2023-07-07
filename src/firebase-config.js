import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKNS_KqJj5u0WAXysmISy-KKEx3u8JQyY",
  authDomain: "movieguessr-d75e7.firebaseapp.com",
  projectId: "movieguessr-d75e7",
  storageBucket: "movieguessr-d75e7.appspot.com",
  messagingSenderId: "1017505310800",
  appId: "1:1017505310800:web:7194eeb6918ccacf160955",
  measurementId: "G-YE5GWDGGMW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);