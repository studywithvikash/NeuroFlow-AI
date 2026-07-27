import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: apiKey: "AIzaSyAflFP20uHV4BwgpLnZnWsapjzx8UOHPXk",
  authDomain: "clientflow-crm-5a739.firebaseapp.com",
  projectId: "clientflow-crm-5a739",
  storageBucket: "clientflow-crm-5a739.firebasestorage.app",
  messagingSenderId: "885786171305",
  appId: "1:885786171305:web:cb704326f311ba7e3fd6b8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
