/*=========================================
 ClientFlow CRM v4.0
 auth.js - Part 1
=========================================*/

import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// ==========================
// PASSWORD TOGGLE
// ==========================

function togglePassword(inputId, buttonId){

const input=document.getElementById(inputId);

const button=document.getElementById(buttonId);

if(!input || !button) return;

button.addEventListener("click",()=>{

if(input.type==="password"){

input.type="text";

button.innerHTML='<i class="fa-solid fa-eye-slash"></i>';

}else{

input.type="password";

button.innerHTML='<i class="fa-solid fa-eye"></i>';

}

});

}

togglePassword(
"loginPassword",
"togglePassword"
);

togglePassword(
"signupPassword",
"toggleSignupPassword"
);


// ==========================
// FIREBASE SIGNUP
// ==========================

const signupForm=
document.getElementById("signupForm");

if(signupForm){

signupForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const name=
document.getElementById("signupName")
.value.trim();

const email=
document.getElementById("signupEmail")
.value.trim();

const password=
document.getElementById("signupPassword")
.value;

const confirm=
document.getElementById("confirmPassword")
.value;

if(password!==confirm){

alert("Passwords do not match");

return;

}

try{

const userCredential=
await createUserWithEmailAndPassword(
auth,
email,
password
);

await setDoc(

doc(
db,
"users",
userCredential.user.uid
),

{

name:name,

email:email,

createdAt:
new Date().toISOString()

}

);

alert("Account Created Successfully");

window.location.href="login.html";

}

catch(error){

alert(error.message);

}

});

}
/*=========================================
 ClientFlow CRM v4.0
 auth.js - Part 2
=========================================*/

// ==========================
// FIREBASE LOGIN
// ==========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email =
document.getElementById("loginEmail")
.value.trim();

const password =
document.getElementById("loginPassword")
.value;

try {

const userCredential =
await signInWithEmailAndPassword(
auth,
email,
password
);

const uid = userCredential.user.uid;

const userRef = doc(db,"users",uid);

const snap = await getDoc(userRef);

if(snap.exists()){

localStorage.setItem(
"currentUser",
JSON.stringify(snap.data())
);

}

alert("Login Successful");

window.location.href="index.html";

}

catch(error){

alert(error.message);

}

});

}


// ==========================
// AUTH STATE
// ==========================

onAuthStateChanged(auth,(user)=>{

const page =
window.location.pathname
.split("/")
.pop();

if(user){

if(
page==="login.html" ||
page==="signup.html"
){

window.location.href="index.html";

}

}else{

if(
page==="index.html" ||
page===""
){

window.location.href="login.html";

}

}

});


// ==========================
// PROFILE NAME
// ==========================

const profileName =
document.getElementById("profileName");

const currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);

if(profileName && currentUser){

profileName.textContent =
currentUser.name;

}
/*=========================================
 ClientFlow CRM v4.0
 auth.js - Part 3 (Final)
=========================================*/

// ==========================
// FIREBASE LOGOUT
// ==========================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

logoutBtn.addEventListener("click", async () => {

try {

await signOut(auth);

localStorage.removeItem("currentUser");

alert("Logged out successfully");

window.location.href = "login.html";

}

catch(error){

alert(error.message);

}

});

}


// ==========================
// REMEMBER ME
// ==========================

const rememberCheck =
document.getElementById("rememberMe");

const emailInput =
document.getElementById("loginEmail");

if(localStorage.getItem("rememberEmail") && emailInput){

emailInput.value =
localStorage.getItem("rememberEmail");

rememberCheck.checked = true;

}

if(loginForm){

loginForm.addEventListener("submit",()=>{

if(rememberCheck.checked){

localStorage.setItem(
"rememberEmail",
emailInput.value
);

}else{

localStorage.removeItem(
"rememberEmail"
);

}

});

}


// ==========================
// AUTO FOCUS
// ==========================

const firstInput =
document.querySelector("input");

if(firstInput){

firstInput.focus();

}


// ==========================
// ENTER KEY SUPPORT
// ==========================

document.querySelectorAll("input")
.forEach(input=>{

input.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

const form=input.closest("form");

if(form){

e.preventDefault();

form.requestSubmit();

}

}

});

});


// ==========================
// SESSION TIMER
// ==========================

let sessionTimer;

function resetTimer(){

clearTimeout(sessionTimer);

sessionTimer = setTimeout(async()=>{

if(auth.currentUser){

await signOut(auth);

alert("Session expired.");

window.location.href="login.html";

}

},30*60*1000);

}

["click","mousemove","keydown","scroll","touchstart"]

.forEach(event=>{

document.addEventListener(

event,

resetTimer

);

});

resetTimer();


// ==========================
// WELCOME MESSAGE
// ==========================

window.addEventListener("load",()=>{

const user =
JSON.parse(
localStorage.getItem("currentUser")
);

if(user){

console.log(
"Welcome " + user.name
);

}

});
