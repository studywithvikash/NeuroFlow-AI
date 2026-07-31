/*=========================================
 ClientFlow CRM v4.0
 Final Firebase Authentication
 Part 1
=========================================*/

import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
setPersistence,
browserLocalPersistence,
browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


// ===============================
// DOM ELEMENTS
// ===============================

const loginForm=document.getElementById("loginForm");

const signupForm=document.getElementById("signupForm");

const logoutBtn=document.getElementById("logoutBtn");

const profileName=document.getElementById("profileName");

const rememberMe=document.getElementById("rememberMe");


// ===============================
// PASSWORD TOGGLE
// ===============================

function setupPasswordToggle(inputId,buttonId){

const input=document.getElementById(inputId);

const button=document.getElementById(buttonId);

if(!input || !button) return;

button.addEventListener("click",()=>{

if(input.type==="password"){

input.type="text";

button.innerHTML=
'<i class="fa-solid fa-eye-slash"></i>';

}else{

input.type="password";

button.innerHTML=
'<i class="fa-solid fa-eye"></i>';

}

});

}

setupPasswordToggle(
"loginPassword",
"togglePassword"
);

setupPasswordToggle(
"signupPassword",
"toggleSignupPassword"
);


// ===============================
// TOAST
// ===============================

function showToast(message){

const toast=document.getElementById("toast");

if(!toast){

alert(message);

return;

}

toast.textContent=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}


// ===============================
// LOADING
// ===============================

function showLoading(){

const loader=
document.getElementById("loadingScreen");

if(loader){

loader.style.display="flex";

}

}

function hideLoading(){

const loader=
document.getElementById("loadingScreen");

if(loader){

loader.style.display="none";

}

}
/*=========================================
 ClientFlow CRM v4.0
 Final Firebase Authentication
 Part 2
=========================================*/

// ===============================
// FIREBASE SIGNUP
// ===============================

if(signupForm){

signupForm.addEventListener("submit",async(e)=>{

e.preventDefault();

showLoading();

const name=document.getElementById("signupName").value.trim();

const email=document.getElementById("signupEmail").value.trim();

const password=document.getElementById("signupPassword").value;

const confirm=document.getElementById("confirmPassword").value;

if(password!==confirm){

hideLoading();

showToast("Passwords do not match");

return;

}

try{

const credential=
await createUserWithEmailAndPassword(
auth,
email,
password
);

await setDoc(
doc(db,"users",credential.user.uid),
{
name:name,
email:email,
createdAt:new Date().toISOString()
}
);

hideLoading();

showToast("Account Created Successfully");

setTimeout(()=>{

window.location.href="login.html";

},1000);

}catch(error){

hideLoading();

showToast(error.message);

}

});

}


// ===============================
// FIREBASE LOGIN
// ===============================

if(loginForm){

loginForm.addEventListener("submit",async(e)=>{

e.preventDefault();

showLoading();

const email=document.getElementById("loginEmail").value.trim();

const password=document.getElementById("loginPassword").value;

try{

if(rememberMe && rememberMe.checked){

await setPersistence(
auth,
browserLocalPersistence
);

}else{

await setPersistence(
auth,
browserSessionPersistence
);

}

const credential=
await signInWithEmailAndPassword(
auth,
email,
password
);

const snap=
await getDoc(
doc(db,"users",credential.user.uid)
);

if(snap.exists()){

localStorage.setItem(
"currentUser",
JSON.stringify(snap.data())
);

}

hideLoading();

showToast("Login Successful");

setTimeout(()=>{

window.location.href="index.html";

},800);

}catch(error){

hideLoading();

showToast(error.message);

}

});

}
/*=========================================
 ClientFlow CRM v4.0
 Final Firebase Authentication
 Part 3
=========================================*/

// ===============================
// AUTH STATE
// ===============================

onAuthStateChanged(auth, async(user)=>{

const page =
window.location.pathname
.split("/")
.pop();

if(user){

try{

const snap = await getDoc(
doc(db,"users",user.uid)
);

if(snap.exists()){

const data = snap.data();

localStorage.setItem(
"currentUser",
JSON.stringify(data)
);

if(profileName){

profileName.textContent =
data.name;

}

}

}catch(err){

console.error(err);

}

if(
page==="login.html" ||
page==="signup.html"
){

window.location.href="index.html";

}

}else{

localStorage.removeItem("currentUser");

if(
page==="index.html" ||
page===""
){

window.location.href="login.html";

}

}

});


// ===============================
// LOGOUT
// ===============================

if(logoutBtn){

logoutBtn.addEventListener("click",async()=>{

try{

await signOut(auth);

localStorage.removeItem(
"currentUser"
);

showToast("Logged Out");

setTimeout(()=>{

window.location.href="login.html";

},800);

}catch(error){

showToast(error.message);

}

});

}


// ===============================
// SESSION TIMER
// ===============================

let sessionTimer;

function resetSession(){

clearTimeout(sessionTimer);

sessionTimer=setTimeout(async()=>{

if(auth.currentUser){

await signOut(auth);

localStorage.removeItem(
"currentUser"
);

window.location.href="login.html";

}

},30*60*1000);

}

[
"click",
"mousemove",
"keydown",
"touchstart",
"scroll"
].forEach(event=>{

document.addEventListener(
event,
resetSession
);

});

resetSession();


// ===============================
// AUTO FOCUS
// ===============================

const firstInput =
document.querySelector("input");

if(firstInput){

firstInput.focus();

}


// ===============================
// ENTER KEY SUPPORT
// ===============================

document
.querySelectorAll("input")
.forEach(input=>{

input.addEventListener(
"keydown",
(e)=>{

if(e.key==="Enter"){

const form =
input.closest("form");

if(form){

e.preventDefault();

form.requestSubmit();

}

}

});

});


// ===============================
// READY
// ===============================

console.log(
"ClientFlow CRM Firebase Auth Loaded Successfully"
);
