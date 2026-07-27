/*=========================================
 ClientFlow CRM v3.1
 auth.js - Part 1
=========================================*/

// ===== Password Toggle =====

function togglePassword(inputId, buttonId) {

const input = document.getElementById(inputId);
const button = document.getElementById(buttonId);

if (!input || !button) return;

button.addEventListener("click", () => {

if (input.type === "password") {

input.type = "text";
button.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';

} else {

input.type = "password";
button.innerHTML = '<i class="fa-solid fa-eye"></i>';

}

});

}

togglePassword("loginPassword", "togglePassword");
togglePassword("signupPassword", "toggleSignupPassword");


// ===== Signup =====

const signupForm = document.getElementById("signupForm");

if (signupForm) {

signupForm.addEventListener("submit", function (e) {

e.preventDefault();

const name = document.getElementById("signupName").value.trim();
const email = document.getElementById("signupEmail").value.trim().toLowerCase();
const password = document.getElementById("signupPassword").value;
const confirm = document.getElementById("confirmPassword").value;

if (password !== confirm) {

alert("Passwords do not match.");
return;

}

let users = JSON.parse(localStorage.getItem("crmUsers")) || [];

// Check Existing Email

const exists = users.find(user => user.email === email);

if (exists) {

alert("Email already registered.");

return;

}

// Save User

users.push({

name,
email,
password

});

localStorage.setItem("crmUsers", JSON.stringify(users));

alert("Account created successfully!");

window.location.href = "login.html";

});

}
/*=========================================
 ClientFlow CRM v3.1
 auth.js - Part 2
=========================================*/

// ===== Login =====

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", function(e){

e.preventDefault();

const email =
document.getElementById("loginEmail")
.value.trim().toLowerCase();

const password =
document.getElementById("loginPassword")
.value;

const remember =
document.getElementById("rememberMe").checked;

const users =
JSON.parse(localStorage.getItem("crmUsers")) || [];

// Find User

const user = users.find(u=>

u.email===email &&
u.password===password

);

if(!user){

alert("Invalid Email or Password");

return;

}

// Login Success

localStorage.setItem(
"crmLoggedIn",
"true"
);

localStorage.setItem(
"currentUser",
JSON.stringify(user)
);

localStorage.setItem(
"lastActivity",
Date.now()
);

if(remember){

localStorage.setItem(
"rememberUser",
email
);

}else{

localStorage.removeItem(
"rememberUser"
);

}

alert("Login Successful!");

window.location.href="index.html";

});

}

// ===== Remember Me =====

const rememberedEmail =
localStorage.getItem("rememberUser");

if(
rememberedEmail &&
document.getElementById("loginEmail")
){

document.getElementById("loginEmail")
.value = rememberedEmail;

document.getElementById("rememberMe")
.checked = true;

}

// ===== Dashboard Protection =====

const page =
window.location.pathname
.split("/")
.pop();

if(page==="index.html" || page===""){

if(
localStorage.getItem("crmLoggedIn")
!=="true"
){

window.location.href="login.html";

}

}

// ===== Current User =====

const currentUser =
JSON.parse(
localStorage.getItem("currentUser")
);

if(currentUser){

const profileName =
document.getElementById("profileName");

if(profileName){

profileName.textContent =
currentUser.name;

}

 /*=========================================
 ClientFlow CRM v3.1
 auth.js - Part 3
=========================================*/

// ===== Logout =====

function logout(){

localStorage.removeItem("crmLoggedIn");
localStorage.removeItem("currentUser");

alert("Logged out successfully!");

window.location.href="login.html";

}

// Logout Button

const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",logout);

}

// ===== Session Timeout =====

const SESSION_TIME = 30 * 60 * 1000; // 30 Minutes

function updateActivity(){

if(localStorage.getItem("crmLoggedIn")==="true"){

localStorage.setItem(
"lastActivity",
Date.now()
);

}

}

function checkSession(){

if(localStorage.getItem("crmLoggedIn")!=="true"){

return;

}

const last =
Number(localStorage.getItem("lastActivity")) || 0;

if(Date.now()-last > SESSION_TIME){

alert("Session expired. Please login again.");

logout();

}

}

// Track Activity

["click","keydown","mousemove","scroll","touchstart"]
.forEach(event=>{

document.addEventListener(event,updateActivity);

});

// Check Every Minute

setInterval(checkSession,60000);

// ===== Welcome =====

window.addEventListener("load",()=>{

const user =
JSON.parse(localStorage.getItem("currentUser"));

if(user){

console.log("Welcome " + user.name);

}

});

// ===== Enter Key Support =====

document.querySelectorAll("input").forEach(input=>{

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

// ===== Auto Focus =====

const firstInput =
document.querySelector("input");

if(firstInput){

firstInput.focus();

}

// ===== Auto Form Reset =====

window.addEventListener("pageshow",()=>{

document.querySelectorAll("form").forEach(form=>{

form.reset();

});

});
}
