// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCXggptgMoAC1KBlfH1vahYPYhYDd7ZSU",
  authDomain: "reactnativetravblog.firebaseapp.com",
  databaseURL:
    "https://reactnativetravblog-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reactnativetravblog",
  storageBucket: "reactnativetravblog.appspot.com",
  messagingSenderId: "919545167376",
  appId: "1:919545167376:web:c9e7d7e74af33717c6d495",
  measurementId: "G-DSKJBKDCL0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
